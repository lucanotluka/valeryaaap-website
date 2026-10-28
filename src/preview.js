import { useEffect, useState } from "react";

// ─────────────────────────────────────────────────────────────
// Fetches title / description / image for a link, in the browser.
//  • Generic links  → Microlink (free, no key, CORS-enabled)
//  • TikTok videos  → TikTok's public oEmbed (falls back to Microlink)
//  • Instagram feed → Behold JSON feed (optional, see content.js)
// Results are cached in localStorage so visitors don't burn the
// free daily quota, and so the site feels instant on return visits.
// ─────────────────────────────────────────────────────────────

const CACHE = "preview:v1:";
const TTL = 3 * 60 * 60 * 1000; // 3h — social CDN image links expire, keep it short

const isHttp = (u) => /^https?:\/\//i.test(u || "");

function readCache(key) {
  try {
    const raw = localStorage.getItem(CACHE + key);
    if (!raw) return null;
    const { t, data } = JSON.parse(raw);
    return Date.now() - t < TTL ? data : null;
  } catch {
    return null;
  }
}

function writeCache(key, data) {
  try {
    localStorage.setItem(CACHE + key, JSON.stringify({ t: Date.now(), data }));
  } catch {
    /* storage full or blocked: ignore */
  }
}

async function fromMicrolink(url) {
  const res = await fetch(`https://api.microlink.io/?url=${encodeURIComponent(url)}`);
  if (!res.ok) throw new Error(`microlink ${res.status}`);
  const json = await res.json();
  if (json.status !== "success") throw new Error("microlink failed");
  const d = json.data || {};
  return {
    title: d.title,
    description: d.description,
    image: d.image?.url,
    publisher: d.publisher,
    date: d.date,
  };
}

async function fromTikTok(url) {
  const res = await fetch(`https://www.tiktok.com/oembed?url=${encodeURIComponent(url)}`);
  if (!res.ok) throw new Error(`tiktok ${res.status}`);
  const d = await res.json();
  return {
    title: d.author_name,
    description: d.title, // for TikTok, "title" is the caption
    image: d.thumbnail_url,
    publisher: "TikTok",
  };
}

async function fromFeed(feedUrl) {
  // Behold-style JSON: { posts: [{ permalink, caption, mediaUrl, thumbnailUrl, sizes }] }
  const res = await fetch(feedUrl);
  if (!res.ok) throw new Error(`feed ${res.status}`);
  const json = await res.json();
  const post = (Array.isArray(json) ? json : json.posts || [])[0];
  if (!post) throw new Error("empty feed");
  return {
    title: json.username ? `@${json.username}` : undefined,
    description: post.prunedCaption || post.caption || "",
    image: post.sizes?.medium?.mediaUrl || post.thumbnailUrl || post.mediaUrl,
    publisher: "Instagram",
    date: post.timestamp,
    link: post.permalink,
  };
}

export async function fetchPreview(url, feedUrl) {
  const key = feedUrl || url;
  const cached = readCache(key);
  if (cached) return cached;

  let data;
  if (feedUrl) {
    data = await fromFeed(feedUrl);
  } else if (/tiktok\.com/i.test(url)) {
    try {
      data = await fromTikTok(url);
    } catch {
      data = await fromMicrolink(url);
    }
  } else {
    data = await fromMicrolink(url);
  }
  writeCache(key, data);
  return data;
}

function hostname(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

function formatDate(value) {
  if (!value) return "";
  const d = new Date(value);
  if (isNaN(d)) return String(value);
  return new Intl.DateTimeFormat("en", { month: "short", year: "numeric" }).format(d);
}

/**
 * usePreview(url, manual, feedUrl)
 * `manual` fields (title, description, image, outlet, date) always win over
 * fetched ones, so you can override anything straight from content.js.
 */
export function usePreview(url, manual = {}, feedUrl = "") {
  const complete = manual.title && manual.description && manual.image;
  const canFetch = !complete && (isHttp(url) || isHttp(feedUrl));
  const [state, setState] = useState({ loading: canFetch, data: null });

  useEffect(() => {
    let alive = true;
    if (!canFetch) {
      setState({ loading: false, data: null });
      return undefined;
    }
    setState({ loading: true, data: null });
    fetchPreview(url, feedUrl)
      .then((data) => alive && setState({ loading: false, data }))
      .catch(() => alive && setState({ loading: false, data: null }));
    return () => {
      alive = false;
    };
  }, [url, feedUrl, canFetch]);

  const d = state.data || {};
  return {
    loading: state.loading,
    title: manual.title || d.title || "",
    description: manual.description || d.description || "",
    image: manual.image || d.image || "",
    publisher: manual.outlet || d.publisher || hostname(url),
    date: manual.date || formatDate(d.date),
    link: manual.url || d.link || url,
  };
}

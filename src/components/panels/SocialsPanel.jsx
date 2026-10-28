import { useState } from "react";
import { socials } from "../../content";
import { usePreview } from "../../preview";

function PostCard({ s }) {
  const p = usePreview(s.latestUrl, s.manual || {}, s.feedUrl);
  const [imgFailed, setImgFailed] = useState(false);
  const hasPost = p.image || p.description;

  return (
    <div className="rounded-lg border border-chromeline bg-white/70 p-3">
      <div className="mb-2 flex items-center justify-between">
        <span className="font-display text-sm font-semibold">{s.platform}</span>
        <a
          href={s.profileUrl}
          target="_blank"
          rel="noreferrer"
          className="font-mono text-[11px] text-inkfaint transition-colors hover:text-accent"
        >
          {s.handle}
        </a>
      </div>

      <div className="flex gap-3">
        <div className="aspect-square w-24 shrink-0 overflow-hidden rounded-md border border-chromeline bg-lavender/30 sm:w-28">
          {p.loading ? (
            <div className="h-full w-full animate-pulse bg-lavender/40" />
          ) : p.image && !imgFailed ? (
            <img
              src={p.image}
              alt=""
              loading="lazy"
              draggable={false}
              referrerPolicy="no-referrer"
              onError={() => setImgFailed(true)}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-pink/50 to-lavender/60 font-mono text-[10px] text-ink/40">
              no preview
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          {p.loading ? (
            <div className="space-y-2">
              <div className="h-3 w-full animate-pulse rounded bg-chrome/50" />
              <div className="h-3 w-5/6 animate-pulse rounded bg-chrome/50" />
              <div className="h-3 w-2/3 animate-pulse rounded bg-chrome/50" />
            </div>
          ) : (
            <p className="font-body text-xs leading-relaxed text-ink/80 line-clamp-5">
              {hasPost ? p.description : "Latest post unavailable right now."}
            </p>
          )}
          <a
            href={p.link || s.profileUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-2 inline-block font-mono text-[10px] text-accent hover:underline"
          >
            {hasPost ? "View post →" : "Open profile →"}
          </a>
        </div>
      </div>
    </div>
  );
}

export default function SocialsPanel() {
  return (
    <div className="flex flex-col gap-3">
      {socials.map((s) => (
        <PostCard key={s.platform} s={s} />
      ))}
    </div>
  );
}

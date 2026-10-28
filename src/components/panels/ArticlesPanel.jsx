import { useState } from "react";
import { articles } from "../../content";
import { usePreview } from "../../preview";

function ArticleCard({ item }) {
  const p = usePreview(item.url, item);
  const [imgFailed, setImgFailed] = useState(false);
  const meta = [p.publisher, p.date].filter(Boolean).join(" · ");

  return (
    <a
      href={p.link || item.url}
      target="_blank"
      rel="noreferrer"
      className="group block overflow-hidden rounded-lg border border-chromeline bg-white/70 hover:border-ink/30 hover:-translate-y-0.5 hover:shadow-win transition-all duration-200"
    >
      <div className="aspect-[16/9] overflow-hidden bg-lavender/30">
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
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-pink/50 to-lavender/60 font-display text-4xl font-semibold text-ink/30">
            {(p.publisher || "?").charAt(0).toUpperCase()}
          </div>
        )}
      </div>

      <div className="p-3">
        {p.loading ? (
          <div className="space-y-2">
            <div className="h-2 w-1/3 animate-pulse rounded bg-chrome/60" />
            <div className="h-4 w-4/5 animate-pulse rounded bg-chrome/60" />
            <div className="h-3 w-full animate-pulse rounded bg-chrome/40" />
          </div>
        ) : (
          <>
            {meta && (
              <p className="font-mono text-[10px] uppercase tracking-wide text-inkfaint">{meta}</p>
            )}
            <p className="mt-1 font-display text-[15px] font-semibold leading-snug transition-colors group-hover:text-accent line-clamp-2">
              {p.title || item.url}
            </p>
            {p.description && (
              <p className="mt-1.5 font-body text-xs leading-relaxed text-ink/70 line-clamp-3">
                {p.description}
              </p>
            )}
            <p className="mt-2 font-mono text-[10px] text-accent">Read →</p>
          </>
        )}
      </div>
    </a>
  );
}

export default function ArticlesPanel() {
  return (
    <div className="flex flex-col gap-3">
      {articles.map((a, i) => (
        <ArticleCard key={a.url + i} item={a} />
      ))}
    </div>
  );
}

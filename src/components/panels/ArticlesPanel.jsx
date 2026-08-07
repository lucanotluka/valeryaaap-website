import { articles } from "../../content";

export default function ArticlesPanel() {
  return (
    <div className="w-[280px] sm:w-[320px] flex flex-col gap-3">
      {articles.map((a) => (
        <a
          key={a.id}
          href={a.url}
          target="_blank"
          rel="noreferrer"
          className="group flex gap-3 rounded-md border border-chromeline hover:border-ink/30 transition-colors p-3"
        >
          {a.image ? (
            <img
              src={a.image}
              alt=""
              className="w-14 h-14 object-cover rounded shrink-0 border border-chromeline"
            />
          ) : (
            <div className="w-14 h-14 rounded shrink-0 border border-dashed border-chromeline bg-chrome/40" />
          )}
          <div className="min-w-0">
            <p className="font-display font-semibold text-[13px] leading-snug group-hover:text-accent transition-colors">
              {a.title}
            </p>
            <p className="font-mono text-[10px] text-inkfaint mt-0.5">
              {a.outlet} · {a.date}
            </p>
            <p className="font-body text-xs text-ink/70 leading-relaxed mt-1">
              {a.description}
            </p>
          </div>
        </a>
      ))}
    </div>
  );
}
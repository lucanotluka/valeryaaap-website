import { newsletter } from "../../content";

export default function NewsletterPanel() {
  return (
    <div className="w-[240px] sm:w-[260px]">
      <p className="font-display font-semibold text-sm mb-1">{newsletter.name}</p>
      <p className="font-body text-xs text-ink/70 leading-relaxed mb-3">
        {newsletter.description}
      </p>
      <a
        href={newsletter.url}
        target="_blank"
        rel="noreferrer"
        className="inline-block font-mono text-xs px-3 py-1.5 rounded-full bg-lavender/50 hover:bg-lavender transition-colors"
      >
        Subscribe on Substack →
      </a>
    </div>
  );
}
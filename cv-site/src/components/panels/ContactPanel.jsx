import { contact } from "../../content";

export default function ContactPanel() {
  return (
    <div className="w-[220px] sm:w-[240px]">
      <ul className="flex flex-col divide-y divide-chromeline">
        {contact.map((c) => (
          <li key={c.label}>
            <a
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="group flex items-center justify-between py-2 first:pt-0 last:pb-0"
            >
              <span className="font-mono text-xs text-inkfaint">{c.label}</span>
              <span className="font-body text-[13px] text-ink group-hover:text-accent transition-colors">
                {c.value}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
import { socials } from "../../content";

export default function SocialsPanel() {
  return (
    <div className="w-[220px]">
      <ul className="flex flex-col divide-y divide-chromeline">
        {socials.map((s) => (
          <li key={s.label}>
            <a
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between py-2 first:pt-0 last:pb-0"
            >
              <span className="font-mono text-xs text-inkfaint">{s.label}</span>
              <span className="font-body text-[13px] text-ink group-hover:text-accent transition-colors">
                {s.value}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
import { clients } from "../../content";

export default function ClientsPanel() {
  return (
    <div className="w-[240px] sm:w-[260px]">
      <ul className="flex flex-col divide-y divide-chromeline">
        {clients.map((c) => (
          <li key={c.name} className="py-2 first:pt-0 last:pb-0">
            <p className="font-display font-semibold text-[13px]">{c.name}</p>
            <p className="font-mono text-[10px] text-inkfaint mt-0.5">{c.note}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
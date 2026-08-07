import { welcome, profile } from "../../content";

export default function WelcomePanel() {
  return (
    <div className="w-[260px] sm:w-[300px]">
      <p className="font-mono text-[10px] text-inkfaint mb-2">{welcome.date}</p>
      <p className="font-display font-semibold text-lg leading-tight mb-2">
        {welcome.title}
      </p>
      <p className="font-body text-[13px] text-ink/80 leading-relaxed whitespace-pre-line">
        {welcome.entry}
      </p>
      <p className="font-mono text-[10px] text-inkfaint mt-3">— {profile.name}</p>
    </div>
  );
}
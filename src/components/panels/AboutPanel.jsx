import { profile, about } from "../../content";

export default function AboutPanel() {
  return (
    <div className="w-[280px] sm:w-[320px]">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-11 h-11 rounded-full bg-ink text-cream flex items-center justify-center font-display font-semibold text-sm shrink-0">
          {profile.avatarInitials}
        </div>
        <div>
          <p className="font-display font-semibold text-sm leading-tight">
            {profile.name}
          </p>
          <p className="font-mono text-[11px] text-inkfaint">
            {profile.role} · {profile.location}
          </p>
        </div>
      </div>
      <p className="font-body text-[13px] leading-relaxed text-ink/85 whitespace-pre-line">
        {about}
      </p>
    </div>
  );
}

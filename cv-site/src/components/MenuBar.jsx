import { profile } from "../content";

export default function MenuBar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-40 flex items-center px-4 sm:px-6 py-3 pointer-events-none">
      <div className="flex items-center gap-2 pointer-events-auto">
        <span className="font-display font-semibold text-sm tracking-tight">
          {profile.name}
        </span>
        <span className="hidden sm:inline text-inkfaint font-mono text-xs">
          / {profile.role.toLowerCase()}
        </span>
      </div>
    </div>
  );
}
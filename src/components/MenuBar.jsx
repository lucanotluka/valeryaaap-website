import { profile } from "../content";

export default function MenuBar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-40 flex items-center sm:px-6 pointer-events-none">
      <div className="flex items-center gap-2 pointer-events-auto">
        <span className="font-display font-semibold text-sm tracking-tight">
          <img src="1.png" alt="Logo" className="w-20" />
        </span>
        <span className="hidden sm:inline text-white font-mono text-20">
          / {profile.role.toLowerCase()}
        </span>
      </div>
    </div>
  );
}
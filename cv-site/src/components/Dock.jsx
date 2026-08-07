export default function Dock({ items, onItemClick }) {
  return (
    <div className="fixed bottom-4 sm:bottom-6 left-0 right-0 z-40 flex justify-center px-4 pointer-events-none">
      <nav
        className="pointer-events-auto flex items-end gap-1 px-3 py-2.5 rounded-2xl bg-cream/95 backdrop-blur-sm border border-chromeline shadow-win"
        aria-label="Window shortcuts"
      >
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onItemClick(item.id)}
            title={item.label}
            aria-label={item.label}
            className="group relative flex flex-col items-center gap-1 px-2.5 py-1.5 rounded-xl text-ink/70 hover:text-ink hover:bg-lavender/40 hover:-translate-y-1 transition-all duration-150"
          >
            <span className="w-4 h-4">{item.icon}</span>
            <span className="hidden sm:block font-mono text-[9px] opacity-0 group-hover:opacity-100 transition-opacity absolute -top-6 bg-ink text-cream px-1.5 py-0.5 rounded whitespace-nowrap">
              {item.label}
            </span>
          </button>
        ))}
      </nav>
    </div>
  );
}
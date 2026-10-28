export default function Dock({ items, onItemClick }) {
  return (
    <div className="fixed bottom-4 sm:bottom-6 left-0 right-0 z-40 flex justify-center px-4 pointer-events-none">
      <nav
        className="pointer-events-auto flex items-end gap-2 px-2 py-1.5 rounded-2xl bg-white backdrop-blur-sm border border-chromeline shadow-win"
        aria-label="Window shortcuts"
      >
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onItemClick(item.id)}
            title={item.label}
            aria-label={item.label}
            className="group relative flex flex-col items-center gap-3 px-2.5 py-1.5 rounded-xl text-ink hover:text-ink hover:-translate-y-1 transition-all duration-250"
          >
            <span className="w-7 h-7">{item.icon}</span>
            <span className="hidden sm:block font-mono text-[12px] opacity-0 group-hover:opacity-100 transition-opacity absolute -top-6 bg-ink text-cream px-1.5 py-0.5 rounded whitespace-nowrap">
              {item.label}
            </span>
          </button>
        ))}
      </nav>
    </div>
  );
}
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { clients } from "../../content";

const variants = {
  enter: (d) => ({ opacity: 0, x: d * 40, rotateY: d * -14 }),
  center: { opacity: 1, x: 0, rotateY: 0 },
  exit: (d) => ({ opacity: 0, x: d * -40, rotateY: d * 14 }),
};

const ruled = {
  backgroundImage:
    "repeating-linear-gradient(transparent, transparent 23px, rgba(199,184,242,0.55) 24px)",
  lineHeight: "24px",
};

const pad = (n) => String(n).padStart(2, "0");

export default function ClientsPanel() {
  const [[index, dir], setPage] = useState([0, 0]);
  const total = clients.length;
  if (!total) return null;

  const go = (d) => setPage(([cur]) => [(cur + d + total) % total, d]);
  const c = clients[index];

  return (
    <div
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") go(-1);
        if (e.key === "ArrowRight") go(1);
      }}
      className="flex outline-none"
    >
      {/* spiral binding */}
      <div aria-hidden className="relative z-10 -mr-3 flex shrink-0 flex-col justify-between py-4">
        {Array.from({ length: 9 }).map((_, k) => (
          <span key={k} className="block h-1.5 w-5 rounded-full bg-ink/70" />
        ))}
      </div>

      {/* page */}
      <div
        className="min-w-0 flex-1 rounded-md border border-chromeline bg-[#FFFDF8] p-4 pl-6 shadow-win"
        style={{ perspective: 900 }}
      >
        <AnimatePresence mode="wait" custom={dir} initial={false}>
          <motion.div
            key={index}
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.22 }}
          >
            <div className="mb-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-wide text-inkfaint">
              <span>Nº {pad(index + 1)}</span>
              <span>{c.year}</span>
            </div>

            {/* taped photo */}
            <div className="relative mx-auto mb-4 w-full -rotate-1 border border-chromeline bg-white p-2 pb-5 shadow-win">
              <span className="absolute -top-2 left-1/2 h-4 w-16 -translate-x-1/2 rotate-2 bg-pink/70" />
              {c.image ? (
                <img
                  src={c.image}
                  alt={c.name}
                  draggable={false}
                  className="aspect-[4/3] w-full object-cover"
                />
              ) : (
                <div className="flex aspect-[4/3] w-full items-center justify-center bg-gradient-to-br from-pink/40 to-lavender/50 font-mono text-[10px] text-ink/40">
                  client image
                </div>
              )}
            </div>

            <h3 className="font-display text-xl font-semibold leading-tight">{c.name}</h3>
            <p className="mb-2 font-mono text-[11px] text-accent">{c.role}</p>
            <p className="font-body text-[13px] text-ink/80" style={ruled}>
              {c.text}
            </p>
            {c.url && (
              <a
                href={c.url}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-block font-mono text-[10px] text-accent hover:underline"
              >
                View project →
              </a>
            )}
          </motion.div>
        </AnimatePresence>

        {/* page turner */}
        <div className="mt-4 flex items-center justify-between border-t border-dashed border-chromeline pt-3">
          <button
            onClick={() => go(-1)}
            aria-label="Previous client"
            className="h-8 w-8 rounded-full border border-chromeline bg-lavender/40 font-mono text-sm transition-colors hover:bg-lavender"
          >
            ←
          </button>
          <span className="font-mono text-[11px] text-inkfaint">
            {pad(index + 1)} / {pad(total)}
          </span>
          <button
            onClick={() => go(1)}
            aria-label="Next client"
            className="h-8 w-8 rounded-full border border-chromeline bg-lavender/40 font-mono text-sm transition-colors hover:bg-lavender"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}

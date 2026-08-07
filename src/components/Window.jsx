import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== "undefined" && window.innerWidth >= 640
  );
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)");
    const handler = (e) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return isDesktop;
}

/**
 * A draggable, closable "window" — the core signature element of the site.
 *
 * Props:
 *  - id: unique key
 *  - title: filename-style title shown in the titlebar (e.g. "about.txt")
 *  - initial: { x, y } starting position
 *  - width: css width value
 *  - zIndex, onFocus: for click-to-front stacking
 *  - onClose: optional — omit to hide the close button
 *  - rotate: slight resting rotation in degrees, for the scattered-desktop feel
 */
export default function Window({
  id,
  title,
  children,
  initial = { x: 0, y: 0 },
  width = 340,
  zIndex = 1,
  onFocus,
  onClose,
  rotate = 0,
  dragConstraintsRef,
}) {
  const controlsRef = useRef(null);
  const isDesktop = useIsDesktop();

  const desktopProps = isDesktop
    ? {
        drag: true,
        dragMomentum: true,
        dragElastic: 0.05,
        dragConstraints: dragConstraintsRef,
        initial: { opacity: 0, y: initial.y + 16, x: initial.x, rotate: 0, scale: 0.97 },
        animate: { opacity: 1, y: initial.y, x: initial.x, rotate, scale: 1 },
        style: { position: "absolute", width, zIndex, touchAction: "none" },
      }
    : {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        style: { position: "static", width: "100%", zIndex },
      };

  return (
    <motion.div
      ref={controlsRef}
      onPointerDown={() => onFocus?.(id)}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      whileDrag={isDesktop ? { rotate: 0, scale: 1.1, cursor: "grabbing" } : undefined}
      className="select-none mb-4 sm:mb-0 max-w-full mx-auto sm:mx-0"
      {...desktopProps}
    >
      <div className="rounded-lg overflow-hidden shadow-win hover:shadow-winActive transition-shadow duration-200 bg-cream border border-chromeline">
        {/* Titlebar */}
        <div
          className={`flex items-center justify-between gap-2 px-3 py-2 bg-chrome border-b border-chromeline ${
            isDesktop ? "cursor-grab active:cursor-grabbing" : ""
          }`}
        >
          <span className="font-mono text-xs text-ink/70 tracking-tight truncate">
            {title}
          </span>
          {onClose && (
            <button
              aria-label={`Close ${title}`}
              onClick={(e) => {
                e.stopPropagation();
                onClose(id);
              }}
              className="w-4 h-4 flex items-center justify-center rounded-sm text-ink/50 hover:text-ink hover:bg-chromeline transition-colors font-mono text-xs leading-none"
            >
              ×
            </button>
          )}
        </div>
        {/* Content */}
        <div className="p-4 cursor-auto">{children}</div>
      </div>
    </motion.div>
  );
}

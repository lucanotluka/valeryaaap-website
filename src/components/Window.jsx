import { motion, useDragControls } from "framer-motion";
import { useState, useEffect } from "react";

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
 * pos:   { left, top } in % of the viewport (left can be "center")
 * width: any CSS width, ideally clamp(min, vw, max) so it scales with the device
 * On phones (< 640px) windows ignore pos/width and stack full-width.
 */
export default function Window({
  id,
  title,
  children,
  pos = { left: 10, top: 14 },
  width = "clamp(300px, 28vw, 400px)",
  zIndex = 1,
  onFocus,
  onClose,
  rotate = 0,
  dragConstraintsRef,
}) {
  const isDesktop = useIsDesktop();
  const dragControls = useDragControls();

  const baseLeft = pos.left === "center" ? `calc(50% - ${width} / 2)` : `${pos.left}%`;

  const desktopProps = isDesktop
    ? {
        drag: true,
        dragControls,
        dragListener: false, // drag starts from the titlebar only
        dragMomentum: true,
        dragElastic: 0.05,
        dragConstraints: dragConstraintsRef,
        initial: { opacity: 0, y: 16, scale: 0.97, rotate: 0 },
        animate: { opacity: 1, y: 0, scale: 1, rotate },
        style: {
          position: "absolute",
          width,
          left: `max(8px, min(${baseLeft}, calc(100% - ${width} - 12px)))`,
          top: `${pos.top}%`,
          zIndex,
        },
      }
    : {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        style: { position: "static", width: "100%", zIndex },
      };

  // content scrolls instead of overflowing the screen
  const contentStyle = isDesktop
    ? { maxHeight: `max(12rem, calc(100dvh - ${pos.top}dvh - 8rem))`, scrollbarWidth: "thin" }
    : undefined;

  return (
    <motion.div
      onPointerDown={() => onFocus?.(id)}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      whileDrag={isDesktop ? { rotate: 0, scale: 1.05, cursor: "grabbing" } : undefined}
      className="select-none mb-4 sm:mb-0 max-w-full mx-auto sm:mx-0"
      {...desktopProps}
    >
      <div className="rounded-lg overflow-hidden shadow-win hover:shadow-winActive transition-shadow duration-200 bg-cream border border-chromeline">
        <div
          onPointerDown={(e) => { if (isDesktop) dragControls.start(e); }}
          style={{ touchAction: "none" }}
          className={`flex items-center justify-between gap-2 px-3 py-2 bg-chrome border-b border-chromeline ${
            isDesktop ? "cursor-grab active:cursor-grabbing" : ""
          }`}
        >
          <span className="font-mono text-xs text-ink/70 tracking-tight truncate">{title}</span>
          {onClose && (
            <button
              aria-label={`Close ${title}`}
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => { e.stopPropagation(); onClose(id); }}
              className="w-4 h-4 flex items-center justify-center rounded-sm text-ink/50 hover:text-ink hover:bg-chromeline transition-colors font-mono text-xs leading-none"
            >
              ×
            </button>
          )}
        </div>
        <div className="p-4 cursor-auto overflow-y-auto" style={contentStyle}>
          {children}
        </div>
      </div>
    </motion.div>
  );
}

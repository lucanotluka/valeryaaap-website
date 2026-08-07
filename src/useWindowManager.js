import { useState, useCallback } from "react";

/**
 * Manages z-index stacking (click-to-front) and open/closed state
 * for a set of windows identified by id.
 */
export function useWindowManager(initialOpenIds = []) {
  const [order, setOrder] = useState(initialOpenIds); // stacking order, last = front
  const [open, setOpen] = useState(() => new Set(initialOpenIds));

  const focus = useCallback((id) => {
    setOrder((prev) => [...prev.filter((x) => x !== id), id]);
  }, []);

  const openWindow = useCallback((id) => {
    setOpen((prev) => new Set(prev).add(id));
    setOrder((prev) => [...prev.filter((x) => x !== id), id]);
  }, []);

  const closeWindow = useCallback((id) => {
    setOpen((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }, []);

  const toggleWindow = useCallback(
    (id) => {
      setOpen((prev) => {
        if (prev.has(id)) {
          const next = new Set(prev);
          next.delete(id);
          return next;
        } else {
          setOrder((o) => [...o.filter((x) => x !== id), id]);
          return new Set(prev).add(id);
        }
      });
    },
    []
  );

  const zIndexOf = useCallback(
    (id) => {
      const idx = order.indexOf(id);
      return 10 + (idx === -1 ? 0 : idx);
    },
    [order]
  );

  const isOpen = useCallback((id) => open.has(id), [open]);

  return { focus, openWindow, closeWindow, toggleWindow, zIndexOf, isOpen };
}

import { useEffect, useRef } from "react";

export function useScrolledToEnd<T extends HTMLElement>({
  threshold = 200,
  callback,
}: {
  threshold?: number;
  callback: Function;
}) {
  const containerRef = useRef<T>(null);

  useEffect(() => {
    const div = containerRef.current;

    if (!div) return;

    function scrollEndHandler(event: Event) {
      const target = event.target as HTMLElement;

      const bottomOffset =
        target.scrollTop + target.clientHeight - target.scrollHeight;

      if (bottomOffset < threshold) {
        callback();
      }
    }

    div.addEventListener("scrollend", scrollEndHandler);

    return () => div.removeEventListener("scrollend", scrollEndHandler);
  }, [threshold, callback]);

  return { containerRef };
}

import { useEffect, useRef, useState } from "react";

export const useHorizontalScroll = (dependencies = []) => {
  const ref = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    const el = ref.current;
    if (!el) return;

    const maxScroll = el.scrollWidth - el.clientWidth;

    const scrollLeft = Math.round(el.scrollLeft);

    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < Math.floor(maxScroll));
  };

  const scroll = (direction) => {
    if (!ref.current) return;
    const scrollAmount =
      direction === "left"
        ? -ref.current.clientWidth * 0.75
        : ref.current.clientWidth * 0.75;

    ref.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleScroll = () => requestAnimationFrame(checkScroll);
    el.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", checkScroll);

    checkScroll();

    return () => {
      el.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.scrollLeft = 0;
    checkScroll();
  }, [...dependencies]);

  return { ref, scroll, canScrollLeft, canScrollRight };
};

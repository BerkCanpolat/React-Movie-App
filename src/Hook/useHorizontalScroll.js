import { useEffect, useRef, useState } from "react";

export const useHorizontalScroll = () => {
  const ref = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scroll = (direction) => {
    if (!ref.current) return;
    const scrollAmount = direction === "left"
      ? -ref.current.clientWidth * 0.75
      : ref.current.clientWidth * 0.75;

    ref.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleScroll = () => {
      const maxScroll = el.scrollWidth - el.clientWidth;
      setCanScrollLeft(el.scrollLeft > 10);
      setCanScrollRight(el.scrollLeft < maxScroll - 10);
    };

    el.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  return { ref, scroll, canScrollLeft, canScrollRight };
};

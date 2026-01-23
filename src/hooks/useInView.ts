import { RefObject, useEffect, useState } from 'react';

interface UseInViewOptions {
  once?: boolean;
  margin?: string;
  threshold?: number | number[];
}

export function useInView(
  ref: RefObject<Element | null>,
  { once = false, margin = '0px', threshold = 0 }: UseInViewOptions = {},
): boolean {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (once) {
            observer.unobserve(element);
          }
        } else if (!once) {
          setIsInView(false);
        }
      },
      {
        rootMargin: margin,
        threshold,
      },
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [ref, once, margin, threshold]);

  return isInView;
}

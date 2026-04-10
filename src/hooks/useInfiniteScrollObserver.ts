import { useEffect, useRef } from 'react';

type UseInfiniteScrollObserverParams = {
  hasNextPage?: boolean;
  isFetching: boolean;
  onLoadMore: () => void | Promise<unknown>;
  root?: Element | null;
  rootMargin?: string;
  threshold?: number;
  enabled?: boolean;
};

export const useInfiniteScrollObserver = <
  T extends HTMLElement = HTMLDivElement,
>(
  params: UseInfiniteScrollObserverParams
) => {
  const {
    hasNextPage = true,
    isFetching,
    onLoadMore,
    root = null,
    rootMargin = '0px',
    threshold = 0,
    enabled = true,
  } = params;

  const targetRef = useRef<T | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const target = targetRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry?.isIntersecting) return;
        if (!hasNextPage || isFetching) return;
        onLoadMore();
      },
      {
        root,
        rootMargin,
        threshold,
      }
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, [
    enabled,
    hasNextPage,
    isFetching,
    onLoadMore,
    root,
    rootMargin,
    threshold,
  ]);

  return targetRef;
};

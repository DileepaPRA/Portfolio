import { useRef, useCallback } from "react";

export interface SwipeHandlers {
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchEnd: (e: React.TouchEvent) => void;
}

export interface UseSwipeOptions {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  threshold?: number;
}

/**
 * Custom hook to detect mobile horizontal swipe gestures on carousels.
 * Specifically configured according to design specs:
 * - Left swipe triggers `onSwipeLeft` (e.g. previous button)
 * - Right swipe triggers `onSwipeRight` (e.g. next button)
 */
export function useSwipe({
  onSwipeLeft,
  onSwipeRight,
  threshold = 40,
}: UseSwipeOptions): SwipeHandlers {
  const touchCoords = useRef<{ x: number; y: number; time: number } | null>(null);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    // Only track single touch gestures
    if (e.touches.length === 1) {
      touchCoords.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
        time: Date.now(),
      };
    }
  }, []);

  const onTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (!touchCoords.current) return;
      if (e.changedTouches.length === 0) return;

      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;
      const deltaX = endX - touchCoords.current.x;
      const deltaY = endY - touchCoords.current.y;
      const deltaTime = Date.now() - touchCoords.current.time;

      touchCoords.current = null;

      // Ignore if touch lasted too long (e.g. long press / hold > 800ms)
      if (deltaTime > 800) return;

      // Ensure horizontal intent: deltaX is dominant over deltaY and meets threshold
      if (Math.abs(deltaX) > Math.abs(deltaY) * 1.2 && Math.abs(deltaX) >= threshold) {
        if (deltaX < 0) {
          // Swiped left -> corresponds to clicking left button
          onSwipeLeft?.();
        } else {
          // Swiped right -> corresponds to clicking right button
          onSwipeRight?.();
        }
      }
    },
    [onSwipeLeft, onSwipeRight, threshold]
  );

  return { onTouchStart, onTouchEnd };
}

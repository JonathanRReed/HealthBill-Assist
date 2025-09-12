import { useEffect, useRef } from "react";

interface ScreenReaderAnnouncementProps {
  message: string;
  priority?: "polite" | "assertive";
  clearAfter?: number;
}

/**
 * Screen reader announcement component for dynamic content updates
 * Announces important changes to screen reader users
 */
export function ScreenReaderAnnouncement({ 
  message, 
  priority = "polite",
  clearAfter = 3000 
}: ScreenReaderAnnouncementProps) {
  const announcementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (message && announcementRef.current) {
      // Clear previous content
      announcementRef.current.textContent = "";
      
      // Use setTimeout to ensure the change is detected
      setTimeout(() => {
        if (announcementRef.current) {
          announcementRef.current.textContent = message;
        }
      }, 100);

      // Clear the announcement after specified time to prevent it from being read again
      if (clearAfter > 0) {
        const timer = setTimeout(() => {
          if (announcementRef.current) {
            announcementRef.current.textContent = "";
          }
        }, clearAfter);

        return () => clearTimeout(timer);
      }
    }
  }, [message, clearAfter]);

  return (
    <div
      ref={announcementRef}
      className="sr-only"
      aria-live={priority}
      aria-atomic="true"
      role="status"
    />
  );
}

/**
 * Hook for making screen reader announcements
 */
export function useScreenReaderAnnouncement() {
  const announcementRef = useRef<HTMLDivElement>(null);

  const announce = (message: string, priority: "polite" | "assertive" = "polite") => {
    if (announcementRef.current) {
      // Clear and reset to trigger announcement
      announcementRef.current.textContent = "";
      setTimeout(() => {
        if (announcementRef.current) {
          announcementRef.current.textContent = message;
          announcementRef.current.setAttribute("aria-live", priority);
        }
      }, 100);

      // Clear after 3 seconds
      setTimeout(() => {
        if (announcementRef.current) {
          announcementRef.current.textContent = "";
        }
      }, 3000);
    }
  };

  const AnnouncementRegion = () => (
    <div
      ref={announcementRef}
      className="sr-only"
      aria-live="polite"
      aria-atomic="true"
      role="status"
    />
  );

  return { announce, AnnouncementRegion };
}
import React, { useRef, memo } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useTheme } from "@/design-system/ThemeProvider";

interface RotatingTitleProps {
  titles: string[];
  interval?: number;
  className?: string;
}

const RotatingTitle: React.FC<RotatingTitleProps> = memo(
  ({ titles, interval = 3000, className = "" }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const currentTitleRef = useRef<HTMLSpanElement>(null);
    const nextTitleRef = useRef<HTMLSpanElement>(null);
    const indexRef = useRef(0);
    const timelineRef = useRef<gsap.core.Timeline | null>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const { themeName } = useTheme();

    useGSAP(() => {
      if (
        !containerRef.current ||
        !currentTitleRef.current ||
        !nextTitleRef.current ||
        titles.length === 0
      )
        return;

      const updateWidths = () => {
        if (!currentTitleRef.current || !nextTitleRef.current) return;

        // Calculate the maximum width needed
        const tempSpan = document.createElement("span");
        tempSpan.style.visibility = "hidden";
        tempSpan.style.position = "absolute";
        tempSpan.style.fontSize = window.getComputedStyle(
          currentTitleRef.current
        ).fontSize;
        tempSpan.style.fontFamily = window.getComputedStyle(
          currentTitleRef.current
        ).fontFamily;
        tempSpan.style.fontWeight = window.getComputedStyle(
          currentTitleRef.current
        ).fontWeight;
        document.body.appendChild(tempSpan);

        let maxWidth = 0;
        titles.forEach((title) => {
          tempSpan.textContent = title;
          maxWidth = Math.max(maxWidth, tempSpan.offsetWidth);
        });

        document.body.removeChild(tempSpan);

        // Set container width to max width plus some padding
        if (containerRef.current) {
          containerRef.current.style.width = `${maxWidth + 20}px`;
        }
      };

      // Initial width calculation
      updateWidths();

      // Add resize listener
      window.addEventListener("resize", updateWidths);

      // Initial setup
      currentTitleRef.current.textContent = titles[0];
      nextTitleRef.current.textContent = titles[1];

      // Set initial positions
      gsap.set(currentTitleRef.current, {
        position: "absolute",
        width: "100%",
        left: 0,
        opacity: 1,
        y: 0,
        scale: 1,
      });

      gsap.set(nextTitleRef.current, {
        position: "absolute",
        width: "100%",
        left: 0,
        opacity: 0,
        y: 20,
        scale: 0.8,
      });

      const rotateTitle = () => {
        if (!currentTitleRef.current || !nextTitleRef.current) return;

        // Kill any existing timeline
        if (timelineRef.current) {
          timelineRef.current.kill();
        }

        const nextIndex = (indexRef.current + 1) % titles.length;
        nextTitleRef.current.textContent = titles[nextIndex];

        // Update widths before animation
        updateWidths();

        // Create new timeline
        timelineRef.current = gsap.timeline();

        // Animate current title up and out
        timelineRef.current.to(currentTitleRef.current, {
          opacity: 0,
          y: -20,
          scale: 0.8,
          duration: 0.8,
          ease: "power2.inOut",
        });

        // Animate next title up and in
        timelineRef.current.fromTo(
          nextTitleRef.current,
          {
            opacity: 0,
            y: 20,
            scale: 0.8,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power2.inOut",
          },
          "-=0.8"
        );

        // After animation completes
        timelineRef.current.call(() => {
          if (!currentTitleRef.current || !nextTitleRef.current) return;

          // Update current title
          currentTitleRef.current.textContent =
            nextTitleRef.current.textContent;
          nextTitleRef.current.textContent = "";

          // Reset positions
          gsap.set(currentTitleRef.current, {
            opacity: 1,
            y: 0,
            scale: 1,
          });
          gsap.set(nextTitleRef.current, {
            opacity: 0,
            y: 20,
            scale: 0.8,
          });

          indexRef.current = nextIndex;
        });
      };

      // Clear any existing timeouts and intervals
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      // Add a 1-second delay before starting the rotation
      timeoutRef.current = setTimeout(() => {
        intervalRef.current = setInterval(rotateTitle, interval);
      }, 1000);

      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        window.removeEventListener("resize", updateWidths);
        if (timelineRef.current) {
          timelineRef.current.kill();
        }
      };
    }, [titles, interval, themeName]);

    return (
      <div
        ref={containerRef}
        className={className}
        style={{
          position: "relative",
          minHeight: "2rem",
          margin: 0,
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <span
          ref={currentTitleRef}
          style={{
            display: "block",
            textAlign: "left",
            whiteSpace: "nowrap",
            fontSize: "clamp(0.875rem, 4vw, 1.75rem)",
            fontWeight: 600,
            lineHeight: 1.2,
            transformOrigin: "center center",
          }}
        />
        <span
          ref={nextTitleRef}
          style={{
            display: "block",
            textAlign: "left",
            whiteSpace: "nowrap",
            fontSize: "clamp(0.875rem, 4vw, 1.75rem)",
            fontWeight: 600,
            lineHeight: 1.2,
            transformOrigin: "center center",
          }}
        />
      </div>
    );
  }
);

RotatingTitle.displayName = "RotatingTitle";

export default RotatingTitle;

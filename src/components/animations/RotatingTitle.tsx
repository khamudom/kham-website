import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface RotatingTitleProps {
  titles: string[];
  interval?: number;
  className?: string;
}

const RotatingTitle: React.FC<RotatingTitleProps> = ({
  titles,
  interval = 3000,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const currentTitleRef = useRef<HTMLSpanElement>(null);
  const nextTitleRef = useRef<HTMLSpanElement>(null);
  const indexRef = useRef(0);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

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
      left: "50%",
      xPercent: -50,
      opacity: 1,
      y: 0,
    });

    gsap.set(nextTitleRef.current, {
      position: "absolute",
      width: "100%",
      left: "50%",
      xPercent: -50,
      opacity: 0,
      y: 20,
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

      timelineRef.current
        .to(currentTitleRef.current, {
          opacity: 0,
          y: -20,
          duration: 0.8,
          ease: "power2.inOut",
        })
        .fromTo(
          nextTitleRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.inOut" },
          "-=0.8"
        )
        .call(() => {
          if (!currentTitleRef.current || !nextTitleRef.current) return;

          // Update current title
          currentTitleRef.current.textContent =
            nextTitleRef.current.textContent;
          nextTitleRef.current.textContent = "";

          // Reset positions
          gsap.set(currentTitleRef.current, { opacity: 1, y: 0 });
          gsap.set(nextTitleRef.current, { opacity: 0, y: 20 });

          indexRef.current = nextIndex;
        });
    };

    const intervalId = setInterval(rotateTitle, interval);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener("resize", updateWidths);
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, [titles, interval]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        position: "relative",
        minHeight: "4.2rem",
        margin: "0 auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <span
        ref={currentTitleRef}
        style={{
          display: "block",
          textAlign: "center",
          whiteSpace: "nowrap",
          fontSize: "clamp(2rem, 5vw, 3.5rem)",
          fontWeight: 600,
          lineHeight: 1.2,
        }}
      />
      <span
        ref={nextTitleRef}
        style={{
          display: "block",
          textAlign: "center",
          whiteSpace: "nowrap",
          fontSize: "clamp(2rem, 5vw, 3.5rem)",
          fontWeight: 600,
          lineHeight: 1.2,
        }}
      />
    </div>
  );
};

export default RotatingTitle;

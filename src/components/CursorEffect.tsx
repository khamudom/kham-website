"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@/design-system/ThemeProvider";
import styles from "./CursorEffect.module.css";

interface Point {
  x: number;
  y: number;
}

export const CursorEffect = () => {
  const { themeName } = useTheme();
  const [points, setPoints] = useState<Point[]>([]);
  const [mousePosition, setMousePosition] = useState<Point>({ x: 0, y: 0 });

  useEffect(() => {
    // Only add event listener if Matrix theme is active
    if (themeName !== "matrix") {
      setPoints([]); // Clear points when not in Matrix theme
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setPoints((prevPoints) => {
        const newPoints = [...prevPoints, { x: e.clientX, y: e.clientY }];
        // Keep only the last 20 points for the trail
        return newPoints.slice(-15);
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [themeName]); // Add themeName to dependencies

  // Don't render anything if not in Matrix theme
  if (themeName !== "matrix") {
    return null;
  }

  return (
    <div className={styles.cursorContainer}>
      {points.map((point, index) => (
        <div
          key={index}
          className={styles.cursorDot}
          style={{
            left: point.x,
            top: point.y,
            opacity: index / points.length,
            transform: `scale(${index / points.length})`,
          }}
        />
      ))}
    </div>
  );
};

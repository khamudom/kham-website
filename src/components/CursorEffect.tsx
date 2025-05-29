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

  useEffect(() => {
    if (themeName !== "matrix") {
      setPoints([]);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPoints((prevPoints) => {
        const newPoints = [...prevPoints, { x: e.clientX, y: e.clientY }];
        return newPoints.slice(-15);
      });
    };

    const handleMouseLeave = () => {
      setPoints([]);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseout", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseout", handleMouseLeave);
    };
  }, [themeName]);

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
            opacity: (index + 1) / points.length,
            transform: `scale(${(index + 1) / points.length})`
          }}
        />
      ))}
    </div>
  );
};

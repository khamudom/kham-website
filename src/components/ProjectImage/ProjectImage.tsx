"use client";

import React from "react";
import Image from "next/image";
import styles from "./ProjectImage.module.css";

interface ProjectImageProps {
  imagePath: string;
  title: string;
  className?: string;
  width?: number;
  height?: number;
}

export default function ProjectImage({
  imagePath,
  title,
  className,
  width = 1200,
  height = 800,
}: ProjectImageProps) {
  return (
    <div className={className}>
      <Image
        src={imagePath}
        alt={title}
        width={width}
        height={height}
        className={styles.image}
        onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
          e.currentTarget.src = "/images/placeholder.jpg";
        }}
      />
    </div>
  );
}

"use client";

import React from "react";
import { getImagePath } from "@/utils/imageLoader";
import styles from "./ProjectImage.module.css";

interface ProjectImageProps {
  imagePath: string;
  title: string;
  className?: string;
}

export default function ProjectImage({
  imagePath,
  title,
  className,
}: ProjectImageProps) {
  return (
    <img
      className={className}
      src={getImagePath(imagePath, "large")}
      alt={title}
      onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
        e.currentTarget.src = getImagePath("/images/placeholder.jpg", "large");
      }}
    />
  );
}

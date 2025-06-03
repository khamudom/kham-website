"use client";

import React, { useState } from "react";
import { Typography } from "@mui/material";
import styles from "./ProjectIframe.module.css";

interface ProjectIframeProps {
  src: string;
  title: string;
}

export default function ProjectIframe({ src, title }: ProjectIframeProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={styles.iframeWrapper}>
      {isLoading && (
        <div className={styles.iframeLoading}>
          <Typography variant="body1">Loading project preview...</Typography>
        </div>
      )}
      <iframe
        src={src}
        title={title}
        className={styles.projectIframe}
        loading="lazy"
        sandbox="allow-scripts allow-same-origin"
        referrerPolicy="no-referrer"
        onLoad={() => setIsLoading(false)}
        style={{ opacity: isLoading ? 0 : 1 }}
      />
    </div>
  );
}

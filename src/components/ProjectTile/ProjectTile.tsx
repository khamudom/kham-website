/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "./ProjectTile.module.css";
import { Chip } from "@mui/material";

interface ProjectTileProps {
  width?: number;
  height?: number;
  href?: string;
  target?: string;
  title?: string;
  imgSrc?: string;
  imgAlt?: string;
  projectType?: string;
}

const ProjectTile = ({
  width,
  height,
  title,
  href,
  target,
  imgSrc,
  imgAlt,
  projectType,
}: ProjectTileProps) => {
  return (
    <div
      className={styles.card}
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      <a
        className={styles.anchor}
        href={href}
        target={target}
        aria-label={title}
      ></a>
      <img className={styles.image} src={imgSrc} alt={imgAlt} />
      <div className={styles.overlay}></div>
      <div className={styles.contentWrapper}>
        <div className={styles.content}>
          <span className={styles.title}>{title}</span>
          <div className={styles.type}>
            <Chip
              label={projectType}
              variant="outlined"
              sx={{
                borderColor: "#FFFFFF",
                "& .MuiChip-label": {
                  color: "#FFFFFF",
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectTile;

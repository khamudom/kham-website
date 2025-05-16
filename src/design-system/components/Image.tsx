import React from "react";
import { Box, BoxProps } from "@mui/material";
import { getImagePath, getResponsiveSizes } from "../../utils/imageLoader";
import tokens from "../tokens";

export interface ImageProps extends Omit<BoxProps, "component"> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  rounded?: boolean | "sm" | "md" | "lg" | "full";
  aspectRatio?: string;
  overlay?: boolean;
  overlayColor?: string;
  overlayOpacity?: number;
  size?: "thumbnail" | "medium" | "large" | "full";
  responsiveSizes?: Record<string, "thumbnail" | "medium" | "large" | "full">;
}

export const Image: React.FC<ImageProps> = ({
  src,
  alt,
  width,
  height,
  objectFit = "cover",
  rounded = false,
  aspectRatio,
  overlay = false,
  overlayColor = "rgba(0, 0, 0, 0.5)",
  overlayOpacity = 0.5,
  size,
  responsiveSizes,
  ...props
}) => {
  // Determine border radius based on rounded prop
  const getBorderRadius = () => {
    if (rounded === true) return tokens.borders.radius.md;
    if (rounded === "sm") return tokens.borders.radius.sm;
    if (rounded === "md") return tokens.borders.radius.md;
    if (rounded === "lg") return tokens.borders.radius.lg;
    if (rounded === "full") return tokens.borders.radius.full;
    return "0";
  };

  const imagePath = getImagePath(src, size);
  const sizes = responsiveSizes
    ? getResponsiveSizes(responsiveSizes)
    : undefined;

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        borderRadius: getBorderRadius(),
        width: width ? `${width}px` : "100%",
        height: height ? `${height}px` : "auto",
        aspectRatio: aspectRatio,
        ...props.sx,
      }}
      {...props}
    >
      <img
        src={imagePath}
        alt={alt}
        style={{
          width: "100%",
          height: "100%",
          objectFit,
        }}
        sizes={sizes}
        loading="lazy"
      />

      {overlay && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: overlayColor,
            opacity: overlayOpacity,
            zIndex: 1,
          }}
        />
      )}
    </Box>
  );
};

export default Image;

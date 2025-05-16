import React from "react";
import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
} from "@mui/material";
import { Link } from "react-router-dom";
import tokens from "../tokens";

export interface ButtonProps extends Omit<MuiButtonProps, "variant"> {
  variant?: "contained" | "outlined" | "text";
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  onClick?: () => void;
  href?: string;
  to?: string;
  download?: string;
  component?: React.ElementType;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "contained",
  size = "medium",
  fullWidth = false,
  startIcon,
  endIcon,
  onClick,
  href,
  to,
  download,
  component,
  ...props
}) => {
  // Size-based styles
  const sizeStyles = {
    small: {
      padding: `${tokens.spacing[2]} ${tokens.spacing[4]}`,
      fontSize: tokens.typography.fontSize.sm,
    },
    medium: {
      padding: `${tokens.spacing[3]} ${tokens.spacing[6]}`,
      fontSize: tokens.typography.fontSize.base,
    },
    large: {
      padding: `${tokens.spacing[4]} ${tokens.spacing[8]}`,
      fontSize: tokens.typography.fontSize.lg,
    },
  };

  // Variant-based styles
  const variantStyles = {
    contained: {
      backgroundColor: tokens.colors.primary.main,
      color: tokens.colors.neutral.white,
      "&:hover": {
        backgroundColor: tokens.colors.primary.light,
        boxShadow: "none",
      },
    },
    outlined: {
      borderColor: tokens.colors.primary.main,
      color: tokens.colors.primary.main,
      "&:hover": {
        backgroundColor: "rgba(0, 102, 204, 0.04)",
        borderColor: tokens.colors.primary.light,
      },
    },
    text: {
      color: tokens.colors.primary.main,
      "&:hover": {
        backgroundColor: "rgba(0, 102, 204, 0.04)",
      },
    },
  };

  const buttonProps = {
    variant,
    size,
    fullWidth,
    startIcon,
    endIcon,
    onClick,
    ...(href ? { href } : {}),
    ...(to ? { component: Link, to } : {}),
    ...(download ? { download } : {}),
    ...(component ? { component } : {}),
  };

  return (
    <MuiButton
      {...buttonProps}
      sx={{
        textTransform: "none",
        fontWeight: tokens.typography.fontWeights.medium,
        borderRadius: tokens.borders.radius.md,
        transition: `all ${tokens.transitions.duration.normal} ${tokens.transitions.timing.spring}`,
        boxShadow: "none",
        ...sizeStyles[size],
        ...variantStyles[variant],
        ...props.sx,
      }}
      {...props}
    >
      {children}
    </MuiButton>
  );
};

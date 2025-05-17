import React from "react";
import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
} from "@mui/material";
import Link from "next/link";
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

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ href, to, ...props }, ref) => {
    if (href) {
      return <MuiButton ref={ref} component={Link} href={href} {...props} />;
    }

    return <MuiButton ref={ref} {...props} />;
  }
);

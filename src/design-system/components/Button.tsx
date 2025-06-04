/**
 * Custom Button component that extends Material-UI's Button component.
 * This component serves as a wrapper around MUI's Button to:
 * 1. Provide a consistent button interface across the application
 * 2. Add Next.js Link integration for navigation
 * 3. Simplify the variant options to only include 'contained', 'outlined', and 'text'
 * 4. Add support for both href (Next.js Link) and regular button functionality
 */
import React from "react";
import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
} from "@mui/material";
import Link from "next/link";

/**
 * Extended button props interface that:
 * - Omits the original MuiButtonProps variant to restrict it to our custom variants
 * - Adds support for Next.js Link integration via href prop
 * - Maintains all other MUI Button props
 */
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

/**
 * Button component that conditionally renders either:
 * - A Next.js Link component (when href prop is provided)
 * - A regular MUI Button (when no href is provided)
 *
 * This allows for seamless navigation while maintaining consistent styling
 * and behavior across the application.
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ href, to, ...props }, ref) => {
    if (href) {
      return <MuiButton ref={ref} component={Link} href={href} {...props} />;
    }

    return <MuiButton ref={ref} {...props} />;
  }
);

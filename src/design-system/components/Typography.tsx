import React from 'react';
import { Typography as MuiTypography, TypographyProps as MuiTypographyProps } from '@mui/material';
import tokens from '../tokens';
import { useTheme } from '../ThemeProvider';

export interface TypographyProps extends MuiTypographyProps {
  gradient?: boolean;
  truncate?: boolean;
  maxLines?: number;
}

export const Typography: React.FC<TypographyProps> = ({
  children,
  variant = 'body1',
  component,
  gradient = false,
  truncate = false,
  maxLines,
  ...props
}) => {
  const { mode } = useTheme();
  const themeTokens = mode === 'light' ? tokens.lightTheme : tokens.darkTheme;
  
  // Default component mapping based on variant
  const getDefaultComponent = () => {
    switch (variant) {
      case 'h1': return 'h1';
      case 'h2': return 'h2';
      case 'h3': return 'h3';
      case 'h4': return 'h4';
      case 'h5': return 'h5';
      case 'h6': return 'h6';
      case 'subtitle1': return 'h6';
      case 'subtitle2': return 'h6';
      case 'body1': return 'p';
      case 'body2': return 'p';
      case 'caption': return 'span';
      case 'button': return 'span';
      case 'overline': return 'span';
      default: return 'p';
    }
  };

  // Gradient text styles
  const gradientStyles = gradient ? {
    background: `linear-gradient(to right, ${tokens.colors.primary.main}, ${tokens.colors.primary.light})`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    color: 'transparent',
  } : {};

  // Text truncation styles
  const truncateStyles = truncate ? {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  } : {};

  // Multi-line truncation
  const maxLinesStyles = maxLines ? {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: maxLines,
    WebkitBoxOrient: 'vertical',
  } : {};

  return (
    <MuiTypography
      variant={variant}
      component={component || getDefaultComponent()}
      sx={{
        color: themeTokens.colors.text.primary,
        ...gradientStyles,
        ...truncateStyles,
        ...maxLinesStyles,
        ...props.sx,
      }}
      {...props}
    >
      {children}
    </MuiTypography>
  );
};

export default Typography;
import React from 'react';
import { Box, BoxProps } from '@mui/material';
import tokens from '../tokens';
import { useTheme } from '../ThemeProvider';

export interface SectionProps extends BoxProps {
  variant?: 'primary' | 'secondary' | 'tertiary';
  fullHeight?: boolean;
  centered?: boolean;
  spacing?: keyof typeof tokens.spacing;
}

export const Section: React.FC<SectionProps> = ({
  children,
  variant = 'primary',
  fullHeight = false,
  centered = false,
  spacing = 8,
  ...props
}) => {
  const { mode } = useTheme();
  const themeTokens = mode === 'light' ? tokens.lightTheme : tokens.darkTheme;
  
  // Determine background color based on variant
  const getBackgroundColor = () => {
    switch (variant) {
      case 'secondary':
        return themeTokens.colors.background.secondary;
      case 'tertiary':
        return themeTokens.colors.background.tertiary;
      case 'primary':
      default:
        return themeTokens.colors.background.primary;
    }
  };

  return (
    <Box
      component="section"
      sx={{
        backgroundColor: getBackgroundColor(),
        minHeight: fullHeight ? '100vh' : 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: centered ? 'center' : 'flex-start',
        alignItems: centered ? 'center' : 'stretch',
        py: tokens.spacing[spacing],
        ...props.sx,
      }}
      {...props}
    >
      {children}
    </Box>
  );
};

export default Section;
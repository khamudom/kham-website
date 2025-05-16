import React from 'react';
import { Card as MuiCard, CardProps as MuiCardProps, CardContent, CardMedia, Typography, Box } from '@mui/material';
import tokens from '../tokens';
import { useTheme } from '../ThemeProvider';

export interface CardProps extends Omit<MuiCardProps, 'variant'> {
  title?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  imageHeight?: number | string;
  variant?: 'elevated' | 'outlined' | 'filled';
  actions?: React.ReactNode;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  title,
  description,
  image,
  imageAlt = '',
  imageHeight = 200,
  variant = 'outlined',
  actions,
  onClick,
  children,
  ...props
}) => {
  const { mode } = useTheme();
  const themeTokens = mode === 'light' ? tokens.lightTheme : tokens.darkTheme;
  
  // Determine card styling based on variant
  const getCardStyles = () => {
    switch (variant) {
      case 'elevated':
        return {
          boxShadow: tokens.shadows.md,
          border: 'none',
        };
      case 'filled':
        return {
          boxShadow: 'none',
          border: 'none',
          backgroundColor: themeTokens.colors.background.secondary,
        };
      case 'outlined':
      default:
        return {
          boxShadow: 'none',
          border: `1px solid ${themeTokens.colors.border}`,
        };
    }
  };

  return (
    <MuiCard
      sx={{
        ...getCardStyles(),
        borderRadius: tokens.borders.radius.md,
        overflow: 'hidden',
        transition: `all ${tokens.transitions.duration.normal} ${tokens.transitions.timing.spring}`,
        '&:hover': onClick ? {
          transform: 'translateY(-4px)',
          boxShadow: tokens.shadows.md,
          cursor: 'pointer',
        } : {},
      }}
      onClick={onClick}
      {...props}
    >
      {image && (
        <CardMedia
          component="img"
          height={imageHeight}
          image={image}
          alt={imageAlt}
        />
      )}
      
      {(title || description) && (
        <CardContent>
          {title && (
            <Typography 
              variant="h5" 
              component="h2" 
              gutterBottom
              sx={{ 
                color: themeTokens.colors.text.primary,
                fontWeight: tokens.typography.fontWeights.semibold,
              }}
            >
              {title}
            </Typography>
          )}
          
          {description && (
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{ 
                color: themeTokens.colors.text.secondary,
                mb: 2,
              }}
            >
              {description}
            </Typography>
          )}
          
          {children}
        </CardContent>
      )}
      
      {!title && !description && children}
      
      {actions && (
        <Box sx={{ p: 2, pt: 0 }}>
          {actions}
        </Box>
      )}
    </MuiCard>
  );
};

export default Card;
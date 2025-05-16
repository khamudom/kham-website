import React from 'react';
import { Grid as MuiGrid, GridProps as MuiGridProps } from '@mui/material';
import tokens from '../tokens';

export interface GridProps extends MuiGridProps {
  spacing?: keyof typeof tokens.spacing;
  centered?: boolean;
}

export const Grid: React.FC<GridProps> = ({
  children,
  container = false,
  item = false,
  spacing,
  centered = false,
  ...props
}) => {
  // Only apply spacing if this is a container Grid
  const spacingProp = container && spacing ? Number(spacing) : undefined;

  return (
    <MuiGrid
      container={container}
      item={item}
      spacing={spacingProp}
      sx={{
        justifyContent: centered ? 'center' : props.sx?.justifyContent || 'flex-start',
        alignItems: centered ? 'center' : props.sx?.alignItems || 'flex-start',
        ...props.sx,
      }}
      {...props}
    >
      {children}
    </MuiGrid>
  );
};

export default Grid;
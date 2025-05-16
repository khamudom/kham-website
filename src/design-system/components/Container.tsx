import React from 'react';
import { Container as MuiContainer, ContainerProps as MuiContainerProps } from '@mui/material';
import tokens from '../tokens';

export interface ContainerProps extends MuiContainerProps {
  fluid?: boolean;
  centered?: boolean;
  spacing?: keyof typeof tokens.spacing;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  fluid = false,
  centered = false,
  spacing,
  ...props
}) => {
  return (
    <MuiContainer
      maxWidth={fluid ? false : 'lg'}
      sx={{
        py: spacing ? tokens.spacing[spacing] : tokens.spacing[8],
        textAlign: centered ? 'center' : 'inherit',
        ...props.sx,
      }}
      {...props}
    >
      {children}
    </MuiContainer>
  );
};

export default Container;
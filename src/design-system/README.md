# Design System Documentation

This design system provides a comprehensive set of components, tokens, and utilities to ensure consistent design across the application.

## Table of Contents

1. [Design Tokens](#design-tokens)
2. [Theme Provider](#theme-provider)
3. [Components](#components)
4. [Usage Examples](#usage-examples)
5. [Best Practices](#best-practices)

## Design Tokens

Design tokens are the visual design atoms of the design system. They define the visual properties of the UI:

- **Colors**: Primary, secondary, neutral, and semantic colors
- **Typography**: Font families, sizes, weights, and line heights
- **Spacing**: Consistent spacing scale
- **Borders**: Border radii and widths
- **Shadows**: Elevation levels
- **Z-index**: Layer management
- **Transitions**: Duration and timing functions
- **Breakpoints**: Responsive design breakpoints

These tokens are defined in `tokens.ts` and can be imported and used throughout the application.

```tsx
import { tokens } from '../design-system';

// Using color tokens
const primaryColor = tokens.colors.primary.main;

// Using spacing tokens
const padding = tokens.spacing[4];
```

## Theme Provider

The `ThemeProvider` component manages the application's theme state (light/dark) and provides theme context to all components.

```tsx
import { ThemeProvider } from '../design-system';

function App() {
  return (
    <ThemeProvider>
      {/* Your application */}
    </ThemeProvider>
  );
}
```

You can access the current theme using the `useTheme` hook:

```tsx
import { useTheme } from '../design-system';

function MyComponent() {
  const { mode, toggleTheme, isDark } = useTheme();
  
  return (
    <div>
      <button onClick={toggleTheme}>
        Toggle theme (currently {mode})
      </button>
    </div>
  );
}
```

## Components

The design system includes the following components:

### Button

```tsx
import { Button } from '../design-system';

<Button 
  variant="contained" // 'contained', 'outlined', or 'text'
  color="primary" // 'primary', 'secondary', 'success', 'error', 'warning', 'info'
  size="medium" // 'small', 'medium', or 'large'
  startIcon={<Icon />}
  endIcon={<Icon />}
  onClick={handleClick}
>
  Button Text
</Button>
```

### Typography

```tsx
import { Typography } from '../design-system';

<Typography 
  variant="h1" // 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'body1', 'body2', etc.
  component="h2" // HTML element to render
  gradient={true} // Apply gradient effect
  truncate={true} // Truncate with ellipsis
  maxLines={2} // Limit to specific number of lines
>
  Text content
</Typography>
```

### Card

```tsx
import { Card } from '../design-system';

<Card
  title="Card Title"
  description="Card description text"
  image="https://example.com/image.jpg"
  imageAlt="Image description"
  variant="outlined" // 'elevated', 'outlined', or 'filled'
  actions={<Button>Action</Button>}
  onClick={handleCardClick}
>
  {/* Additional content */}
</Card>
```

### Container

```tsx
import { Container } from '../design-system';

<Container
  fluid={false} // Full width or constrained
  centered={true} // Center content
  spacing={8} // Padding based on spacing scale
>
  {/* Content */}
</Container>
```

### Section

```tsx
import { Section } from '../design-system';

<Section
  variant="primary" // 'primary', 'secondary', or 'tertiary'
  fullHeight={false} // Take full viewport height
  centered={true} // Center content vertically and horizontally
  spacing={8} // Padding based on spacing scale
>
  {/* Content */}
</Section>
```

### Grid

```tsx
import { Grid } from '../design-system';

<Grid container spacing={4}>
  <Grid item xs={12} md={6}>
    {/* Content */}
  </Grid>
  <Grid item xs={12} md={6}>
    {/* Content */}
  </Grid>
</Grid>
```

### Image

```tsx
import { Image } from '../design-system';

<Image
  src="https://example.com/image.jpg"
  alt="Image description"
  width={400}
  height={300}
  objectFit="cover" // 'cover', 'contain', 'fill', 'none', 'scale-down'
  rounded="md" // true, 'sm', 'md', 'lg', 'full'
  fallbackSrc="https://example.com/fallback.jpg"
  aspectRatio="16/9"
  overlay={true}
  overlayColor="rgba(0, 0, 0, 0.5)"
  overlayOpacity={0.5}
/>
```

## Usage Examples

### Complete Page Example

```tsx
import { 
  Section, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  Button, 
  Image 
} from '../design-system';

function ExamplePage() {
  return (
    <>
      <Section variant="primary" fullHeight centered>
        <Container>
          <Typography variant="h1" gradient>
            Welcome to Our Platform
          </Typography>
          <Typography variant="body1">
            A comprehensive solution for your needs
          </Typography>
          <Button variant="contained" size="large">
            Get Started
          </Button>
        </Container>
      </Section>
      
      <Section variant="secondary">
        <Container>
          <Typography variant="h2" centered>
            Our Features
          </Typography>
          
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Card
                title="Feature 1"
                description="Description of feature 1"
                image="https://example.com/feature1.jpg"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Card
                title="Feature 2"
                description="Description of feature 2"
                image="https://example.com/feature2.jpg"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Card
                title="Feature 3"
                description="Description of feature 3"
                image="https://example.com/feature3.jpg"
              />
            </Grid>
          </Grid>
        </Container>
      </Section>
    </>
  );
}
```

## Best Practices

1. **Use tokens for all visual properties**: Instead of hardcoding values, use the design tokens.

2. **Maintain theme consistency**: Use the theme provider and respect the current theme mode.

3. **Responsive design**: Use the responsive utilities and breakpoints for consistent layouts.

4. **Accessibility**: Ensure all components maintain proper accessibility attributes.

5. **Component composition**: Compose complex UIs from the basic components provided.

6. **Consistent spacing**: Use the spacing scale for margins and padding.

7. **Typography hierarchy**: Maintain a clear typographic hierarchy using the provided variants.

8. **Color usage**: Use semantic colors appropriately (e.g., error for error states).

9. **Performance**: Use optimized components like Image for better performance.

10. **Documentation**: Document custom components that extend the design system.
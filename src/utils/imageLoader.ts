/**
 * Image loader utility for local images
 */

// Define common image sizes for responsive images
export const imageSizes = {
  thumbnail: 400,
  medium: 800,
  large: 1200,
  full: 1920,
} as const;

type ImageSize = keyof typeof imageSizes;

/**
 * Get the path for a local image
 * @param path - Path to the image relative to the public directory
 * @param size - Optional size key for responsive imag es
 * @returns Full path to the image
 */
export function getImagePath(path?: string, size?: ImageSize): string {
  if (!path || typeof path !== "string") {
    return "";
  }
  // Remove leading slash if present
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;

  // If no size specified, return the original path
  if (!size) {
    return `/${cleanPath}`;
  }

  // For local images, we'll use the same image but with a size hint
  // This helps with caching and responsive loading
  return `/${cleanPath}?size=${imageSizes[size]}`;
}

/**
 * Get responsive image sizes for different viewport widths
 * @param sizes - Object containing size breakpoints and their corresponding image sizes
 * @returns CSS sizes string
 */
export function getResponsiveSizes(sizes: Record<string, ImageSize>): string {
  return Object.entries(sizes)
    .map(
      ([breakpoint, size]) => `(min-width: ${breakpoint}) ${imageSizes[size]}px`
    )
    .join(", ");
}

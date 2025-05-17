export const getImagePath = (
  path: string,
  size: "full" | "thumbnail" = "full"
): string => {
  // In a production environment, you might want to use a CDN or image optimization service
  // For now, we'll just return the path as is
  return path;
};

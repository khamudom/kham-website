export const generatePlaceholderImage = (
  text: string,
  width?: number,
  height?: number
): string => {
  const w = width || 400;
  const h = height || 300;
  return `https://placehold.co/${w}x${h}/e2e8f0/64748b?text=${encodeURIComponent(
    text
  )}`;
};

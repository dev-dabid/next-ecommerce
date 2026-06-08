export const generateCartKey = (
  id: string,
  color?: string | null,
  size?: string | null,
) => {
  return [id, color, size].filter(Boolean).join("-");
};

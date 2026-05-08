export const generateCartKey = (id: string, color?: string, size?: string) => {
  return [id, color, size].filter(Boolean).join("-");
};

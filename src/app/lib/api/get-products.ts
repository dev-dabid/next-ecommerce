export const getProducts = async () => {
  const response = await fetch("http://localhost:3000/backend/products.json");
  const data = await response.json();

  return data;
};

// ========================
// Fetch products (GET)
// ========================
export const fetchProducts = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/products`,
  );
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json();
};

// ========================
// Create new product (POST)
// ========================
export const createProduct = async (productData) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/products/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    },
  );

  if (!response.ok) {
    throw new Error("Failed to create product");
  }
  return response.json();
};

// ========================
// Delete a product (DELETE)
// ========================
export const deleteProduct = async (productId) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/products/${productId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to delete product");
  }
  return response.json();
};

// ========================
// Update a product (PUT)
// ========================
export const updateProduct = async (productId, productData) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/products/${productId}/`,
    {
      method: "PUT", // Use PUT or PATCH depending on your backend
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    },
  );

  if (!response.ok) {
    throw new Error("Failed to update product");
  }

  return response.json();
};

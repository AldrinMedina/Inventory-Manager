'use client';
import Image from "next/image";
import './productPage.css';
import CustomInput from ".//CustomInput";
import CustomModal from ".//CustomModal";

import React, { useState, useEffect, useRef } from 'react';
import {
	createProduct,
	deleteProduct,
	fetchProducts,
	updateProduct,
} from "@/lib/api/products";
export default function ProductForm() {
const [products, setProducts] = useState([]);
const [isLoading, setIsLoading] = useState(true);

const [isDeleteProductModalOpen, setIsDeleteProductModalOpen] = useState(false);
const [isUpdateProductModalOpen, setIsUpdateProductModalOpen] = useState(false);

  // Form and selection state
  const [formData, setFormData] = useState(initialFormState());
  const [selectedProduct, setSelectedProduct] = useState(null);

  function initialFormState() {
    return {
      product_name: "",
      description: "",
      price: "",
      category: "",
      img_url: "",
      is_available: true,
    };
  }

  // ========================
  // API: Fetch Products
  // ========================
  const loadProducts = async () => {
    try {
      const data = await fetchProducts();
      setProducts(data?.data || []);
    } catch (err) {
      console.error("Failed to load products:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // ========================
  // API: Create Product
  // ========================
  const addProduct = async () => {
    try {
      await createProduct(formData);
      await loadProducts();
      setFormData(initialFormState());
    } catch (err) {
      console.error("Failed to create product:", err);
    }
  };

  // ========================
  // API: Update Product
  // ========================
  const handleUpdateProduct = async () => {
    if (!selectedProduct) return;

    try {
      await updateProduct(selectedProduct.id, formData);
      await loadProducts();
      setIsUpdateProductModalOpen(false);
      setFormData(initialFormState());
      setSelectedProduct(null);
    } catch (err) {
      console.error("Failed to update product:", err);
    }
  };


  const handleDeleteProduct = async () => {
    if (!selectedProduct) return;

    try {
      await deleteProduct(selectedProduct.id);
      await loadProducts();
      setIsDeleteProductModalOpen(false);
      setSelectedProduct(null);
    } catch (err) {
      console.error("Failed to delete product:", err);
    }
  };

  // ========================
  // Modal Open/Close Handlers
  // ========================
  const openUpdateModal = (product) => {
    setSelectedProduct(product);
    setFormData(product);
    setIsUpdateProductModalOpen(true);
  };

  const openDeleteModal = (product) => {
    setSelectedProduct(product);
    setIsUpdateProductModalOpen(false); // Close the update modal first
    setIsDeleteProductModalOpen(true);
  };

  const closeAllModals = () => {
    setIsUpdateProductModalOpen(false);
    setIsDeleteProductModalOpen(false);
    setSelectedProduct(null);
    setFormData(initialFormState());
  };


  useEffect(() => {
    loadProducts();
  }, []);


  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }




  const fields = [
    {
      label: "Product Name",
      name: "product_name",
      type: "text",
      placeholder: "Enter product name",
    },
    {
      label: "Description",
      name: "description",
      type: "text",
      placeholder: "Enter description",
    },
    {
      label: "Price",
      name: "price",
      type: "number",
      placeholder: "Enter price",
    },
    {
      label: "Category",
      name: "category",
      type: "text",
      placeholder: "Enter category",
    },
    {
      label: "Image URL",
      name: "img_url",
      type: "text",
      placeholder: "Enter image URL",
    },
  ];

  // JSX for the add product form
  const addProductForm = (
    <div className="space-y-4">
      {fields.map(({ label, name, type, placeholder }) => (
        <CustomInput
          key={name}
          label={label}
          name={name}
          type={type}
          placeholder={placeholder}
          value={formData[name]}
          onChange={(e) =>
            setFormData({ ...formData, [name]: e.target.value })
          }
        />
      ))}
      <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
        <button
          type="button"
          className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
          onClick={addProduct}
        >
          Add Product
        </button>
      </div>
    </div>
  );

  const updateModalContent = (
    <div className="space-y-4">
      {fields.map(({ label, name, type, placeholder }) => (
        <CustomInput
          key={name}
          label={label}
          name={name}
          type={type}
          placeholder={placeholder}
          value={formData[name]}
          onChange={(e) =>
            setFormData({ ...formData, [name]: e.target.value })
          }
        />
      ))}
      <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
        <button
          type="button"
          className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
          onClick={handleUpdateProduct}
        >
          Update
        </button>
        <button
          type="button"
          className="mt-3 inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-red-500 sm:col-start-1 sm:mt-0"
          onClick={() => openDeleteModal(selectedProduct)}
        >
          Delete
        </button>
      </div>
    </div>
  );

  const deleteModalContent = (
    <div className="text-center">
      <p>Are you sure you want to delete this product?</p>
      <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
        <button
          type="button"
          className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 sm:col-start-2"
          onClick={handleDeleteProduct}
        >
          Confirm
        </button>
        <button
          type="button"
          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
          onClick={closeAllModals}
        >
          Cancel
        </button>
      </div>
    </div>
  );


return (
<div className="editor-container">
<div className="product-adder">
	<h1>Add Product</h1>
	{addProductForm}
</div>
<div className="product-list">
{products.map((product) => (
      <div className = "product-div" key={product.id}  onClick={() => openUpdateModal(product)}
>
        <p> {product.id} </p> 
        <p className="product-name">{product.product_name}</p>
       
      </div>
    ))}
</div>
 <CustomModal
        label="Update product"
        isOpen={isUpdateProductModalOpen}
        onClose={closeAllModals}
        content={updateModalContent}
      />
<CustomModal
        label="Delete Product"
        isOpen={isDeleteProductModalOpen}
        onClose={closeAllModals}
        content={deleteModalContent}
      />
</div>
  );
}

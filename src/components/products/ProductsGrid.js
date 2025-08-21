"use client";

import { useEffect, useState } from "react";
import {
  createProduct,
  deleteProduct,
  fetchProducts,
  updateProduct,
} from "@/lib/api/products";
import CustomHeader from "@/components/ui/CustomHeader";
import CustomModal from "@/components/ui/CustomModal";
import ProductForm from "@/components/products/ProductsForm";
import CustomButton from "@/components/ui/CustomButton";
import DeleteProduct from "@/components/products/ProductsDelete";

export default function ProductsGrid() {
  // ========================
  // Component State
  // ========================
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Modal states
  const [isProductModalFormOpen, setIsProductModalFormOpen] = useState(false);
  const [isDeleteProductModalOpen, setIsDeleteProductModalOpen] = useState(false);
  const [isUpdateProductModalOpen, setIsUpdateProductModalOpen] = useState(false);

  // Form and selection state
  const [formData, setFormData] = useState(initialFormState());
  const [selectedProduct, setSelectedProduct] = useState(null);

  // ========================
  // Helpers
  // ========================
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
  // Search Functionality
  // ========================
  const handleSearch = (term) => {
    setSearchTerm(term);
    
    if (!term.trim()) {
      setFilteredProducts(products);
      return;
    }

    const filtered = products.filter(product =>
      product.product_name?.toLowerCase().includes(term.toLowerCase()) ||
      product.description?.toLowerCase().includes(term.toLowerCase()) ||
      product.category?.toLowerCase().includes(term.toLowerCase())
    );
    
    setFilteredProducts(filtered);
  };

  // Update filtered products when products change
  useEffect(() => {
    if (searchTerm) {
      const filtered = products.filter(product =>
        product.product_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [products, searchTerm]);

  // ========================
  // API: Fetch Products
  // ========================
  const loadProducts = async () => {
    try {
      const data = await fetchProducts();
      const productData = data?.data || [];
      setProducts(productData);
      setFilteredProducts(productData);
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
      setIsProductModalFormOpen(false);
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

  // ========================
  // API: Delete Product
  // ========================
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
  const openAddModal = () => {
    setFormData(initialFormState());
    setIsProductModalFormOpen(true);
  };

  const openUpdateModal = (product) => {
    setSelectedProduct(product);
    setFormData(product);
    setIsUpdateProductModalOpen(true);
  };

  const openDeleteModal = (product) => {
    setSelectedProduct(product);
    setIsDeleteProductModalOpen(true);
  };

  const closeAllModals = () => {
    setIsProductModalFormOpen(false);
    setIsUpdateProductModalOpen(false);
    setIsDeleteProductModalOpen(false);
    setSelectedProduct(null);
    setFormData(initialFormState());
  };

  // ========================
  // Load products on mount
  // ========================
  useEffect(() => {
    loadProducts();
  }, []);

  // ========================
  // Loading UI
  // ========================
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

  // ========================
  // Main Render
  // ========================
  return (
    <div>
      {/* Header with Search */}
      <div className="mb-8">
        <CustomHeader
          title="Manage Products"
          onSearch={handleSearch}
          button={{
            isVisible: true,
            label: "Add new product",
            onClick: openAddModal,
          }}
        />
      </div>

      {/* Search Results Info */}
      {searchTerm && (
        <div className="mb-4 text-sm text-gray-600">
          {filteredProducts.length === 0 
            ? `No products found for "${searchTerm}"`
            : `Found ${filteredProducts.length} product${filteredProducts.length !== 1 ? 's' : ''} for "${searchTerm}"`
          }
        </div>
      )}

      {/* Product Grid - Updated with bigger items */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="group relative bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
            {/* Product Image */}
            <div className="aspect-square overflow-hidden">
              <img
                alt={product.product_name}
                src={product.img_url}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            
            {/* Product Info */}
            <div className="p-4">
              <div className="mb-3">
                <h3 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-1">
                  {product.product_name}
                </h3>
                <p className=" text-sm text-gray-600 mb-3 line-clamp-3 leading-relaxed truncate">
                  {product.description}
                </p>
              </div>
              
              {/* Category moved above price */}
              {product.category && (
                <div className="mb-2">
                  <span className="inline-block text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                    {product.category}
                  </span>
                </div>
              )}
              
              {/* Price */}
              <div className="mb-4">
                <span className="text-lg font-bold text-gray-900">
                  ${product.price}
                </span>
              </div>
              
              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => openUpdateModal(product)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-2 rounded-md transition-colors duration-200 font-medium"
                >
                  Edit
                </button>
                <button
                  onClick={() => openDeleteModal(product)}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-2 rounded-md transition-colors duration-200 font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && !searchTerm && (
        <div className="text-center py-12">
          <div className="text-gray-500">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-2M4 13h2m-2 0v5a2 2 0 002 2h2" />
            </svg>
            <h3 className="mt-4 text-sm font-medium text-gray-900">No products</h3>
            <p className="mt-2 text-sm text-gray-500">Get started by adding your first product.</p>
          </div>
        </div>
      )}

      {/* Add Product Modal */}
      <CustomModal
        label="Add new product"
        isOpen={isProductModalFormOpen}
        onClose={closeAllModals}
        content={
          <ProductForm
            formData={formData}
            setFormData={setFormData}
            onClick={addProduct}
            onClose={closeAllModals}
          />
        }
      />

      {/* Update Product Modal */}
      <CustomModal
        label="Update product"
        isOpen={isUpdateProductModalOpen}
        onClose={closeAllModals}
        content={
          <ProductForm
            formData={formData}
            setFormData={setFormData}
            onClick={handleUpdateProduct}
            onClose={closeAllModals}
          />
        }
      />

      {/* Delete Product Modal */}
      <CustomModal
        label="Confirm Delete"
        isOpen={isDeleteProductModalOpen}
        onClose={closeAllModals}
        content={
          <DeleteProduct
            productName={selectedProduct?.product_name}
            onConfirm={handleDeleteProduct}
            onCancel={closeAllModals}
          />
        }
      />
    </div>
  );
}
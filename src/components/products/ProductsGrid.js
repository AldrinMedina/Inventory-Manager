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

import { Pen, Trash} from "lucide-react";

export default function ProductsTable() {
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
  const [isBulkDeleteModalOpen, setIsBulkDeleteModalOpen] = useState(false);

  // Form and selection state
  const [formData, setFormData] = useState(initialFormState());
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  // Bulk selection state
  const [selectedProducts, setSelectedProducts] = useState(new Set());
  const [selectAll, setSelectAll] = useState(false);

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
  // Bulk Selection Handlers
  // ========================
  const handleSelectAll = (checked) => {
    setSelectAll(checked);
    if (checked) {
      setSelectedProducts(new Set(filteredProducts.map(p => p.id)));
    } else {
      setSelectedProducts(new Set());
    }
  };

  const handleSelectProduct = (productId, checked) => {
    const newSelected = new Set(selectedProducts);
    if (checked) {
      newSelected.add(productId);
    } else {
      newSelected.delete(productId);
    }
    setSelectedProducts(newSelected);
    
    // Update select all state
    setSelectAll(newSelected.size === filteredProducts.length && filteredProducts.length > 0);
  };

  const handleBulkDelete = async () => {
    try {
      // Delete all selected products
      await Promise.all(
        Array.from(selectedProducts).map(productId => deleteProduct(productId))
      );
      
      await loadProducts();
      setSelectedProducts(new Set());
      setSelectAll(false);
      setIsBulkDeleteModalOpen(false);
    } catch (err) {
      console.error("Failed to delete selected products:", err);
    }
  };

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
    setIsBulkDeleteModalOpen(false);
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

      {/* Bulk Actions Bar */}
      {selectedProducts.size > 0 && (
        <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm text-blue-800">
              {selectedProducts.size} product{selectedProducts.size !== 1 ? 's' : ''} selected
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setIsBulkDeleteModalOpen(true)}
                className="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1.5 rounded-md transition-colors duration-200"
              >
                <Trash className="w-5 h-5"></Trash> Delete Selected
              </button>
              <button
                onClick={() => {
                  setSelectedProducts(new Set());
                  setSelectAll(false);
                }}
                className="bg-gray-500 hover:bg-gray-600 text-white text-sm px-3 py-1.5 rounded-md transition-colors duration-200"
              >
                Clear Selection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search Results Info */}
      {searchTerm && (
        <div className="mb-4 text-sm text-gray-600">
          {filteredProducts.length === 0 
            ? `No products found for "${searchTerm}"`
            : `Found ${filteredProducts.length} product${filteredProducts.length !== 1 ? 's' : ''} for "${searchTerm}"`
          }
        </div>
      )}

      {/* Products Table */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            {/* Table Header */}
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-20">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">
                  Actions
                </th>
              </tr>
            </thead>
            
            {/* Table Body */}
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.map((product, index) => (
                <tr 
                  key={product.id} 
                  className={`hover:bg-gray-50 ${selectedProducts.has(product.id) ? 'bg-blue-50' : ''}`}
                >
                  {/* Checkbox */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedProducts.has(product.id)}
                      onChange={(e) => handleSelectProduct(product.id, e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                  
                  {/* Product Image */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-12 h-12 rounded-lg overflow-hidden">
                      <img
                        src={product.img_url}
                        alt={product.product_name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </td>
                  
                  {/* Product Name */}
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900 mb-1">
                      {product.product_name}
                    </div>
                    <div className="text-sm text-gray-500 max-w-xs truncate">
                      {product.description}
                    </div>
                  </td>
                  
                  {/* Category */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    {product.category && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {product.category}
                      </span>
                    )}
                  </td>
                  
                  {/* Price */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ${product.price}
                  </td>
                  
                  {/* Actions */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button
                        onClick={() => openUpdateModal(product)}
                        className="text-gray-600 hover:text-blue-900 transition-colors duration-200"
                        title="Edit product"
                      >
                        <Pen className="w-5 h-5"></Pen>
                      </button>
                      <button
                        onClick={() => openDeleteModal(product)}
                        className="text-gray-600 hover:text-red-900 transition-colors duration-200"
                        title="Delete product"
                      >
                        <Trash className="w-5 h-5"></Trash>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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

        {/* No Search Results */}
        {filteredProducts.length === 0 && searchTerm && (
          <div className="text-center py-12">
            <div className="text-gray-500">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <h3 className="mt-4 text-sm font-medium text-gray-900">No products found</h3>
              <p className="mt-2 text-sm text-gray-500">Try adjusting your search terms</p>
            </div>
          </div>
        )}
      </div>

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

      {/* Bulk Delete Modal */}
      <CustomModal
        label="Confirm Bulk Delete"
        isOpen={isBulkDeleteModalOpen}
        onClose={closeAllModals}
        content={
          <div className="p-6">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Delete Multiple Products</h3>
              <p className="text-sm text-gray-500 mb-6">
                Are you sure you want to delete {selectedProducts.size} selected product{selectedProducts.size !== 1 ? 's' : ''}? This action cannot be undone.
              </p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={closeAllModals}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  onClick={handleBulkDelete}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Delete Products
                </button>
              </div>
            </div>
          </div>
        }
      />
    </div>
  );
}
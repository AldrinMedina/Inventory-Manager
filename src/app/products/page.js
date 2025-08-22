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
import './productPage.css';


export default function ProductsGrid() {
  // ========================
  // Component State
  // ========================
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
 const [cartItems, setCartItems] = useState([]);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  // Modal states
  const [isProductModalFormOpen, setIsProductModalFormOpen] = useState(false);

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

  const closeAllModals = () => {
    setIsProductModalFormOpen(false);
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
const handleAddToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      // If item exists, update its quantity
      const updatedCart = cartItems.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItems(updatedCart);
    } else {
      // If not, add the new item with a quantity of 1
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const handleRemoveFromCart = (productId) => {
    setCartItems(cartItems.filter((item) => item.id !== productId));
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveFromCart(productId);
    } else {
      const updatedCart = cartItems.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      );
      setCartItems(updatedCart);
    }
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };


  return (
    <div>
    <div className="mb-8" >
       <CustomHeader
  title="Manage Products"
  onSearch={handleSearch}

  secondaryButton={{
    isVisible: true,
    label: `Cart (${cartItems.length})`,
    onClick: () => setIsCartModalOpen(true),
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
               <div className="mt-4">
    <button
      onClick={() => handleAddToCart(product)}
      className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200"
    >
      Add to Cart
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
<CustomModal
  isOpen={isCartModalOpen}
  onClose={() => setIsCartModalOpen(false)}
  title="Your Cart"
>
  {cartItems.length === 0 ? (
    <p className="text-gray-900">Your cart is empty.</p>
  ) : (
    <>
      <ul className="divide-y divide-gray-200">
        {cartItems.map((item) => (
          <li key={item.id} className="py-4 flex items-center justify-between">
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-gray-900">{item.product_name}</h4>
              <p className="text-gray-500 text-xs">${item.price}</p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full font-bold"
              >
                -
              </button>
              <span className="text-gray-900 min-w-[20px] text-center">{item.quantity}</span>
              <button
                onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full font-bold"
              >
                +
              </button>
              <button
                onClick={() => handleRemoveFromCart(item.id)}
                className="text-red-500 hover:text-red-700 ml-2 p-1"
                title="Remove item"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 112 0v6a1 1 0 11-2 0V8z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-6 pt-4 border-t border-gray-200 text-right">
        <h3 className="text-lg font-bold text-gray-900">
          Total: ${calculateTotalPrice().toFixed(2)}
        </h3>
      </div>
    </>
  )}
</CustomModal>
    </div>
  );
}

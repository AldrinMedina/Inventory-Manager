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
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
 const [cartItems, setCartItems] = useState([]);


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

useEffect(() => {
    // Check if window (browser environment) is defined to avoid SSR errors.
    if (typeof window !== "undefined") {
      const storedCartItems = localStorage.getItem("cartItems");
      if (storedCartItems) {
        setCartItems(JSON.parse(storedCartItems));
      }
    }
  }, []); // The empty dependency array ensures this runs only once on mount.

  // Effect to save cart items to localStorage whenever the state changes.
  useEffect(() => {
    if (cartItems.length > 0 || localStorage.getItem("cartItems")) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems]);
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
const addToCart = (product) => {
    setCartItems(prevItems => {
      const isItemInCart = prevItems.find(item => item.id === product.id);
      if (isItemInCart) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };


const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
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
    onClick: () => setIsCartOpen(true), //console.log(cartItems) 
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
                onClick={() => addToCart(product)}
  className="bg-green-500 text-black py-2 px-4 rounded-md hover:bg-green-600 transition-colors duration-200"              >
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
 {isCartOpen && (
        <div className="fixed top-20 right-4 w-80 bg-white p-4 rounded-lg shadow-lg z-50 border border-gray-200">
          <div className="cart-content">
            <div className="flex justify-between items-center mb-4">
<h2 className="text-2xl font-bold text-black">Your Shopping Cart</h2>
              <button onClick={() => setIsCartOpen(false)} className="text-gray-500 hover:text-gray-800">
                &times;
              </button>
            </div>
            {cartItems.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <div>
                {cartItems.map(item => (
                  <div key={item.id} className="flex items-center justify-between p-2 mb-2 border-b">
                    <div className="flex items-center">
                      <img src={item.img_url} alt={item.product_name} className="w-12 h-12 object-cover rounded-md mr-2" />
                      <div>
                        <h4 className="font-semibold text-black">{item.product_name}</h4>
                        <p className="text-sm text-gray-600">${item.price} x {item.quantity}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                ))}
               <div className="mt-4 pt-4 border-t-2 font-bold text-lg text-right text-black">
  Total: ${cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

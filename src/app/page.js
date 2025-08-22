"use client";

import React, { useState, useEffect } from "react";
import { ShoppingCart, Menu, X, Star, Truck, Shield, Clock, Users, ChevronRight, Check} from "lucide-react";
import {
  fetchProducts
} from "@/lib/api/products";
import Link from "next/link";

import FooterNav from "@/components/ui/FooterNav";

export default function GroceryLandingPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [email, setEmail] = useState("");

  const categories = [
    {
      name: "Fresh Produce",
      image: "🥬",
      description: "Farm-fresh fruits and vegetables",
      color: "bg-green-100 hover:bg-green-200"
    },
    {
      name: "Meat & Seafood",
      image: "🥩",
      description: "Premium quality meats and fresh seafood",
      color: "bg-red-100 hover:bg-red-200"
    },
    {
      name: "Dairy & Eggs",
      image: "🥛",
      description: "Fresh dairy products and farm eggs",
      color: "bg-blue-100 hover:bg-blue-200"
    },
    {
      name: "Pantry Staples",
      image: "🌾",
      description: "Essential cooking ingredients",
      color: "bg-amber-100 hover:bg-amber-200"
    },
    {
      name: "Snacks & Beverages",
      image: "🥤",
      description: "Refreshing drinks and tasty snacks",
      color: "bg-purple-100 hover:bg-purple-200"
    },
    {
      name: "Household Essentials",
      image: "🧽",
      description: "Cleaning supplies and home care",
      color: "bg-gray-100 hover:bg-gray-200"
    }
  ];

  const deals = [
    { title: "50% OFF Fresh Berries", subtitle: "Limited time offer", badge: "Weekend Special" },
    { title: "Buy 2 Get 1 Free", subtitle: "Select dairy products", badge: "Popular" },
    { title: "Free Delivery", subtitle: "Orders over $75", badge: "New" }
  ];

  const bestSellers = [
    { name: "Organic Bananas", price: "$2.99/lb", rating: 4.8, image: "🍌" },
    { name: "Fresh Salmon Fillet", price: "$12.99/lb", rating: 4.9, image: "🐟" },
    { name: "Greek Yogurt", price: "$4.49", rating: 4.7, image: "🥛" },
    { name: "Sourdough Bread", price: "$3.99", rating: 4.6, image: "🍞" }
  ];

  const handleNewsletterSubmit = () => {
    if (email && email.includes('@')) {
      alert(`Thanks for subscribing with ${email}!`);
      setEmail("");
    } else {
      alert('Please enter a valid email address.');
    }
  };

  const loadProducts = async () => {
    try {
      const data = await fetchProducts();
      const productData = data?.data || [];
      setProducts(productData);
    } catch (err) {
      console.error("Failed to load products:", err);
    } finally {

    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header / Navigation */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl font-bold">🛒</span>
              </div>
              <span className="text-2xl font-bold text-gray-900">FreshMart</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#categories" className="text-gray-700 hover:text-green-600 transition-colors">Categories</a>
              <a href="#deals" className="text-gray-700 hover:text-green-600 transition-colors">Deals</a>
              <a href="#products" className="text-gray-700 hover:text-green-600 transition-colors">Products</a>
              <a href="#about" className="text-gray-700 hover:text-green-600 transition-colors">About</a>
              <a href="/products" className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition-colors flex items-center space-x-2">
                <ShoppingCart className="w-4 h-4" />
                <span>Shop Now</span>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 space-y-4 border-t border-gray-200">
              <a href="#categories" className="block text-gray-700 hover:text-green-600">Categories</a>
              <a href="#deals" className="block text-gray-700 hover:text-green-600">Deals</a>
              <a href="#products" className="block text-gray-700 hover:text-green-600">Products</a>
              <a href="#about" className="block text-gray-700 hover:text-green-600">About</a>
              <button className="w-full bg-green-600 text-white py-2 rounded-full hover:bg-green-700">Shop Now</button>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Fresh Groceries
                  <span className="text-green-600 block">Delivered Fast</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Get the freshest produce, premium meats, and everyday essentials delivered to your doorstep in under 2 hours.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-green-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-700 transition-all hover:scale-105 flex items-center justify-center space-x-2">
                  <span>Start Shopping</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
                <button className="border-2 border-green-600 text-green-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-600 hover:text-white transition-all">
                  View Deals
                </button>
              </div>

              <div className="flex items-center space-x-8 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Truck className="w-5 h-5 text-green-600" />
                  <span>Free delivery over $75</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-green-600" />
                  <span>2-hour delivery</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="w-full h-96 lg:h-[500px] bg-gradient-to-br from-green-100 to-blue-100 rounded-3xl flex items-center justify-center text-8xl">
                🛍️
              </div>
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center text-3xl animate-bounce">
                ⭐
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section id="categories" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Shop by Category</h2>
            <p className="text-xl text-gray-600">Everything you need, organized just the way you like it</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <div
                key={index}
                className={`${category.color} p-8 rounded-2xl transition-all hover:scale-105 cursor-pointer group`}
              >
                <div className="text-6xl mb-4">{category.image}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{category.name}</h3>
                <p className="text-gray-700 mb-4">{category.description}</p>
                <div className="flex items-center text-green-600 font-semibold group-hover:translate-x-2 transition-transform">
                  <span>Shop now</span>
                  <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deals & Promotions */}
      <section id="deals" className="py-20 bg-gradient-to-r from-red-500 to-pink-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Amazing Deals</h2>
            <p className="text-xl opacity-90">Limited time offers you don't want to miss</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {deals.map((deal, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all">
                <div className="bg-yellow-400 text-black text-sm font-bold px-3 py-1 rounded-full inline-block mb-4">
                  {deal.badge}
                </div>
                <h3 className="text-2xl font-bold mb-2">{deal.title}</h3>
                <p className="text-lg opacity-90 mb-6">{deal.subtitle}</p>
                <button className="bg-white text-red-500 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                  Claim Offer
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section id="products" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Customer Favorites</h2>
            <p className="text-xl text-gray-600">Top-rated products loved by our community</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.slice(0, 5).map((product) => (
              <div key={product.id} className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all group">
                <div className="text-6xl mb-4 text-center"><img src={product.img_url}></img></div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{product.product_name}</h3>
                <div className="flex items-center mb-3">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  {/* <span className="text-sm text-gray-600 ml-2">({product.rating})</span> */}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-green-600">{product.price}</span>
                  <button className="bg-green-600 text-white p-2 rounded-full hover:bg-green-700 transition-colors group-hover:scale-110">
                    {/* <ShoppingCart className="w-5 h-5" /> */}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Delivery & Service Information */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose FreshMart?</h2>
            <p className="text-xl text-gray-600">Premium service that puts you first</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Truck className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Fast Delivery</h3>
              <p className="text-gray-600">Same-day delivery available. Get your groceries in as little as 2 hours with our express service.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Quality Guarantee</h3>
              <p className="text-gray-600">100% satisfaction guaranteed. Not happy with your order? We'll make it right or refund your money.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Personal Shoppers</h3>
              <p className="text-gray-600">Our trained team carefully selects each item, ensuring you get the freshest produce and best quality.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Trust Elements */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Trusted by Thousands</h2>
            <div className="flex justify-center items-center space-x-12 text-2xl font-bold text-gray-600">
              <div>50K+ <span className="block text-sm font-normal">Happy Customers</span></div>
              <div>99.5% <span className="block text-sm font-normal">Satisfaction Rate</span></div>
              <div>2Hr <span className="block text-sm font-normal">Avg Delivery</span></div>
              <div>5★ <span className="block text-sm font-normal">Average Rating</span></div>
            </div>
          </div>

          <div className="bg-green-50 rounded-3xl p-12 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">What Our Customers Say</h3>
            <blockquote className="text-xl text-gray-700 italic mb-6 max-w-3xl mx-auto">
              "FreshMart has completely changed how I shop for groceries. The quality is amazing, delivery is super fast, and the prices are unbeatable. I'm a customer for life!"
            </blockquote>
            <div className="flex items-center justify-center">
              <div className="text-4xl mr-4">👩‍🍳</div>
              <div>
                <div className="font-bold text-gray-900">Sarah Johnson</div>
                <div className="text-gray-600">Verified Customer</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter / Loyalty Program */}
      <section className="py-20 bg-gradient-to-br from-green-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Join FreshMart Rewards</h2>
          <p className="text-xl mb-8 opacity-90">Get exclusive deals, early access to sales, and earn points on every purchase</p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto mb-8">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 px-6 py-4 rounded-full text-gray-900 focus:outline-none focus:ring-4 focus:ring-white/50"
            />
            <button
              onClick={handleNewsletterSubmit}
              className="bg-white text-green-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              Join Now
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center space-x-2">
              <Check className="w-5 h-5" />
              <span>5% cashback on all orders</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="w-5 h-5" />
              <span>Free delivery for members</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="w-5 h-5" />
              <span>Exclusive member-only deals</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <FooterNav />
    </div>
  );
}
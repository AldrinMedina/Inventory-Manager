import { ShoppingCart, Menu, X, Star, Truck, Shield, Clock, Users, ChevronRight, Check, Phone, Mail, MapPin } from "lucide-react";
import Link from "next/link";
export default function FooterNav(){
    return(
    <footer className="bg-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Company Info */}
            <div className="space-y-6">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xl font-bold">🛒</span>
                </div>
                <span className="text-2xl font-bold">FreshMart</span>
              </Link>
              <p className="text-gray-400">Your trusted partner for fresh, quality groceries delivered fast to your doorstep.</p>
              {/* <div className="flex space-x-4">
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 cursor-pointer">📘</div>
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 cursor-pointer">🐦</div>
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 cursor-pointer">📷</div>
              </div> */}
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold mb-6">Quick Links</h3>
              <ul className="space-y-4 text-gray-400">
                <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                {/* <li><a href="#" className="hover:text-white transition-colors">Delivery Areas</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li> */}
              </ul>
            </div>

            {/* Customer Service */}
            <div>
              <h3 className="text-lg font-bold mb-6">Customer Service</h3>
              <ul className="space-y-4 text-gray-400">
                {/* <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Track Your Order</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Returns & Refunds</a></li> */}
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                {/* <li><a href="#" className="hover:text-white transition-colors">FAQs</a></li> */}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-bold mb-6">Manage</h3>
              <ul className="space-y-4 text-gray-400">
                <li><Link href="/dashboard/manage" >Manage Products</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© 2024 FreshMart. All rights reserved.</p>
            {/* <div className="flex space-x-6 text-sm text-gray-400 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            </div> */}
          </div>
        </div>
      </footer>)
      ;
}
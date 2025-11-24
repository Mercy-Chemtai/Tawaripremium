// Footer component
// file: frontend/src/components/layout/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import {
  Wrench,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  MapPin,
  Phone,
  Mail,
  Clock,
  Linkedin
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="backdrop-blur-sm bg-black/100 border-b border-white/6 transition text-gray-200">
      {/* Main Footer Content */}
      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg overflow-hidden bg-white/5">
                  <img
                    src="/favicon.svg"
                    alt="Tawari Logo"
                    className="object-contain w-8 h-8"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src =
                        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48'%3E%3Crect width='100%25' height='100%25' fill='%23000'/%3E%3C/svg%3E";
                    }}
                  />
                </div>
              <span className="text-2xl font-bold">Tawari Digital</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Your trusted partner for professional Apple device repairs, sales,
              and training. We deliver excellence with certified technicians and
              genuine parts.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com/company/justapple/posts/?feedView=all"
                className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://web.facebook.com/p/Tawari-Digital-Limited-61554972088026/?_rdc=1&_rdr#"
                className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://www.tiktok.com/@tawaridigitallimited"
                className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/tawaridigitallimited/"
                className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.youtube.com/@TawariDigital"
                className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  HOME
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  SERVICES
                </Link>
                </li>
              <li>
                <Link
                  to="/services"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  TRADE-IN
                </Link>
              </li>
              <li>
                <Link
                  to="/shop"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  SHOP
                </Link>
              </li>
              <li>
                <Link
                  to="/training"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  TRAINING
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  ABOUT US
                </Link>
              </li>
              <li>
                <Link
                  to="/cart"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  CART
                </Link>
              </li>
              <li>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <MapPin className="h-12 w-12 text-gray-400" />
                <span className="text-gray-300">
                  Tawari Digital Limited Westlands, Commercial Centre Ring Rd
                  Parklands Nairobi, Kenya
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-gray-400" />
                <span className="text-gray-300">+254-71200-7722</span> <br/>
                <span className="text-gray-300">+254-1200-7722</span>

              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gray-400" />
                <span className="text-gray-300">tawaridigital@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-gray-400" />
                <span className="text-gray-300">Mon - Sat: 9AM - 6PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2025 Tawari Digital. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
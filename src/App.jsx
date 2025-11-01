import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/auth/AuthContext";
import { CartProvider } from "./components/cart/CartContext";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import TrainingPage from "./pages/TrainingPage";
import ShopPage from "./pages/ShopPage";
import ProductDetail from "./pages/ProductDetailPage";
import BookServicePage from "./pages/BookServicePage";
import BookingDetailPage from "./pages/BookingDetailPage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import ResendEmailVerificationPage from "./pages/ResendEmailVerificationPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import AccountPage from "./pages/AccountPage";
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";
import OrdersPage from "./pages/OrdersPage";
import OrderDetailPage from "./pages/OrderDetailPage";
import { Toaster } from "./components/ui/Toaster";
import { ToastProvider } from "./components/ui/use-toast";
import "./index.css";
import ScrollToTop from "./components/ScrollToTop";
import ProductManager from "./components/admin/product-manager";
import ProductForm from "./components/admin/product-form";
import WhatsAppWidget from "./pages/WhatsAppWidget";

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <ToastProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-1 pt-16">
                <ScrollToTop />
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/admin/products" element={<ProductManager />} />
                  <Route path="/admin/products/new" element={<ProductForm />} />
                  <Route
                    path="/admin/products/:productId/edit"
                    element={<ProductForm />}
                  />
                  <Route path="/services" element={<ServicesPage />} />
                  <Route path="/training" element={<TrainingPage />} />
                 <Route path="/shop" element={<ShopPage />} />
                  <Route path="/product/:slug" element={<ProductDetail />} />
                  <Route path="/blog" element={<BlogPage />} />
                  <Route path="/blog/:slug" element={<BlogPostPage />} />
                  <Route path="/book-service" element={<BookServicePage />} />
                  <Route
                    path="/account/bookings/:bookingId"
                    element={<BookingDetailPage />}
                  />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/orders" element={<OrdersPage />} />
                  <Route path="/orders/:orderId" element={<OrderDetailPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/verify-email" element={<VerifyEmailPage />} />
                  <Route
                    path="/resend-email"
                    element={<ResendEmailVerificationPage />}
                  />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/checkout/:id" element={<CheckoutPage />} />
                  <Route path="/account/*" element={<AccountPage />} />
                </Routes>
              </main>

              <Footer />

              {/* WhatsApp widget rendered site-wide (appears after Footer in DOM) */}
              <WhatsAppWidget
                phone="=0712007722"
                message="Hello Tawari Digital, I hope you’re well. I’d like to learn more about your Apple products and repair services."
              />
            </div>

            {/* Toaster must be inside the ToastProvider */}
            <Toaster />
          </ToastProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;

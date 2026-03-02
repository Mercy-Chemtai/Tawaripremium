// src/pages/CheckoutPage.jsx
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ordersAPI } from "../services/api";
import { useCart } from "../components/cart/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../components/ui/use-toast";
import {
  CreditCard,
  Phone,
  MapPin,
  User,
  Mail,
  Loader,
  CheckCircle,
  ShoppingBag,
  ArrowLeft,
  AlertCircle,
} from "lucide-react";

// ─── M-Pesa API helpers ────────────────────────────────────────────────────
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

const mpesaAPI = {
  initiate: async ({ phone, amount, accountRef, description }) => {
    const res = await fetch(`${API_BASE}/api/mpesa/stk-push/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phone,
        amount,
        account_ref: accountRef,
        description,
      }),
    });
    const data = await res.json();
    if (!res.ok)
      throw new Error(data.message || "Failed to initiate M-Pesa payment");
    return data;
  },

  checkStatus: async (transactionId) => {
    const res = await fetch(`${API_BASE}/api/mpesa/status/${transactionId}/`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Status check failed");
    return data;
  },
};
// ──────────────────────────────────────────────────────────────────────────

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, clear, subtotal } = useCart();
  const { user } = useAuth();
  const { toast } = useToast();

  const [step, setStep] = useState(1); // 1: Details, 2: Payment, 3: Confirmation
  const [submitting, setSubmitting] = useState(false);
  const [orderId, setOrderId] = useState(null);

  // STK Push state
  const [mpesaStatus, setMpesaStatus] = useState(null); // null | 'waiting' | 'success' | 'failed' | 'cancelled'
  const [mpesaReceipt, setMpesaReceipt] = useState("");
  const [mpesaError, setMpesaError] = useState("");
  const [pollSecondsLeft, setPollSecondsLeft] = useState(60);
  const pollingRef = useRef(null);
  const transactionIdRef = useRef(null);

  // Shipping Details
  const [shippingDetails, setShippingDetails] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "Nairobi",
    county: "Nairobi",
    notes: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("mpesa");
  const [mpesaPhone, setMpesaPhone] = useState("");

  // Totals
  const total = Math.round(subtotal);

  // Cleanup polling on unmount
  useEffect(() => {
    return () => stopPolling();
  }, []);

  // Countdown timer while waiting for STK
  useEffect(() => {
    if (mpesaStatus !== "waiting") return;
    const timer = setInterval(() => {
      setPollSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(timer);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [mpesaStatus]);

  function stopPolling() {
    if (pollingRef.current) {
      clearInterval(pollingRef.current);
      pollingRef.current = null;
    }
  }

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingDetails((prev) => ({ ...prev, [name]: value }));
  };

  // ── Step 1 → Step 2 ────────────────────────────────────────────────────
  const handleProceedToPayment = (e) => {
    e.preventDefault();
    if (
      !shippingDetails.fullName ||
      !shippingDetails.email ||
      !shippingDetails.phone ||
      !shippingDetails.address
    ) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    setStep(2);
  };

  // ── Step 2: Place Order + STK Push ─────────────────────────────────────
  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (paymentMethod === "mpesa" && !mpesaPhone.trim()) {
      toast({
        title: "Missing Phone Number",
        description: "Please enter your M-Pesa phone number",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    setMpesaError("");

    try {
      // 1. Create order in your backend
      const orderData = {
        items: items.map((item) => ({
          product: item.product_id,
          quantity: item.quantity,
          price: item.price,
          color: item.selectedColor,
          storage: item.selectedStorage,
        })),
        total: Math.round(total),
        shipping_details: shippingDetails,
        payment_method: paymentMethod,
      };

      const order = await ordersAPI.createOrder(orderData);
      setOrderId(order.id);

      if (paymentMethod === "mpesa") {
        // 2. Send STK Push
        const mpesaResponse = await mpesaAPI.initiate({
          phone: mpesaPhone.trim(),
          amount: Math.round(total),
          accountRef: `ORDER-${order.id}`,
          description: `Payment for Order #${order.id}`,
        });

        transactionIdRef.current = mpesaResponse.transaction_id;
        setMpesaStatus("waiting");
        setPollSecondsLeft(60);

        toast({
          title: "📱 Check Your Phone",
          description: "Enter your M-Pesa PIN to confirm payment",
        });

        // 3. Start polling for status
        startPolling(mpesaResponse.transaction_id, order.id);
      } else {
        // Cash on delivery — go straight to confirmation
        setStep(3);
        clear();
        toast({
          title: "Order Placed!",
          description: `Order #${order.id} confirmed`,
        });
      }
    } catch (err) {
      console.error("Order/payment failed:", err);
      setMpesaError(err?.message || "Something went wrong. Please try again.");
      toast({
        title: "Payment Failed",
        description: err?.message || "Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  // ── Poll Django for payment confirmation ────────────────────────────────
  function startPolling(transactionId, orderIdValue) {
    let attempts = 0;
    const MAX = 20; // 20 × 3s = 60 seconds

    pollingRef.current = setInterval(async () => {
      attempts++;

      try {
        const data = await mpesaAPI.checkStatus(transactionId);

        if (data.status === "success") {
          stopPolling();
          setMpesaStatus("success");
          setMpesaReceipt(data.mpesa_receipt || "");
          clear(); // Clear cart
          setStep(3);
          toast({
            title: "✅ Payment Confirmed!",
            description: `M-Pesa receipt: ${data.mpesa_receipt}`,
          });
        } else if (data.status === "failed") {
          stopPolling();
          setMpesaStatus("failed");
          setMpesaError(
            data.result_desc || "Payment failed. Please try again."
          );
        } else if (data.status === "cancelled") {
          stopPolling();
          setMpesaStatus("cancelled");
          setMpesaError("You cancelled the payment. Please try again.");
        }
      } catch (err) {
        console.error("Polling error:", err);
      }

      if (attempts >= MAX) {
        stopPolling();
        setMpesaStatus("failed");
        setMpesaError(
          "Payment timed out. If you entered your PIN, please check your M-Pesa SMS and contact support."
        );
      }
    }, 3000);
  }

  // Allow retrying STK push without re-creating the order
  const handleRetryMpesa = async () => {
    if (!mpesaPhone.trim() || !orderId) return;
    setMpesaError("");
    setMpesaStatus(null);
    stopPolling();
    setSubmitting(true);

    try {
      const mpesaResponse = await mpesaAPI.initiate({
        phone: mpesaPhone.trim(),
        amount: Math.round(total),
        accountRef: `ORDER-${orderId}`,
        description: `Payment for Order #${orderId}`,
      });

      transactionIdRef.current = mpesaResponse.transaction_id;
      setMpesaStatus("waiting");
      setPollSecondsLeft(60);

      toast({
        title: "📱 Check Your Phone",
        description: "Enter your M-Pesa PIN to confirm payment",
      });

      startPolling(mpesaResponse.transaction_id, orderId);
    } catch (err) {
      setMpesaError(err?.message || "Failed to resend payment request.");
    } finally {
      setSubmitting(false);
    }
  };

  // ── Empty cart ─────────────────────────────────────────────────────────
  if (!items || items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center pt-20">
        <div className="text-center py-20 px-4">
          <ShoppingBag className="h-24 w-24 mx-auto text-gray-300 mb-6" />
          <h2 className="text-3xl font-bold mb-4">Your cart is empty</h2>
          <p className="text-gray-500 mb-8">
            Add some items to proceed with checkout.
          </p>
          <button
            onClick={() => navigate("/shop")}
            className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-20 pb-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => (step === 1 ? navigate("/cart") : setStep(step - 1))}
            className="flex items-center text-gray-600 hover:text-black mb-4 transition"
            disabled={mpesaStatus === "waiting"}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {step === 1 ? "Back to Cart" : "Previous Step"}
          </button>

          <h1 className="text-4xl font-bold mb-2">Checkout</h1>

          {/* Progress Steps */}
          <div className="flex items-center space-x-4 mt-6">
            {[
              { n: 1, label: "Shipping" },
              { n: 2, label: "Payment" },
              { n: 3, label: "Confirmation" },
            ].map(({ n, label }, i, arr) => (
              <div key={n} className="flex items-center">
                <div
                  className={`flex items-center ${
                    step >= n ? "text-black" : "text-gray-400"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                      step > n
                        ? "bg-green-600 text-white"
                        : step === n
                        ? "bg-black text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {step > n ? <CheckCircle className="h-5 w-5" /> : n}
                  </div>
                  <span className="ml-2 font-medium">{label}</span>
                </div>
                {i < arr.length - 1 && (
                  <div
                    className={`h-1 w-12 mx-4 rounded ${
                      step > n
                        ? "bg-green-600"
                        : step === n
                        ? "bg-black"
                        : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* ── Main Content ─────────────────────────────────────────────── */}
          <div className="lg:col-span-2">
            {/* STEP 1: Shipping */}
            {step === 1 && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-6">
                  Shipping Information
                </h2>
                <form onSubmit={handleProceedToPayment} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          name="fullName"
                          value={shippingDetails.fullName}
                          onChange={handleShippingChange}
                          className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                          placeholder="John Doe"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="email"
                          name="email"
                          value={shippingDetails.email}
                          onChange={handleShippingChange}
                          className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                          placeholder="john@example.com"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={shippingDetails.phone}
                        onChange={handleShippingChange}
                        className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                        placeholder="0712345678"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Delivery Address *
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <textarea
                        name="address"
                        value={shippingDetails.address}
                        onChange={handleShippingChange}
                        rows={3}
                        className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                        placeholder="Street address, building, apartment"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={shippingDetails.city}
                        onChange={handleShippingChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        County *
                      </label>
                      <select
                        name="county"
                        value={shippingDetails.county}
                        onChange={handleShippingChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                        required
                      >
                        <option value="Nairobi">Nairobi</option>
                        <option value="Mombasa">Mombasa</option>
                        <option value="Kisumu">Kisumu</option>
                        <option value="Nakuru">Nakuru</option>
                        <option value="Eldoret">Eldoret</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Order Notes (Optional)
                    </label>
                    <textarea
                      name="notes"
                      value={shippingDetails.notes}
                      onChange={handleShippingChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                      placeholder="Any special instructions for delivery"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-black text-white py-4 rounded-lg font-semibold hover:bg-gray-800 transition"
                  >
                    Continue to Payment
                  </button>
                </form>
              </div>
            )}

            {/* STEP 2: Payment */}
            {step === 2 && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-6">Payment Method</h2>

                {/* ── STK Waiting State ─────────────────────────────────── */}
                {mpesaStatus === "waiting" && (
                  <div className="mb-6 p-6 bg-green-50 border border-green-200 rounded-xl text-center">
                    <div className="flex justify-center mb-4">
                      <div className="relative">
                        <div className="w-16 h-16 rounded-full border-4 border-green-200 border-t-green-600 animate-spin" />
                        <Phone className="absolute inset-0 m-auto h-6 w-6 text-green-600" />
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-green-800 mb-1">
                      Check Your Phone!
                    </h3>
                    <p className="text-green-700 text-sm mb-3">
                      An M-Pesa prompt has been sent to{" "}
                      <strong>{mpesaPhone}</strong>.<br />
                      Enter your <strong>M-Pesa PIN</strong> to confirm.
                    </p>
                    <div className="flex items-center justify-center gap-2 text-green-600 text-sm">
                      <Loader className="h-4 w-4 animate-spin" />
                      Waiting for confirmation… ({pollSecondsLeft}s)
                    </div>
                    <button
                      onClick={() => {
                        stopPolling();
                        setMpesaStatus(null);
                        setMpesaError("");
                      }}
                      className="mt-4 text-sm text-gray-500 underline hover:text-gray-700"
                    >
                      Cancel and try a different number
                    </button>
                  </div>
                )}

                {/* ── STK Failed / Cancelled ────────────────────────────── */}
                {(mpesaStatus === "failed" || mpesaStatus === "cancelled") && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex gap-3">
                    <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-red-700 text-sm font-medium">
                        {mpesaStatus === "cancelled"
                          ? "Payment Cancelled"
                          : "Payment Failed"}
                      </p>
                      <p className="text-red-600 text-sm mt-1">{mpesaError}</p>
                      <button
                        onClick={handleRetryMpesa}
                        disabled={submitting}
                        className="mt-3 bg-red-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-red-700 transition disabled:opacity-50"
                      >
                        {submitting ? "Sending…" : "Retry Payment"}
                      </button>
                    </div>
                  </div>
                )}

                {/* ── Payment Form (hidden while waiting) ──────────────── */}
                {mpesaStatus !== "waiting" && (
                  <form onSubmit={handlePlaceOrder} className="space-y-6">
                    {/* Payment method selector */}
                    <div className="space-y-4">
                      <label
                        className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition ${
                          paymentMethod === "mpesa"
                            ? "border-black bg-gray-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="mpesa"
                          checked={paymentMethod === "mpesa"}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="h-4 w-4 text-black"
                        />
                        <img
                          src="/Images/mpesalogo.png"
                          alt="M-Pesa"
                          className="h-6 ml-3 object-contain"
                        />
                        <div className="ml-3">
                          <div className="font-semibold">M-Pesa</div>
                          <div className="text-sm text-gray-500">
                            Pay via STK Push — no app needed
                          </div>
                        </div>
                      </label>

                      <label
                        className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition ${
                          paymentMethod === "cod"
                            ? "border-black bg-gray-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="cod"
                          checked={paymentMethod === "cod"}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="h-4 w-4 text-black"
                        />
                        <CreditCard className="h-6 w-6 ml-3 text-gray-600" />
                        <div className="ml-3">
                          <div className="font-semibold">Cash on Delivery</div>
                          <div className="text-sm text-gray-500">
                            Pay when you receive your order
                          </div>
                        </div>
                      </label>
                    </div>

                    {/* M-Pesa phone input */}
                    {paymentMethod === "mpesa" && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          M-Pesa Phone Number *
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-500 flex items-center gap-1">
                            🇰🇪
                          </span>
                          <input
                            type="tel"
                            value={mpesaPhone}
                            onChange={(e) => setMpesaPhone(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                            placeholder="0712 345 678"
                            required={paymentMethod === "mpesa"}
                          />
                        </div>
                        <p className="text-xs text-gray-400 mt-2">
                          Format: 07XX or 01XX — you'll get an STK Push prompt
                          on this number
                        </p>

                        {/* How it works */}
                        <div className="mt-4 p-4 bg-gray-50 rounded-lg text-sm text-gray-600 space-y-1">
                          <p className="font-medium text-gray-700 mb-2">
                            How it works:
                          </p>
                          <div className="flex items-start gap-2">
                            <span className="bg-black text-white rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                              1
                            </span>
                            <span>Click "Place Order" below</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="bg-black text-white rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                              2
                            </span>
                            <span>You'll get a pop-up on your phone</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="bg-black text-white rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                              3
                            </span>
                            <span>Enter your M-Pesa PIN to confirm</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="bg-green-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                              ✓
                            </span>
                            <span>Your order is confirmed automatically</span>
                          </div>
                        </div>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-black text-white py-4 rounded-lg font-semibold hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {submitting ? (
                        <>
                          <Loader className="animate-spin h-5 w-5" />
                          Sending Payment Request…
                        </>
                      ) : (
                        `Place Order · KSh ${Math.round(
                          total
                        ).toLocaleString()}`
                      )}
                    </button>

                    <p className="text-xs text-center text-gray-400 flex items-center justify-center gap-1">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      Secured by Safaricom M-Pesa
                    </p>
                  </form>
                )}
              </div>
            )}

            {/* STEP 3: Confirmation */}
            {step === 3 && (
              <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                <div className="mb-6">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-12 w-12 text-green-600" />
                  </div>
                  <h2 className="text-3xl font-bold mb-2">Order Confirmed!</h2>
                  <p className="text-gray-600">
                    Thank you for your purchase. Your order has been received.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 mb-6 text-left space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Order Number</span>
                    <span className="font-bold">#{orderId}</span>
                  </div>
                  {mpesaReceipt && (
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">
                        M-Pesa Receipt
                      </span>
                      <span className="font-bold text-green-700">
                        {mpesaReceipt}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Amount Paid</span>
                    <span className="font-bold">
                      KSh {Math.round(total).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Phone</span>
                    <span className="font-medium">
                      {mpesaPhone || shippingDetails.phone}
                    </span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-6">
                  A confirmation has been sent to{" "}
                  <strong>{shippingDetails.email}</strong>. You'll also receive
                  an M-Pesa SMS.
                </p>

                <div className="flex gap-4">
                  <button
                    onClick={() => navigate(`/orders/${orderId}`)}
                    className="flex-1 bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
                  >
                    View Order
                  </button>
                  <button
                    onClick={() => navigate("/shop")}
                    className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* ── Order Summary Sidebar ──────────────────────────────────── */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                {items.map((item, idx) => (
                  <div key={`${item.product_id}-${idx}`} className="flex gap-4">
                    <div className="h-20 w-20 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm truncate">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                      {item.selectedColor && (
                        <p className="text-xs text-gray-500">
                          {item.selectedColor}
                        </p>
                      )}
                      KSh {(item.price * item.quantity).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-2 pt-4 border-t text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>KSh {Math.round(subtotal).toLocaleString()}</span>
                </div>
                <p className="text-xs text-gray-400">
                  Tax (16% VAT) included in price
                </p>
                <div className="flex justify-between text-lg font-bold pt-3 border-t">
                  <span>Total</span>
                  <span>KSh {Math.round(total).toLocaleString()}</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t space-y-2">
                <div className="flex items-center text-sm text-gray-500">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-600 flex-shrink-0" />
                  Secured by Safaricom M-Pesa
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-600 flex-shrink-0" />
                  Instant payment confirmation
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// src/pages/CheckoutPage.jsx
"use client"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { cartAPI, ordersAPI, authAPI } from "../services/api"

export default function CheckoutPage() {
  const navigate = useNavigate()
  const [cart, setCart] = useState({ items: [] })
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const profile = await authAPI.getProfile()
        setUser(profile)
      } catch {
        navigate("/login?redirect=/checkout")
      }
    }
    checkAuth()
  }, [navigate])

  useEffect(() => {
    const loadCart = async () => {
      setLoading(true)
      try {
        const data = await cartAPI.getCart()
        setCart(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    loadCart()
  }, [])

  const handlePlaceOrder = async () => {
    if (!cart.items.length) return
    setSubmitting(true)
    try {
      const order = await ordersAPI.createOrder({
        items: cart.items.map(i => ({ product: i.id, quantity: i.quantity, price: i.price })),
      })
      await cartAPI.clearCart()
      navigate(`/orders/${order.id}`)
    } catch (err) {
      alert(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <div>Loading checkout...</div>
  if (!cart.items.length) return <div>Your cart is empty</div>

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <div className="space-y-2">
        {cart.items.map(i => (
          <div key={i.id}>{i.name} x {i.quantity} - KSh{i.price}</div>
        ))}
      </div>
      <button
        onClick={handlePlaceOrder}
        disabled={submitting}
        className="mt-4 w-full bg-blue-600 text-white p-2 rounded"
      >
        {submitting ? "Processing..." : "Place Order"}
      </button>
    </div>
  )
}

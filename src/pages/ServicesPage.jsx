"use client"

import { useState, useEffect, useRef } from "react"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import {
  ArrowRight,
  CheckCircle,
  Clock,
  Smartphone,
  Laptop,
  Watch,
  Tablet,
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
} from "lucide-react"
import { useCart } from "../components/cart/CartContext" // adjust path if needed

function normalizeImage(url) {
  if (!url) return PLACEHOLDER
  if (typeof url !== "string") return PLACEHOLDER
  if (url.startsWith("http://") || url.startsWith("https://")) return url
  return url.startsWith("/") ? url : `/${url}`
}

/* Mock data */
const MOCK_SERVICES = [
  { id: "s1", name: "Screen Replacement", description: "Fast screen replacement for all iPhone models." },
  { id: "s2", name: "Battery Replacement", description: "Genuine battery replacements with warranty." },
  { id: "s3", name: "Logic Board Repair", description: "Expert logic board repair for MacBooks." },
]

const MOCK_CATEGORIES = [
  { id: "c1", name: "Phones" },
  { id: "c2", name: "Laptops" },
  { id: "c3", name: "Tablets" },
  { id: "c4", name: "Wearables" },
]

/* ---------------------------
   PersistentAutoStepper component
   --------------------------- */
function PersistentAutoStepper({
  autoAdvanceInterval = 4000, // ms
  autoAdvanceEnabled = true,
  persistToUrl = true,
  persistToLocalStorage = true,
}) {
  const steps = [
    {
      id: "book",
      title: "Book",
      desc: "Fast online or phone booking. Choose same-day or scheduled slots.",
      icon: <Clock className="w-5 h-5" />,
      gradient: "from-black to-gray-700",
      extras: [
        "Choose pickup or drop-off",
        "Pick a timeslot that suits you",
        "Get an instant booking confirmation",
      ],
    },
    {
      id: "diagnose",
      title: "Diagnose",
      desc: "Full assessment and transparent quote before any work begins.",
      icon: <CheckCircle className="w-5 h-5" />,
      gradient: "from-indigo-600 to-purple-600",
      extras: ["Device inspected by a certified technician", "Transparent written quote", "Optional data backup"],
    },
    {
      id: "repair",
      title: "Repair",
      desc: "Expert technicians repair your device using genuine parts.",
      icon: <Smartphone className="w-5 h-5" />,
      gradient: "from-emerald-500 to-teal-600",
      extras: ["Genuine parts and quality checks", "Estimated turnaround time", "Real-time updates via SMS/email"],
    },
    {
      id: "return",
      title: "Return",
      desc: "Pick up or delivery of your tested device — includes warranty.",
      icon: <ArrowRight className="w-5 h-5" />,
      gradient: "from-orange-500 to-rose-500",
      extras: ["Pickup or delivery options", "90-day warranty", "Post-repair support"],
    },
  ]

  const [searchParams, setSearchParams] = useSearchParams()
  const paramStep = searchParams.get("step")

  const readInitial = () => {
    const idxFromUrl = paramStep ? parseInt(paramStep, 10) - 1 : NaN
    if (!Number.isNaN(idxFromUrl) && idxFromUrl >= 0 && idxFromUrl < steps.length) return idxFromUrl

    if (persistToLocalStorage) {
      try {
        const stored = window.localStorage.getItem("repair_step")
        if (stored) {
          const n = parseInt(stored, 10)
          if (!Number.isNaN(n) && n >= 0 && n < steps.length) return n
        }
      } catch (e) {
        // ignore storage errors
      }
    }
    return 0
  }

  const [current, setCurrent] = useState(readInitial)
  const [isPaused, setIsPaused] = useState(false)
  const manualInteractionRef = useRef(false)
  const autoTimeoutRef = useRef(null)
  const autoIntervalRef = useRef(null)

  // sync to URL/localStorage whenever current changes
  useEffect(() => {
    if (persistToUrl) {
      const sp = new URLSearchParams(searchParams)
      sp.set("step", String(current + 1))
      setSearchParams(sp, { replace: true })
    }
    if (persistToLocalStorage) {
      try {
        window.localStorage.setItem("repair_step", String(current))
      } catch (e) {
        // ignore
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current])

  // auto-advance logic
  useEffect(() => {
    if (!autoAdvanceEnabled) return
    if (isPaused || manualInteractionRef.current) return

    // clear any existing
    if (autoIntervalRef.current) {
      clearInterval(autoIntervalRef.current)
      autoIntervalRef.current = null
    }

    autoIntervalRef.current = setInterval(() => {
      setCurrent((c) => {
        if (c >= steps.length - 1) {
          clearInterval(autoIntervalRef.current)
          autoIntervalRef.current = null
          return c
        }
        return c + 1
      })
    }, autoAdvanceInterval)

    return () => {
      if (autoIntervalRef.current) {
        clearInterval(autoIntervalRef.current)
        autoIntervalRef.current = null
      }
    }
  }, [autoAdvanceEnabled, isPaused, autoAdvanceInterval])

  const handleUserInteract = (pauseDuration = 8000) => {
    manualInteractionRef.current = true
    setIsPaused(true)
    if (autoIntervalRef.current) {
      clearInterval(autoIntervalRef.current)
      autoIntervalRef.current = null
    }
    if (autoTimeoutRef.current) clearTimeout(autoTimeoutRef.current)
    autoTimeoutRef.current = setTimeout(() => {
      manualInteractionRef.current = false
      setIsPaused(false)
    }, pauseDuration)
  }

  const goNext = () => {
    setCurrent((s) => Math.min(s + 1, steps.length - 1))
    handleUserInteract()
  }
  const goPrev = () => {
    setCurrent((s) => Math.max(s - 1, 0))
    handleUserInteract()
  }
  const jumpTo = (i) => {
    setCurrent(i)
    handleUserInteract()
  }

  useEffect(() => {
    return () => {
      if (autoIntervalRef.current) clearInterval(autoIntervalRef.current)
      if (autoTimeoutRef.current) clearTimeout(autoTimeoutRef.current)
    }
  }, [])

  return (
    <div className="space-y-12 " onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
      <div className="relative">
        <div className="hidden md:block absolute left-12 right-12 top-7 h-1 bg-gray-200 rounded-full" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {steps.map((step, idx) => {
            const active = idx === current
            const completed = idx < current

            return (
              <button
                key={step.id}
                onClick={() => jumpTo(idx)}
                aria-current={active ? "step" : undefined}
                onFocus={() => setIsPaused(true)}
                onBlur={() => setIsPaused(false)}
                className="relative flex items-start md:flex-col gap-4 md:items-center text-left md:text-center p-3 md:p-6 rounded-2xl bg-white shadow-xl hover:shadow-2xl transition transform hover:-translate-y-1"
              >
                <div className="flex md:block items-center gap-4">
                  <div
                    className={`relative flex items-center justify-center w-12 h-12 rounded-full shadow-md ${
                      completed ? "bg-gradient-to-br from-green-500 to-emerald-500 text-white" : active ? `bg-gradient-to-br ${step.gradient} text-white` : "bg-white border border-gray-200 text-gray-800"
                    }`}
                    aria-hidden
                  >
                    {completed ? (
                      <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <span className={`font-semibold ${active ? "text-white" : "text-gray-800"}`}>{idx + 1}</span>
                    )}
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between md:flex-col gap-2">
                    <div className={`font-semibold ${active ? "text-black" : "text-gray-800"}`}>{step.title}</div>
                    <div className="hidden md:block mt-2">
                      <div className="text-xs text-gray-500">{completed ? "Completed" : active ? "In progress" : "Pending"}</div>
                    </div>
                  </div>

                  <p className="mt-2 text-sm text-gray-600 md:mt-3">{step.desc}</p>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      <div className="hidden md:flex items-center gap-4 justify-center" aria-hidden>
        {steps.map((_, i) => {
          const filled = i <= current
          return (
            <div key={i} className="flex-1 h-2 rounded-full bg-gray-200 overflow-hidden mx-1">
              <div className={`h-full ${filled ? "bg-gradient-to-r from-black to-gray-700" : "bg-transparent"}`} style={{ width: filled ? "100%" : "0%" }} />
            </div>
          )
        })}
      </div>

      <div className="flex items-center justify-center gap-3">
        <button
          onClick={goPrev}
          disabled={current === 0}
          className={`px-4 py-2 rounded-full border ${current === 0 ? "text-gray-400 border-gray-200 bg-gray-50 cursor-not-allowed" : "bg-white border-gray-300 hover:shadow-md"}`}
        >
          Previous
        </button>

        <button
          onClick={goNext}
          disabled={current === steps.length - 1}
          className={`px-4 py-2 rounded-full text-white ${current === steps.length - 1 ? "bg-gray-400 cursor-not-allowed" : "bg-black hover:opacity-95 shadow-md"}`}
        >
          Next
        </button>

        <Link to="/contact" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-black to-stone-800 text-white shadow-md">
          Book Now <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="mt-6 max-w-[900px] mx-auto p-4 bg-white rounded-2xl shadow-lg">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-black to-gray-700 text-white shadow-md">
            <span className="font-semibold">{current + 1}</span>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-black">{steps[current].title}</h3>
            <p className="text-gray-600 mt-2">{steps[current].desc}</p>

            <ul className="mt-3 text-sm text-gray-600 space-y-2 list-disc list-inside">
              {steps[current].extras.map((ex, i) => (
                <li key={i}>{ex}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ---------------------------
   ServicesPage (main) component
   --------------------------- */
export default function ServicesPage() {
  const navigate = useNavigate()
  const { addItem } = useCart() || { addItem: null }

  const [services] = useState(MOCK_SERVICES)
  const [categories] = useState(MOCK_CATEGORIES)
  const [products, setProducts] = useState([])
  const [pricing] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isAdding, setIsAdding] = useState(null)

  const carouselRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const pickProductImage = (p) => {
    if (p.primary_image && typeof p.primary_image === "string" && p.primary_image.trim()) {
      return normalizeImage(p.primary_image)
    }
    if (Array.isArray(p.images) && p.images.length) {
      const first = p.images[0]
      if (!first) return PLACEHOLDER
      if (typeof first === "string") return normalizeImage(first)
      if (typeof first === "object" && (first.image || first.url)) return normalizeImage(first.image || first.url)
    }
    const demoKey = p.slug?.toLowerCase?.().replace(/\s+/g, "-")
    const demo = demoKey ? appleDemoImageMap[demoKey] : null
    return demo || PLACEHOLDER
  }

  useEffect(() => {
    const el = carouselRef.current
    if (!el) return
    const update = () => {
      setCanScrollLeft(el.scrollLeft > 0)
      setCanScrollRight(el.scrollWidth > el.clientWidth + el.scrollLeft + 1)
    }
    update()
    el.addEventListener("scroll", update)
    window.addEventListener("resize", update)
    return () => {
      el.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
    }
  }, [products])

  const scrollCarousel = (dir = "right") => {
    const el = carouselRef.current
    if (!el) return
    const amount = el.clientWidth * 0.8
    const target = dir === "right" ? el.scrollLeft + amount : el.scrollLeft - amount
    el.scrollTo({ left: target, behavior: "smooth" })
  }

  const handleAddToCart = async (p) => {
    if (!addItem) {
      navigate(`/shop/${encodeURIComponent(p.slug)}`)
      return
    }
    try {
      setIsAdding(p.id)
      const item = {
        product_id: p.id,
        quantity: 1,
        name: p.name,
        price: p.sale_price || p.price,
        image: pickProductImage(p),
        slug: p.slug,
      }
      const res = addItem(item)
      if (res && typeof res.then === "function") await res
      console.log("Added to cart:", item)
    } catch (err) {
      console.error("Add failed", err)
    } finally {
      setIsAdding(null)
    }
  }

  const fallbackPricing = [
    {
  title: "Service Repairs",
  startingPrice: 2500,
  features: [
    "Full device diagnostics",
    "Logic board & motherboard repairs",
    "Charging port replacement",
    "Speaker & microphone repairs",
    "Biometric repair (Face ID / Touch ID)",
    "Software troubleshooting & OS restore",
    "Data recovery & backup support",
    "Water & liquid damage treatment"
  ],
},
    {
      title: "iPhone Repairs",
      startingPrice: 4000,
      features: ["Screen replacement", "Battery replacement", "Camera repairs", "Water damage recovery"],
    },
     {
      title: "iPad Repairs",
      startingPrice: 5000,
      features: ["Screen replacement", "Battery replacement", "Charging port repair", "Button replacement"],
    },
    {
      title: "MacBook Repairs",
      startingPrice: 8000,
      features: ["Screen replacement", "Logic board repair", "Battery replacement", "Performance upgrades"],
      featured: true,
    }
  ]
  const displayPricing = pricing.length ? pricing : fallbackPricing

  return (
    <div className="flex flex-col min-h-screen min-w-screen ">
      {/* HERO */}
      <section
        className="w-full py-12 md:py-24 lg:py-32 bg-black text-white bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundImage:
            "url('/Images/services-hero.png')",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative w-full max-w-[1400px] mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Our Services
              </h1>
              <p className="max-w-[700px] text-gray-300 md:text-xl/relaxed">
                Expert repair and maintenance for all Apple devices
              </p>
            </div>
            <Link
              to="/book-service"
              className="inline-flex items-center justify-center px-4 py-2 bg-white text-black font-medium rounded-md hover:bg-gray-200 transition-colors"
            >
              Book a Service <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* SERVICES SUMMARY */}
      <section className="w-full py-12 md:py-16 bg-white">
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-black">Comprehensive Repair Services</h2>
              <p className="mt-3 text-gray-600">
                At Tawari Digital, we offer a complete range of repair and maintenance services for all Apple devices.
                Our certified technicians use genuine parts and advanced tools to ensure your devices are restored to
                perfect working condition.
              </p>

              <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <li className="flex items-start gap-3">
                  <div className="mt-1">
                    <CheckCircle className="h-5 w-5 text-black" />
                  </div>
                  <div>
                    <div className="font-medium text-black">Free diagnostic assessment</div>
                    <div className="text-sm text-gray-600">We evaluate your device before any work starts.</div>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="mt-1">
                    <CheckCircle className="h-5 w-5 text-black" />
                  </div>
                  <div>
                    <div className="font-medium text-black">Genuine parts</div>
                    <div className="text-sm text-gray-600">Only quality replacement components.</div>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="mt-1">
                    <CheckCircle className="h-5 w-5 text-black" />
                  </div>
                  <div>
                    <div className="font-medium text-black">Warranty</div>
                    <div className="text-sm text-gray-600">All repairs include a warranty for peace of mind.</div>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="mt-1">
                    <CheckCircle className="h-5 w-5 text-black" />
                  </div>
                  <div>
                    <div className="font-medium text-black">Data backup & recovery</div>
                    <div className="text-sm text-gray-600">We help protect your data during repairs.</div>
                  </div>
                </li>
              </ul>
            </div>

            <div className="w-full max-w-[420px] mx-auto lg:mx-0">
              <img
                src="/Images/services-summary.png"
                width={420}
                height={420}
                alt="Apple device repair"
                className="rounded-2xl object-cover shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* DEVICES WE SERVICE - redesigned as big icon tiles */}
      <section className="w-screen py-12 md:py-20 bg-gray-50">
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-black">Devices We Repair</h2>
            <p className="text-gray-600 mt-2">Expert repair for your entire Apple ecosystem</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Icon tile: iphone */}
            <div className="flex flex-col items-center gap-4 p-6 rounded-2xl bg-white shadow-xl transform hover:-translate-y-1 transition">
              <div className="rounded-full w-20 h-20 flex items-center justify-center bg-gradient-to-br from-black to-gray-700 text-white shadow-2xl">
                <Smartphone className="h-7 w-7" />
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-lg">iPhone</h3>
                <p className="text-sm text-gray-500 mt-1">Screen replacements, battery upgrades, camera repairs and more.</p>
              </div>
            </div>

            {/* macbook */}
            <div className="flex flex-col items-center gap-4 p-6 rounded-2xl bg-white shadow-xl transform hover:-translate-y-1 transition">
              <div className="rounded-full w-20 h-20 flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-2xl">
                <Laptop className="h-7 w-7" />
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-lg">MacBook</h3>
                <p className="text-sm text-gray-500 mt-1">Logic board repairs, screen replacements, keyboard fixes.</p>
              </div>
            </div>

            {/* ipad */}
            <div className="flex flex-col items-center gap-4 p-6 rounded-2xl bg-white shadow-xl transform hover:-translate-y-1 transition">
              <div className="rounded-full w-20 h-20 flex items-center justify-center bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-2xl">
                <Tablet className="h-7 w-7" />
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-lg">iPad</h3>
                <p className="text-sm text-gray-500 mt-1">Screen repairs, battery replacements and charging port fixes.</p>
              </div>
            </div>

            {/* watch */}
            <div className="flex flex-col items-center gap-4 p-6 rounded-2xl bg-white shadow-xl transform hover:-translate-y-1 transition">
              <div className="rounded-full w-20 h-20 flex items-center justify-center bg-gradient-to-br from-orange-500 to-rose-500 text-white shadow-2xl">
                <Watch className="h-7 w-7" />
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-lg">Apple Watch</h3>
                <p className="text-sm text-gray-500 mt-1">Screen replacements, battery upgrades and water damage repair.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* REPAIR PROCESS — stepper / time-wizard with auto-advance + persistence */}
      <section className="w-screen py-12 md:py-16 bg-gray-100">
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-black">Our Repair Process</h2>
            <p className="text-gray-600 mt-2">Simple, transparent, and efficient — follow the steps from booking to return.</p>
          </div>

          <PersistentAutoStepper autoAdvanceInterval={4000} autoAdvanceEnabled={true} persistToUrl={true} persistToLocalStorage={true} />
        </div>
      </section>

      {/* PRICING */}
      <section className="w-screen py-12 md:py-20 bg-gray-200">
        <div className="w-screen max-w-[1400px] mx-auto px-4 md:px-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-black">Transparent Pricing</h2>
            <p className="text-gray-600 mt-2">Competitive rates with no hidden fees</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {displayPricing.map((plan, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-2xl ${plan.featured ? "bg-black text-white" : "bg-white"} shadow-2xl flex flex-col`}
              >
                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold">{plan.title}</h3>
                  <p className={`${plan.featured ? "text-gray-300" : "text-gray-500"} mt-2 text-sm`}>Starting from</p>
                  <p className="text-3xl font-bold mt-2">KSh{plan.startingPrice}</p>
                </div>

                <ul className="mt-4 space-y-3 mb-6">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle className={`h-5 w-5 ${plan.featured ? "text-white" : "text-black"}`} />
                      <span className={`${plan.featured ? "text-gray-100" : "text-gray-700"}`}>{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto text-center">
                  <Link
                    to="/contact"
                    className={`inline-flex items-center justify-center px-5 py-2 rounded-full font-medium ${
                      plan.featured ? "bg-white text-black hover:bg-gray-100" : "bg-black text-white hover:bg-black/90"
                    } shadow`}
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-screen py-12 md:py-20 bg-black text-white">
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center gap-4 text-center">
            <h2 className="text-3xl font-bold">Need a Repair?</h2>
            <p className="text-gray-300 max-w-[700px]">Book your service appointment today and get your device fixed fast</p>

            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              <Link to="/contact" className="inline-flex items-center gap-2 px-4 py-2 bg-white text-black rounded-md font-medium">
                Book a Service <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-2 px-4 py-2 border border-white text-white rounded-md font-medium">
                Contact Us <Clock className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

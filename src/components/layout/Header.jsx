import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Menu, X, ShoppingCart, Search } from "lucide-react";
import { useCart } from "../cart/CartContext";

export default function Header() {
  const { getTotalItems } = useCart();
  const [open, setOpen] = useState(false);

  // NEW: search state + ref
  const [searchOpen, setSearchOpen] = useState(false);
  const searchInputRef = useRef(null);

  const location = useLocation();

  const firstMobileLinkRef = useRef(null);
  const menuButtonRef = useRef(null);

  // Close mobile menu when route changes
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open OR search is open
  useEffect(() => {
    const shouldFreeze = open || searchOpen;
    const prev = document.body.style.overflow;
    if (shouldFreeze) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
    return;
  }, [open, searchOpen]);

  // Handle Escape key to close menu OR search
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        if (searchOpen) {
          setSearchOpen(false);
          return;
        }
        if (open) {
          setOpen(false);
          menuButtonRef.current?.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, searchOpen]);

  // Focus the first mobile link when menu opens
  useEffect(() => {
    if (open) {
      const id = setTimeout(() => {
        firstMobileLinkRef.current?.focus();
      }, 120);
      return () => clearTimeout(id);
    }
  }, [open]);

  // Focus search input when search opens
  useEffect(() => {
    if (searchOpen) {
      const id = setTimeout(() => {
        searchInputRef.current?.focus();
      }, 80);
      return () => clearTimeout(id);
    }
  }, [searchOpen]);

  const navLinkClass = ({ isActive }) =>
    `text-white/85 hover:text-white transition text-sm font-medium ${isActive ? "text-white underline" : ""}`;

  return (
    <header className="w-full fixed top-0 left-0 z-50">
      <div className="backdrop-blur-sm bg-black/90 border-b border-4 transition">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18">
            {/* Left: logo */}
            <div className="flex items-center gap-4">
              <NavLink to="/" end className="flex items-center gap-3 no-underline" aria-label="Tawari home">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg overflow-hidden bg-white/100">
                  <img
                    src="/src/assets/Tawari_Logo.svg"
                    alt="Tawari Logo"
                    className="object-contain w-8 h-8"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src =
                        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48'%3E%3Crect width='100%25' height='100%25' fill='%23000'/%3E%3C/svg%3E";
                    }}
                  />
                </div>
                <div className="hidden sm:block">
                  <div className="text-white text-lg font-semibold leading-tight">Tawari</div>
                  <div className="text-xs text-white/60 -mt-1">Limited Digital</div>
                </div>
              </NavLink>
            </div>

            {/* Center: desktop nav */}
            <nav role="navigation" aria-label="Main navigation" className="hidden md:flex items-center gap-6 relative z-20">
              <NavLink to="/" end className={navLinkClass}>HOME</NavLink>
              <NavLink to="/services" className={navLinkClass}>SERVICES</NavLink>
              <NavLink to="/about" className={navLinkClass}>ABOUT</NavLink>
              <NavLink to="/shop" className={navLinkClass}>SHOP</NavLink>
              <NavLink to="/training" className={navLinkClass}>TRAINING</NavLink>
              <NavLink to="/contact" className={navLinkClass}>CONTACT</NavLink>
              <NavLink to="/blog" className={navLinkClass}>BLOG</NavLink>
            </nav>

            {/* Right: actions */}
            <div className="flex items-center gap-3 relative z-20">
              {/* Search button now toggles searchOpen */}
              <button
                type="button"
                aria-label="Search"
                className="hidden md:inline-flex items-center justify-center p-2 rounded-md hover:bg-white/6 transition"
                onClick={() => setSearchOpen(true)}
              >
                <Search className="h-4 w-4 text-white/80" />
              </button>

              <NavLink
                to="/cart"
                className="relative inline-flex items-center gap-2 px-3 py-2 border rounded-md border-white/8 hover:bg-white/6 transition"
                aria-label="View cart"
              >
                <ShoppingCart className="h-4 w-4 text-white" />
                <span className="sr-only">Cart</span>
                <span className="text-sm text-white/90">Cart</span>

                {/* badge */}
                <span
                  className="absolute -top-2 -right-2 inline-flex items-center justify-center px-2 py-0.5 rounded-full text-xs font-semibold"
                  style={{ backgroundColor: "#fff", color: "#000" }}
                  aria-live="polite"
                >
                  {getTotalItems()}
                </span>
              </NavLink>

              {/* mobile menu button */}
              <button
                ref={menuButtonRef}
                onClick={() => setOpen((v) => !v)}
                className="md:hidden inline-flex items-center justify-center p-2 rounded-md hover:bg-white/6 transition"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                aria-controls="mobile-menu"
              >
                {open ? <X className="h-5 w-5 text-white" /> : <Menu className="h-5 w-5 text-white" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu panel */}
        <div
          id="mobile-menu"
          className={`md:hidden transition-[max-height,opacity] duration-300 ease-in-out overflow-hidden ${
            open ? "max-h-72 opacity-100" : "max-h-0 opacity-0 pointer-events-none"
          }`}
          aria-hidden={!open}
        >
          <div className="px-4 pt-3 pb-4 border-t border-white/6 bg-black/40">
            <div className="flex flex-col gap-3">
              <NavLink to="/shop" onClick={() => setOpen(false)} ref={firstMobileLinkRef} className="block text-white/90 py-2 px-2 rounded hover:bg-white/6 transition text-base font-medium">
                Shop
              </NavLink>

              <NavLink to="/training" onClick={() => setOpen(false)} className="block text-white/90 py-2 px-2 rounded hover:bg-white/6 transition text-base font-medium">
                Training
              </NavLink>

              <NavLink to="/contact" onClick={() => setOpen(false)} className="block text-white/90 py-2 px-2 rounded hover:bg-white/6 transition text-base font-medium">
                Contact
              </NavLink>

              <NavLink to="/services" onClick={() => setOpen(false)} className="block text-white/90 py-2 px-2 rounded hover:bg-white/6 transition text-base font-medium">
                Services
              </NavLink>

              <NavLink to="/cart" onClick={() => setOpen(false)} className="mt-2 inline-flex items-center gap-2 px-3 py-2 border rounded-md border-white/8 hover:bg-white/6 transition text-white">
                <ShoppingCart className="h-4 w-4" /> View cart ({getTotalItems()})
              </NavLink>
            </div>
          </div>
        </div>

        {/* Search overlay */}
        {searchOpen && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Search"
            className="fixed inset-0 z-40 flex items-start justify-center pt-20 px-4"
            onClick={() => setSearchOpen(false)} // click outside closes
          >
            <div
              className="w-full max-w-2xl bg-black/90 border border-white/8 rounded-md p-4 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-2">
                <input
                  ref={searchInputRef}
                  type="search"
                  placeholder="Search..."
                  aria-label="Search site"
                  className="flex-1 bg-transparent outline-none text-white text-base px-2 py-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      // implement search submit logic here (navigate, call API, etc.)
                      console.log("Search for:", e.currentTarget.value);
                      setSearchOpen(false);
                    }
                  }}
                />
                <button
                  type="button"
                  aria-label="Close search"
                  className="p-2 rounded hover:bg-white/6 transition"
                  onClick={() => setSearchOpen(false)}
                >
                  <X className="h-5 w-5 text-white" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

import { Link } from "react-router-dom"
import { Facebook, Instagram, Youtube } from "lucide-react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXTwitter } from "@fortawesome/free-brands-svg-icons"

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12 md:py-16">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Tawari Digital</h3>
            <p className="text-gray-400">
              Your trusted partner for Apple device sales, repairs, and professional training.
            </p>
            <div className="flex space-x-4">
              <Link
                to="https://www.facebook.com/profile.php?id=61554972088026"
                className="text-gray-400 hover:text-white"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link to="#" className="text-gray-400 hover:text-white">
                <FontAwesomeIcon icon={faXTwitter} className="h-5 w-5" />
                <span className="sr-only">X (formerly Twitter)</span>
              </Link>
              <Link
                to="https://www.instagram.com/tawaridigitallimited/"
                className="text-gray-400 hover:text-white"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link to="#" className="text-gray-400 hover:text-white">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-white">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/training" className="text-gray-400 hover:text-white">
                  Training
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-gray-400 hover:text-white">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services" className="text-gray-400 hover:text-white">
                  iPhone Repair
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-white">
                  MacBook Repair
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-white">
                  iPad Repair
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-white">
                  Apple Watch Repair
                </Link>
              </li>
              <li>
                <Link to="/training" className="text-gray-400 hover:text-white">
                  Repair Training
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-gray-400 hover:text-white">
                  Trade-In
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <address className="not-italic text-gray-400 space-y-2">
              <p>Westlands Commercial Centre</p>
              <p>Old Block</p>
              <p>1st Floor</p>
              <p className="pt-2">Phone: +254 710130021</p>
              <p>Email: tawaridigital@gmail.com</p>
            </address>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-gray-400 text-sm mb-2 md:mb-0">
            &copy; {new Date().getFullYear()} Tawari Digital Limited. All rights reserved.
          </p>

          {/* Centered Links */}
          <div className="flex space-x-6">
            <Link to="/PrivacyAndPolicyTermsAndServices" className="text-gray-400 hover:text-white text-sm">
              Privacy Policy
            </Link>
            <Link to="/PrivacyAndPolicyTermsAndServices" className="text-gray-400 hover:text-white text-sm">
              Terms of Service
            </Link>
          </div>

          {/* Your Credit */}
          <div className="text-gray-400 text-sm mt-2 md:mt-0">
            Website by{" "}
            <a
              href="mailto:chemtailodite@gmail.com"
              className="hover:text-white underline"
            >
              Chemtai
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

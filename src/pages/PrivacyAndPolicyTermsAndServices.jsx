// src/pages/PrivacyTermsPage.jsx
import { useState, useEffect, useRef } from "react";
import { Shield, FileText, ChevronDown, Lock, Eye, Database, RefreshCw, CheckCircle } from "lucide-react";

const sections = {
  privacy: [
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Our Commitment to Privacy",
      content:
        "Privacy is a fundamental human right. At our core, it's one of our most important values. Your devices and data are central to so many parts of your life — what you share from those experiences, and who you share it with, should always be up to you. We design our products to protect your privacy and give you full control over your information. It's not always easy. But that's the kind of innovation we believe in.",
    },
    {
      icon: <Eye className="w-5 h-5" />,
      title: "What We Collect",
      content:
        "We collect only the minimum data necessary to provide you with the best experience. This includes your name, email address, purchase history, and device information. We do not sell your personal data to third parties, and we never will. Any data collected is used solely to improve your experience and to fulfill your orders.",
    },
    {
      icon: <Database className="w-5 h-5" />,
      title: "How We Use Your Data",
      content:
        "Your data is used to process orders, personalize your shopping experience, send order confirmations and updates, and improve our platform. We may use anonymized, aggregated data to understand usage patterns and improve our services. You can opt out of marketing communications at any time from your account settings.",
    },
    {
      icon: <Lock className="w-5 h-5" />,
      title: "Data Security",
      content:
        "We use industry-standard encryption (TLS/SSL) to protect your data in transit, and AES-256 encryption for data at rest. Our systems undergo regular security audits and penetration testing. In the unlikely event of a data breach, we are committed to notifying affected users within 72 hours.",
    },
    {
      icon: <RefreshCw className="w-5 h-5" />,
      title: "Your Rights",
      content:
        "You have the right to access, correct, or delete any personal data we hold about you. You may also request a copy of your data in a portable format, or restrict how we process it. To exercise any of these rights, contact our Privacy Team at privacy@yourdomain.com. We will respond within 30 days.",
    },
  ],
  terms: [
    {
      icon: <CheckCircle className="w-5 h-5" />,
      title: "Device Eligibility Requirements",
      content: null,
      list: [
        "Your device must power on, hold a charge, and not power off unexpectedly.",
        "Your device must have a functioning display with no black spots or dead pixelation of any kind.",
        "Your device must have no breaks, cracks, or other defects that go beyond normal wear and tear — including multiple scratches, dents or dings, evidence of water damage, or a corroded charging port.",
        "Your device must not be on a blacklist of any kind.",
        "You must be the legal owner of the device.",
        "You must perform a factory reset and remove all personal information before trade-in.",
      ],
    },
    {
      icon: <FileText className="w-5 h-5" />,
      title: "Trade-In Valuation",
      content:
        "Trade-in values will vary based on the condition, year, and configuration of your device. The final trade-in value is determined after physical inspection and may differ from the initial online estimate. Presentation of a valid government-issued ID is required for all trade-in transactions.",
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Purchases & Payments",
      content:
        "All prices are listed in Kenyan Shillings (KSh) and are inclusive of 16% VAT. We accept major credit/debit cards and mobile payment methods. Payment is due at the time of purchase. We reserve the right to cancel any order if payment cannot be verified or if a product is found to be out of stock.",
    },
    {
      icon: <RefreshCw className="w-5 h-5" />,
      title: "Returns & Refunds",
      content:
        "Items may be returned within 7 days of delivery in their original, unused condition with all original packaging. To initiate a return, contact our support team. Refunds will be processed within 5–10 business days after we receive and inspect the returned item. Shipping costs for returns are the responsibility of the customer unless the item is defective.",
    },
    {
      icon: <Lock className="w-5 h-5" />,
      title: "Limitation of Liability",
      content:
        "To the fullest extent permitted by law, we shall not be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with your use of our platform or products. Our total liability in any matter shall not exceed the amount paid by you for the specific product or service in question.",
    },
  ],
};

function AccordionItem({ item, index, isOpen, onToggle }) {
  const contentRef = useRef(null);

  return (
    <div
      className={`border-b border-white/10 transition-all duration-300 ${
        isOpen ? "bg-white/5" : "hover:bg-white/3"
      }`}
    >
      <button
        onClick={() => onToggle(index)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left group"
      >
        <div className="flex items-center gap-4">
          <span
            className={`p-2 rounded-xl transition-all duration-300 ${
              isOpen
                ? "bg-white text-gray-900"
                : "bg-white/10 text-white/60 group-hover:bg-white/20 group-hover:text-white"
            }`}
          >
            {item.icon}
          </span>
          <span
            className={`font-semibold text-base transition-colors duration-200 ${
              isOpen ? "text-white" : "text-white/80 group-hover:text-white"
            }`}
          >
            {item.title}
          </span>
        </div>
        <ChevronDown
          className={`w-5 h-5 flex-shrink-0 text-white/50 transition-transform duration-300 ${
            isOpen ? "rotate-180 text-white" : ""
          }`}
        />
      </button>

      <div
        ref={contentRef}
        style={{
          maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : "0px",
          overflow: "hidden",
          transition: "max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div className="px-6 pb-6 pl-20">
          {item.content && (
            <p className="text-white/65 leading-relaxed text-sm">{item.content}</p>
          )}
          {item.list && (
            <ul className="space-y-3">
              {item.list.map((point, i) => (
                <li key={i} className="flex items-start gap-3 text-white/65 text-sm">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white/40 flex-shrink-0" />
                  {point}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default function PrivacyTermsPage() {
  const [activeTab, setActiveTab] = useState("privacy");
  const [openItems, setOpenItems] = useState({ privacy: [0], terms: [0] });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const toggleItem = (tab, index) => {
    setOpenItems((prev) => ({
      ...prev,
      [tab]: prev[tab].includes(index)
        ? prev[tab].filter((i) => i !== index)
        : [...prev[tab], index],
    }));
  };

  return (
    <div
      className="min-h-screen pt-12"
      style={{
        background: "linear-gradient(135deg, #0a0a0f 0%, #111118 40%, #0d0d14 100%)",
        fontFamily: "'Georgia', 'Times New Roman', serif",
      }}
    >
      {/* Ambient background orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          style={{
            position: "absolute",
            top: "-20%",
            right: "-10%",
            width: "600px",
            height: "600px",
            background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            left: "-15%",
            width: "500px",
            height: "500px",
            background: "radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        />
      </div>

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        {/* Hero Header */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-10 h-10 rounded-2xl flex items-center justify-center"
              style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(10px)" }}
            >
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span
              className="text-xs font-semibold tracking-[0.2em] uppercase"
              style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Helvetica Neue', sans-serif" }}
            >
              Legal
            </span>
          </div>

          <h1
            className="text-5xl sm:text-6xl font-bold text-white mb-6 leading-tight"
            style={{ letterSpacing: "-0.02em" }}
          >
            Your trust
            <br />
            <span style={{ color: "rgba(255,255,255,0.4)" }}>matters to us.</span>
          </h1>

          <p
            className="text-lg leading-relaxed max-w-xl"
            style={{
              color: "rgba(255,255,255,0.55)",
              fontFamily: "'Helvetica Neue', sans-serif",
              fontWeight: 300,
            }}
          >
            We believe privacy is a fundamental right, and transparency is the foundation
            of trust. Read how we protect you.
          </p>
        </div>

        {/* Tab Switcher */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.7s cubic-bezier(0.4, 0, 0.2, 1) 0.15s",
          }}
          className="mb-8"
        >
          <div
            className="inline-flex rounded-2xl p-1 gap-1"
            style={{ background: "rgba(255,255,255,0.07)", backdropFilter: "blur(20px)" }}
          >
            {[
              { key: "privacy", label: "Privacy Policy", icon: <Shield className="w-4 h-4" /> },
              { key: "terms", label: "Terms & Conditions", icon: <FileText className="w-4 h-4" /> },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-300"
                style={{
                  fontFamily: "'Helvetica Neue', sans-serif",
                  background: activeTab === tab.key ? "rgba(255,255,255,0.95)" : "transparent",
                  color: activeTab === tab.key ? "#0a0a0f" : "rgba(255,255,255,0.5)",
                  boxShadow: activeTab === tab.key ? "0 2px 20px rgba(0,0,0,0.3)" : "none",
                }}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Last updated pill */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 0.7s 0.25s",
            marginBottom: "24px",
          }}
        >
          <span
            className="text-xs px-3 py-1.5 rounded-full"
            style={{
              background: "rgba(255,255,255,0.06)",
              color: "rgba(255,255,255,0.35)",
              fontFamily: "'Helvetica Neue', sans-serif",
              letterSpacing: "0.05em",
            }}
          >
            Last updated: February 2026
          </span>
        </div>

        {/* Accordion Card */}
        <div
          key={activeTab}
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0.3s",
            background: "rgba(255,255,255,0.04)",
            backdropFilter: "blur(40px)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "24px",
            overflow: "hidden",
          }}
        >
          {/* Card header */}
          <div
            className="px-6 py-5 flex items-center gap-3 border-b"
            style={{ borderColor: "rgba(255,255,255,0.08)" }}
          >
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(255,255,255,0.1)" }}
            >
              {activeTab === "privacy" ? (
                <Shield className="w-4 h-4 text-white" />
              ) : (
                <FileText className="w-4 h-4 text-white" />
              )}
            </div>
            <div>
              <h2
                className="text-sm font-semibold text-white"
                style={{ fontFamily: "'Helvetica Neue', sans-serif" }}
              >
                {activeTab === "privacy" ? "Privacy Policy" : "Terms & Conditions"}
              </h2>
              <p
                className="text-xs"
                style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'Helvetica Neue', sans-serif" }}
              >
                {sections[activeTab].length} sections — tap any to expand
              </p>
            </div>
          </div>

          {/* Accordion items */}
          {sections[activeTab].map((item, index) => (
            <AccordionItem
              key={`${activeTab}-${index}`}
              item={item}
              index={index}
              isOpen={openItems[activeTab].includes(index)}
              onToggle={(i) => toggleItem(activeTab, i)}
            />
          ))}
        </div>

        {/* Footer note */}
        <div
          className="mt-12 text-center"
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 0.7s 0.5s",
          }}
        >
          <p
            className="text-sm"
            style={{
              color: "rgba(255,255,255,0.3)",
              fontFamily: "'Helvetica Neue', sans-serif",
            }}
          >
            Questions? Contact us at{" "}
            <a
              href="mailto:support@yourdomain.com"
              className="underline underline-offset-2 hover:text-white transition-colors"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              support@yourdomain.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
// src/components/WhatsAppWidget.jsx
import React from "react";

/**
 * WhatsAppWidget
 *
 * Props:
 *  - phone: string (any common local/international format). Example: "+254712345678", "0712345678", "254712345678"
 *  - countryCode: string (without +). Default "254" (Kenya). Used when phone starts with 0 or looks local.
 *  - message: string (the prefilled text)
 */
export default function WhatsAppWidget({
  phone = "=0712007722",
  countryCode = "254",
  message = "Hello Tawari Digital, I hope you’re well. I’d like to learn more about your Apple products and repair services.",
}) {
  // remove non-digits
  let digits = String(phone).replace(/[^\d]/g, "");

  // if it originally had a leading '+', we removed it above so digits is international
  // If it starts with one or more leading 0s, remove them and prepend country code
  if (/^0+/.test(digits)) {
    // remove all leading zeros
    digits = digits.replace(/^0+/, "");
    // prepend countryCode (if not already present)
    if (!digits.startsWith(countryCode)) {
      digits = countryCode + digits;
    }
  }

  // if it already starts with countryCode (like 254...) keep it
  // if it doesn't start with countryCode and looks short (e.g. 7-9 digits), assume local and prepend countryCode
  if (!digits.startsWith(countryCode) && digits.length <= 9) {
    digits = countryCode + digits;
  }

  // final minimal validation: wa.me expects digits only and normally between ~8 and 15 digits
  const isValid = /^\d{8,15}$/.test(digits);

  if (!isValid) {
    // Helpful developer warning — not shown to users
    // eslint-disable-next-line no-console
    console.error(
      `[WhatsAppWidget] Invalid phone after normalization: "${digits}". ` +
        `Please pass a valid international number or adjust \`countryCode\`. ` +
        `Examples: "254712345678", "+254712345678", "0712345678".`
    );
  }

  const url = `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed right-6 bottom-10 z-[999] group">
      {/* Tooltip (desktop only) */}
      <span className="absolute right-20 top-1/2 -translate-y-1/2 bg-green-600 text-white text-sm font-medium px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap hidden md:block">
        Chat with us
      </span>

      {/* WhatsApp Icon Button */}
      <a
        href={isValid ? url : "https://www.whatsapp.com"}
        target="_blank"
        rel="noreferrer noopener"
        aria-label="Chat with us on WhatsApp"
        title={isValid ? "Chat with us on WhatsApp" : "Invalid phone configured for WhatsApp"}
        className="block hover:scale-110 transition-transform duration-300"
      >
        <img
          src="https://applecenter.co.ke/wp-content/uploads/2023/05/Whatsapp-58x58.png"
          srcSet="
            https://applecenter.co.ke/wp-content/uploads/2023/05/Whatsapp-116x116.png 2x,
            https://applecenter.co.ke/wp-content/uploads/2023/05/Whatsapp-174x174.png 3x
          "
          alt="Chat on WhatsApp"
          loading="lazy"
          className="w-20 h-20 object-contain"
        />
      </a>
    </div>
  );
}

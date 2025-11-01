// Footer component
// file: frontend/src/components/layout/Footer.jsx
import React from "react";


const Footer = () => {
return (
<footer className="w-full bg-slate-50 border-t mt-8">
<div className="max-w-6xl mx-auto px-4 py-6 text-sm text-gray-600 flex justify-between">
<div>© {new Date().getFullYear()} Tawari Digital Limited. All rights reserved.</div>
<div className="flex gap-4">
<a href="/privacy" className="hover:underline">Privacy</a>
<a href="/terms" className="hover:underline">Terms</a>
</div>
</div>
</footer>
);
};


export default Footer;
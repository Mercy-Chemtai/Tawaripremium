// file: frontend/src/components/ui/Toaster.jsx
import React from "react";
import { useToast } from "./use-toast";

/**
 * Minimal compatibility Toaster component.
 *
 * Some projects import a `Toaster` component that renders the toast container.
 * Our `use-toast.jsx` implementation already renders a portal-based toast container
 * from inside the ToastProvider, so this component is a thin compatibility layer
 * that ensures the named import `Toaster` exists and won't break Vite.
 *
 * Usage: import { Toaster } from "./components/ui/Toaster";
 */

export const Toaster = () => {
  // We keep this component intentionally lightweight. If you want the Toaster
  // to control placement or styling independently, we can move the container
  // here and remove the portal from use-toast.jsx.
  // For now it renders nothing (the actual toasts are created by ToastProvider).
  return null;
};

export default Toaster;

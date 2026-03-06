import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";

/**
 * Simple toast/context implementation.
 *
 * Exports:
 *  - ToastProvider  -> wrap your app with this
 *  - useToast       -> hook: const { toast } = useToast();
 *
 * Usage:
 *  const { toast } = useToast();
 *  toast({ title: "Saved", description: "Order updated", type: "success", duration: 4000 });
 */

const ToastContext = createContext();

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a ToastProvider");
  return ctx;
};

let id = 0;

const defaultStyles = {
  container: {
    position: "fixed",
    right: 16,
    top: 16,
    zIndex: 9999,
    display: "flex",
    flexDirection: "column",
    gap: 8,
    maxWidth: "320px",
  },
  toast: {
    display: "flex",
    flexDirection: "column",
    padding: "10px 14px",
    borderRadius: 8,
    boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
    background: "#fff",
    border: "1px solid rgba(0,0,0,0.06)",
    fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
  },
  title: { fontWeight: 600, marginBottom: 6 },
  desc: { margin: 0, fontSize: 13, opacity: 0.9 },
  closeBtn: {
    marginLeft: "auto",
    border: "none",
    background: "transparent",
    cursor: "pointer",
    padding: 4,
  },
};

const typeColors = {
  success: { borderLeft: "6px solid #16a34a" },
  error: { borderLeft: "6px solid #dc2626" },
  info: { borderLeft: "6px solid #2563eb" },
  warning: { borderLeft: "6px solid #f59e0b" },
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const add = useCallback(({ title = "", description = "", type = "info", duration = 4000 } = {}) => {
    const toast = { id: ++id, title, description, type, duration, createdAt: Date.now() };
    setToasts((s) => [toast, ...s]);
    return toast.id;
  }, []);

  const remove = useCallback((removeId) => {
    setToasts((s) => s.filter((t) => t.id !== removeId));
  }, []);

  // auto-remove toasts after their duration
  useEffect(() => {
    if (toasts.length === 0) return;
    const timers = toasts.map((t) =>
      setTimeout(() => {
        setToasts((s) => s.filter((x) => x.id !== t.id));
      }, t.duration)
    );
    return () => timers.forEach((tm) => clearTimeout(tm));
  }, [toasts]);

  const value = {
    toast: add,
    removeToast: remove,
    toasts,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      {createPortal(<ToastContainer toasts={toasts} onRemove={remove} />, document.body)}
    </ToastContext.Provider>
  );
};

const ToastContainer = ({ toasts, onRemove }) => {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div style={defaultStyles.container} aria-live="polite" role="status">
      {toasts.map((t) => (
        <div
          key={t.id}
          style={{ ...defaultStyles.toast, ...(typeColors[t.type] || {}) }}
          role="alert"
          aria-atomic="true"
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ flex: 1 }}>
              {t.title ? <div style={defaultStyles.title}>{t.title}</div> : null}
              {t.description ? <p style={defaultStyles.desc}>{t.description}</p> : null}
            </div>
            <button
              aria-label="Close toast"
              onClick={() => onRemove(t.id)}
              style={defaultStyles.closeBtn}
            >
              ×
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

import React, { createContext, useContext, useState, useMemo, useCallback, useEffect } from "react";

/**
 * Simple accessible Tabs implementation using React + Tailwind-compatible classes.
 * Exports:
 *  - Tabs (container) -> <Tabs defaultValue="tab1"> ... </Tabs>
 *  - TabsList -> container for triggers
 *  - TabsTrigger -> clickable tab trigger (prop: value)
 *  - TabsContent -> content for a tab (prop: value)
 *
 * The components intentionally keep styling minimal (Tailwind classes) so you can
 * override with your project's design system.
 */

const TabsContext = createContext(null);

export const Tabs = ({ children, defaultValue = null, value: controlledValue, onValueChange, className = "" }) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = controlledValue !== undefined && controlledValue !== null;
  const activeValue = isControlled ? controlledValue : internalValue;

  useEffect(() => {
    if (!isControlled && defaultValue !== null) setInternalValue(defaultValue);
  }, [defaultValue, isControlled]);

  const setValue = useCallback(
    (v) => {
      if (isControlled) {
        onValueChange?.(v);
      } else {
        setInternalValue(v);
        onValueChange?.(v);
      }
    },
    [isControlled, onValueChange]
  );

  const ctx = useMemo(
    () => ({ value: activeValue, setValue }),
    [activeValue, setValue]
  );

  return (
    <TabsContext.Provider value={ctx}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
};

export const TabsList = ({ children, className = "flex gap-2 border-b pb-2" }) => {
  return (
    <div role="tablist" aria-orientation="horizontal" className={className}>
      {children}
    </div>
  );
};

export const TabsTrigger = ({ value, children, className = "px-3 py-1 rounded-md cursor-pointer focus:outline-none", disabled = false }) => {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error("TabsTrigger must be used within <Tabs>");
  const { value: active, setValue } = ctx;
  const selected = active === value;

  return (
    <button
      role="tab"
      aria-selected={selected}
      aria-controls={`tab-content-${value}`}
      id={`tab-trigger-${value}`}
      disabled={disabled}
      onClick={() => !disabled && setValue(value)}
      className={`${className} ${selected ? "bg-slate-100 dark:bg-slate-700 font-medium" : "hover:bg-slate-50 dark:hover:bg-slate-800"}`}
    >
      {children}
    </button>
  );
};

export const TabsContent = ({ value, children, className = "mt-4" }) => {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error("TabsContent must be used within <Tabs>");
  const { value: active } = ctx;
  const visible = active === value;

  return (
    <div
      id={`tab-content-${value}`}
      role="tabpanel"
      aria-labelledby={`tab-trigger-${value}`}
      hidden={!visible}
      className={className}
    >
      {visible ? children : null}
    </div>
  );
};

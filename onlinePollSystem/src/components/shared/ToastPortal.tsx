"use client";
import React, { useEffect, useState } from "react";

interface ToastItem {
  id: string;
  message: string;
  type: "info" | "success" | "error";
}

export const ToastPortal: React.FC = () => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  useEffect(() => {
    function handler(e: Event) {
      const custom = e as CustomEvent<{ message: string; type?: string }>;
      const message = custom.detail?.message || "";
      if (!message) return;
      const type = (custom.detail?.type as ToastItem["type"]) || "info";
      const id = crypto.randomUUID?.() || `${Date.now()}-${Math.random()}`;
      setToasts((prev) => [...prev, { id, message, type }]);
      // Auto remove after 4s
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 4000);
    }
    window.addEventListener("toast", handler as EventListener);
    return () => window.removeEventListener("toast", handler as EventListener);
  }, []);

  if (!toasts.length) return null;

  return (
    <div className="toast toast-end z-[1000]">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`alert ${
            t.type === "success" ? "alert-success" : t.type === "error" ? "alert-error" : "alert-info"
          }`}
        >
          <span>{t.message}</span>
          <button
            type="button"
            className="btn btn-xs ml-4"
            onClick={() => setToasts((prev) => prev.filter((x) => x.id !== t.id))}
          >
            Close
          </button>
        </div>
      ))}
    </div>
  );
};

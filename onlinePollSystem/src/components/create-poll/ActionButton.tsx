"use client";
import React from "react";

interface ActionButtonProps {
  label: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "success";
  disabled?: boolean;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  label,
  onClick,
  variant = "primary",
  disabled = false,
}) => {
  const bgColor =
    variant === "primary" ? "#6C63FF" :
    variant === "secondary" ? "#6B7280" :
    "#16A34A"; // success green
  const hoverColor =
    variant === "primary" ? "#5a52d5" :
    variant === "secondary" ? "#4b5563" :
    "#128a3f";

  return (
    <button
      type="button"
      className="rounded-full text-white font-bold px-10 py-4 text-2xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      style={{
        backgroundColor: bgColor,
        fontFamily: "Montserrat, sans-serif",
      }}
      onMouseEnter={(e) => !disabled && (e.currentTarget.style.backgroundColor = hoverColor)}
      onMouseLeave={(e) => !disabled && (e.currentTarget.style.backgroundColor = bgColor)}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};
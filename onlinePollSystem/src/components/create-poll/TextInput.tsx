"use client";
import React from "react";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  validationState?: "idle" | "error" | "success";
}

export const TextInput: React.FC<TextInputProps> = ({ placeholder, validationState = "idle", ...props }) => {
  const borderClass =
    validationState === "error"
      ? "border-red-500 focus:ring-red-500"
      : validationState === "success"
      ? "border-green-500 focus:ring-green-500"
      : "border-[#6C5CE7] focus:ring-[#6C5CE7]";
  return (
    <input
      type="text"
      className={`w-full h-[46px] bg-white rounded-[10px] border-2 px-4 text-base font-light focus:outline-none focus:ring-2 transition-colors ${borderClass}`}
      style={{ color: "#4D4F62", fontFamily: "Montserrat, sans-serif" }}
      placeholder={placeholder}
      {...props}
    />
  );
};
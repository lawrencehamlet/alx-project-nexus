"use client";
import React from "react";

interface DateInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  helpText?: string;
  validationState?: "idle" | "error" | "success";
}

export const DateInput: React.FC<DateInputProps> = ({ helpText, validationState = "idle", ...props }) => {
  const borderClass =
    validationState === "error"
      ? "border-red-500 focus:ring-red-500"
      : validationState === "success"
      ? "border-green-500 focus:ring-green-500"
      : "border-[#6C5CE7] focus:ring-[#6C5CE7]";
  return (
    <div className="flex flex-col gap-1">
      <input
        type="date"
        className={`w-[170px] h-[34px] bg-white rounded-[10px] px-3 text-sm font-light focus:outline-none focus:ring-2 border-2 transition-colors ${borderClass}`}
        style={{ color: "#4D4F62", fontFamily: "Montserrat, sans-serif" }}
        {...props}
      />
      {helpText && (
        <span className="text-[10px] font-light" style={{ color: "#4D4F62", fontFamily: "Montserrat, sans-serif" }}>
          {helpText}
        </span>
      )}
    </div>
  );
};
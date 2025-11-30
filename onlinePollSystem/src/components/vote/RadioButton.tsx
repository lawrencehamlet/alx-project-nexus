"use client";
import React from "react";

interface RadioButtonProps {
  selected: boolean;
  onChange: () => void;
  label: string;
}

export const RadioButton: React.FC<RadioButtonProps> = ({ selected, onChange, label }) => {
  return (
    <label className="flex items-center gap-4 cursor-pointer" onClick={onChange}>
      <input
        type="radio"
        checked={selected}
        onChange={onChange}
        className="sr-only"
        aria-checked={selected}
        aria-label={label}
      />
      <div className="relative w-10 h-10 shrink-0" role="presentation" aria-hidden="true">
        {/* Outer circle */}
        <div
          className="absolute inset-0 rounded-full border-[3px]"
          style={{
            borderColor: selected ? "#6C63FF" : "#FFFFFF",
            backgroundColor: "#FFFFFF",
          }}
        />
        {/* Inner filled circle when selected */}
        {selected && (
          <div
            className="absolute inset-2.5 rounded-full"
            style={{ backgroundColor: "#D9D9D9" }}
          />
        )}
      </div>
      <span
        className="text-[32px] font-normal"
        style={{ fontFamily: "var(--font-inter)", color: "#000000" }}
      >
        {label}
      </span>
    </label>
  );
};
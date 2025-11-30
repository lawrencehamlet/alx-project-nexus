"use client";
import React from "react";

interface FormFieldProps {
  label: string;
  children: React.ReactNode;
}

export const FormField: React.FC<FormFieldProps> = ({ label, children }) => {
  return (
    <div className="flex flex-col gap-2">
      <label
        className="text-2xl font-light"
        style={{ color: "#101223", fontFamily: "Montserrat, sans-serif" }}
      >
        {label}
      </label>
      {children}
    </div>
  );
};
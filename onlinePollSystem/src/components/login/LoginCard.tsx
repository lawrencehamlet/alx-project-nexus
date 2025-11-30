"use client";
import React from "react";

export const LoginCard: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div
      className="w-full rounded-3xl px-8 sm:px-12 py-8 sm:py-12 shadow-2xl"
      style={{ backgroundColor: "var(--color-soft-gray)" }}
    >
      {children}
    </div>
  );
};
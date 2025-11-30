"use client";
import React from "react";

export const LoginSubheading: React.FC = () => {
  return (
    <h2
      className="text-2xl sm:text-3xl font-semibold mb-4"
      style={{ color: "var(--color-deep)", fontFamily: "var(--font-poppins)" }}
    >
      New here? Create an account
    </h2>
  );
};
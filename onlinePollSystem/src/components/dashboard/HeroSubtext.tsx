"use client";
import React from "react";

interface HeroSubtextProps {
  children: React.ReactNode;
}

export const HeroSubtext: React.FC<HeroSubtextProps> = ({ children }) => {
  return (
    <p
      className="text-lg sm:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed"
      style={{ color: "white", fontFamily: "var(--font-poppins)" }}
    >
      {children}
    </p>
  );
};
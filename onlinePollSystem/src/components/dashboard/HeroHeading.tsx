"use client";
import React from "react";

interface HeroHeadingProps {
  children: React.ReactNode;
}

export const HeroHeading: React.FC<HeroHeadingProps> = ({ children }) => {
  return (
    <h1
      className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight"
      style={{ color: "white", fontFamily: "var(--font-poppins)" }}
    >
      {children}
    </h1>
  );
};
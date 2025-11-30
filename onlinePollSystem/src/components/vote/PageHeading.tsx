"use client";
import React from "react";

interface PageHeadingProps {
  children: React.ReactNode;
}

export const PageHeading: React.FC<PageHeadingProps> = ({ children }) => {
  return (
    <h1
      className="text-center text-4xl font-semibold mb-8"
      style={{ fontFamily: "var(--font-inter)", color: "#000000" }}
    >
      {children}
    </h1>
  );
};
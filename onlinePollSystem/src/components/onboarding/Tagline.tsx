"use client";
import React from "react";

export const Tagline: React.FC = () => {
  return (
    <p
      className="text-lg sm:text-xl lg:text-2xl text-white leading-relaxed max-w-2xl"
      style={{ fontFamily: "var(--font-inter)" }}
    >
      Make your voice count. Discover polls, cast your vote, and watch real-time results come alive
    </p>
  );
};
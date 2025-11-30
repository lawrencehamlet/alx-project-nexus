"use client";
import React from "react";

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = "" }) => {
  return (
    <a href="/dashboard" aria-label="PollPulse - Go to homepage">
      <h1
        className={`text-white font-semibold ${className || 'text-4xl sm:text-5xl md:text-6xl'}`}
        style={{ fontFamily: "var(--font-inter)" }}
      >
        PollPulse
      </h1>
    </a>
  );
};
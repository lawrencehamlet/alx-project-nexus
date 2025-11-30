"use client";
import React from "react";

interface ResultsCardProps {
  title: string; // e.g., "Best programming Language for beginners?."
  children?: React.ReactNode; // rings and labels inside
}

export const ResultsCard: React.FC<ResultsCardProps> = ({ title, children }) => (
  <div className="rounded-[10px] shadow-md p-8" style={{ backgroundColor: "var(--color-bg-main)" }}>
    <h3
      className="text-[clamp(1.5rem,3vw,3rem)] font-normal text-center mb-6"
      style={{ fontFamily: "var(--font-inter)", color: "var(--color-slate)" }}
    >
      {title}
    </h3>
    <div className="flex justify-center gap-10 flex-wrap">
      {children}
    </div>
  </div>
);

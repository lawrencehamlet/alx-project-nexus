"use client";
import React from "react";

interface RingProps {
  outerColor?: string; // Ellipse 12/18/20 fill
  innerColor?: string; // Ellipse 13/19/21 fill
  percentLabel: string; // e.g., "85 % of Total Voter"
  caption: string; // e.g., "Percentage of Total Vote Cast"
}

export const Ring: React.FC<RingProps> = ({
  outerColor = "#D9D9D9",
  innerColor = "#F4F0FF",
  percentLabel,
  caption,
}) => {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-48 h-48">
        <div
          className="absolute inset-0 rounded-full"
          style={{ backgroundColor: outerColor }}
        />
        <div
          className="absolute inset-5 rounded-full"
          style={{ backgroundColor: innerColor }}
        />
      </div>
      <div className="text-sm" style={{ color: "#000" }}>{percentLabel}</div>
      <div className="text-sm" style={{ color: "#000" }}>{caption}</div>
    </div>
  );
};

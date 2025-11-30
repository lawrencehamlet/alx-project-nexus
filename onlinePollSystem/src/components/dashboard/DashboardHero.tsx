"use client";
import React from "react";

export const DashboardHero: React.FC = () => {
  return (
    <section className="w-full">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-[clamp(2.5rem,6vw,6rem)] font-normal" style={{ color: "#1F2937", fontFamily: "var(--font-poppins)" }}>
          Discover Polls that need your voice
        </h2>
        <p className="mt-4 text-[clamp(1.25rem,3vw,3rem)]" style={{ color: "#6C63FF", fontFamily: "var(--font-poppins)" }}>
          Stay informed. Stay involved. Stay in the pulse
        </p>
      </div>
      <div className="w-full" style={{ backgroundColor: "#F4F0FF" }}>
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Cards container placeholder to match Rectangle 30 */}
        </div>
      </div>
    </section>
  );
};
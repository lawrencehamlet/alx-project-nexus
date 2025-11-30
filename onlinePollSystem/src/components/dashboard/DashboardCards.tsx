"use client";
import React from "react";

export const DashboardCards: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Rectangle 34 */}
      <div className="rounded-md bg-[#D9D9D9] p-6">
        <h3 className="text-[48px] font-medium" style={{ color: "#101223", fontFamily: "var(--font-montserrat, Montserrat)" }}>
          Create New Poll
        </h3>
        <p className="mt-3 text-[32px] font-medium" style={{ color: "#4D4F62", fontFamily: "var(--font-montserrat, Montserrat)" }}>
          Launch a fresh poll in minutes.
        </p>
        <div className="mt-6">
          <button className="rounded-full bg-[#6C63FF] text-white text-2xl font-bold px-8 py-4">
            Create
          </button>
        </div>
      </div>
      {/* Rectangle 35 */}
      <div className="rounded-md bg-[#D9D9D9] p-6">
        <h3 className="text-[48px] font-medium" style={{ color: "#101223", fontFamily: "var(--font-montserrat, Montserrat)" }}>
          Vote Analytics
        </h3>
        <p className="mt-3 text-[32px] font-medium" style={{ color: "#4D4F62", fontFamily: "var(--font-montserrat, Montserrat)" }}>
          Track participation and insights.
        </p>
        <div className="mt-6">
          <button className="rounded-full bg-[#6C63FF] text-white text-2xl font-bold px-8 py-4">
            Review
          </button>
        </div>
      </div>
      {/* Rectangle 36 */}
      <div className="rounded-md bg-[#D9D9D9] p-6">
        <h3 className="text-[48px] font-medium" style={{ color: "#101223", fontFamily: "var(--font-montserrat, Montserrat)" }}>
          Active Polls
        </h3>
        <p className="mt-3 text-[32px] font-medium" style={{ color: "#4D4F62", fontFamily: "var(--font-montserrat, Montserrat)" }}>
          Mobile development frameworks with major community support?.
        </p>
        <div className="mt-6">
          <button className="rounded-full bg-[#6C63FF] text-white text-2xl font-bold px-8 py-4">
            Vote
          </button>
        </div>
      </div>
    </div>
  );
};
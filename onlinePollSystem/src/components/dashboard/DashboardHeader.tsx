"use client";
import React from "react";

export const DashboardHeader: React.FC = () => {
  return (
    <header className="w-full">
      <div className="w-full h-[122px]" style={{ backgroundColor: "#6C63FF" }}>
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <h1 className="text-white font-semibold" style={{ fontSize: "64px", fontFamily: "var(--font-inter)" }}>
            PollPulse
          </h1>
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-8">
              <a className="text-white text-2xl font-semibold" href="#">HOME</a>
              <a className="text-[rgb(31,41,55)] text-2xl font-semibold bg-white rounded-full px-4 py-1" href="#">CREATE POLL</a>
              <a className="text-[rgb(31,41,55)] text-2xl font-semibold bg-white rounded-full px-4 py-1" href="#">MY VOTE</a>
              <a className="text-[rgb(31,41,55)] text-2xl font-semibold bg-white rounded-full px-4 py-1" href="#">LIVE RESULTS</a>
            </nav>
            <div className="w-[90px] h-[90px] rounded-full bg-[#D9D9D9] flex items-center justify-center">
              <span className="text-black" style={{ fontSize: "36px", fontFamily: "var(--font-poppins)" }}>LB</span>
            </div>
            <span className="text-white" style={{ fontSize: "36px", fontFamily: "var(--font-poppins)" }}>
              Hey, Lawrence
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
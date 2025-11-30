"use client";
import React from "react";

export const DashboardFooter: React.FC = () => {
  return (
    <footer className="w-full mt-12">
      <div className="w-full h-[121px]" style={{ backgroundColor: "#6C63FF" }}>
        <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-center">
          <p className="text-center text-white" style={{ fontSize: "24px", fontFamily: "var(--font-poppins)" }}>
            © 2025 PollPulse. All rights reserved.  Real-time polling. Smarter decisions.
            <br />
            Privacy • Terms • Support
          </p>
        </div>
      </div>
    </footer>
  );
};
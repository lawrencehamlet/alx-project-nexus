"use client";
import React from "react";

export const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-purple-600 text-white py-8" role="contentinfo">
      <div className="container mx-auto px-4 text-center">
        <p className="text-lg mb-4" style={{ fontFamily: "var(--font-poppins)" }}>
          © {year} PollPulse. All rights reserved. Real-time polling. Smarter decisions.
        </p>
        <nav className="flex justify-center space-x-2 text-sm" style={{ fontFamily: "var(--font-poppins)" }} aria-label="Footer navigation">
          <a href="#" className="hover:text-purple-200 transition-colors" aria-label="Privacy policy">Privacy</a>
          <span aria-hidden="true">•</span>
          <a href="#" className="hover:text-purple-200 transition-colors" aria-label="Terms of service">Terms</a>
          <span aria-hidden="true">•</span>
          <a href="#" className="hover:text-purple-200 transition-colors" aria-label="Support">Support</a>
        </nav>
      </div>
    </footer>
  );
};
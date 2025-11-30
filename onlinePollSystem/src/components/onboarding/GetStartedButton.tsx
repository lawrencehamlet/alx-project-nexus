"use client";
import React from "react";
import { useRouter } from "next/navigation";

export const GetStartedButton: React.FC = () => {
  const router = useRouter();

  return (
    <button
      type="button"
      className="bg-purple-700 hover:bg-purple-800 text-white font-semibold text-lg sm:text-xl px-8 py-4 sm:px-12 sm:py-6 rounded-lg transition-all duration-200 hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-300"
      style={{ fontFamily: "var(--font-poppins)" }}
      onClick={() => router.push("/login")}
    >
      Get Started
    </button>
  );
};
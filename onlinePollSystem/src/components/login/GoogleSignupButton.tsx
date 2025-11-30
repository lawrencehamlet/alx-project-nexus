"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const GoogleSignupButton: React.FC = () => {
  const router = useRouter();

  return (
    <button
      type="button"
      className="w-full bg-white hover:bg-gray-50 border rounded-full py-4 px-6 flex items-center justify-center gap-3 transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95"
      style={{ borderColor: "var(--color-soft-gray)", boxShadow: "var(--shadow-card)" }}
      aria-label="Create an account with Google"
      onClick={() => {
        // Temporarily bypass Google auth and proceed
        router.push("/dashboard");
      }}
    >
      <span className="inline-flex items-center justify-center w-6 h-6 shrink-0">
        <Image src="/assets/google-icon.svg" alt="Google" width={24} height={24} className="w-full h-full" />
      </span>
      <span
        className="font-medium text-lg"
        style={{ color: "var(--color-deep)", fontFamily: "var(--font-poppins)" }}
      >
        Create an account with Google
      </span>
    </button>
  );
};
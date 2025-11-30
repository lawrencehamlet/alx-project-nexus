"use client";
import React from "react";
import Image from "next/image";

// Illustration exported from Zeplin
const ILLUSTRATION_SRC = "/assets/illustration.svg";

export const SwingingIllustration: React.FC = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <Image
        src={ILLUSTRATION_SRC}
        alt="Swinging illustration"
        fill
        className="object-contain"
        priority
      />
    </div>
  );
};
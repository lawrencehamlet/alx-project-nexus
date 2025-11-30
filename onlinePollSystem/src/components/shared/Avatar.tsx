"use client";
import React from "react";

interface AvatarProps {
  initials: string;
}

export const Avatar: React.FC<AvatarProps> = ({ initials }) => {
  return (
    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-700 font-semibold">
      <span style={{ fontFamily: "var(--font-poppins)" }}>
        {initials}
      </span>
    </div>
  );
};
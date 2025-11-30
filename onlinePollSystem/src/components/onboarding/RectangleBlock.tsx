"use client";
import React from "react";

export const RectangleBlock: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div
      className="rounded-md px-8 py-8 flex items-center justify-center"
      style={{
        backgroundColor: "#6C63FF", // TODO: Tokenize background color
      }}
    >
      {children}
    </div>
  );
};
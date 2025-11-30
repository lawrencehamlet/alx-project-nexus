"use client";
import React from "react";

export const LoginHeading: React.FC = () => {
  return (
    <h1
      className="text-3xl sm:text-4xl font-bold mb-2"
      style={{ color: "var(--color-deep)", fontFamily: "var(--font-poppins)" }}
    >
      Welcome to{" "}
      <span style={{ color: "var(--color-primary)" }}>PollPulse</span>
    </h1>
  );
};
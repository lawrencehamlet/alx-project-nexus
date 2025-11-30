"use client";
import React from "react";

interface UserGreetingProps {
  name: string;
}

export const UserGreeting: React.FC<UserGreetingProps> = ({ name }) => {
  return (
    <span className="text-white text-4xl font-semibold" style={{ fontFamily: "var(--font-poppins)" }}>
      Hey, {name}
    </span>
  );
};
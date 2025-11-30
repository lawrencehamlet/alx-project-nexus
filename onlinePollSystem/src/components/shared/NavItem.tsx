"use client";
import React from "react";

interface NavItemProps {
  label: string;
  href: string;
  active?: boolean;
}

export const NavItem: React.FC<NavItemProps> = ({ label, href, active = false }) => {
  return (
    <a
      href={href}
      className="hover:text-purple-200 transition-colors font-medium"
      style={{ fontFamily: "var(--font-poppins)" }}
      aria-current={active ? 'page' : undefined}
      aria-label={`Navigate to ${label.toLowerCase()}`}
    >
      {label}
    </a>
  );
};
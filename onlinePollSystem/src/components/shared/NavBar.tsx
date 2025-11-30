"use client";
import React from "react";
import { Logo } from "@/components/shared/Logo";
import { Avatar } from "@/components/shared/Avatar";
import { NavItem } from "@/components/shared/NavItem";
import { usePathname } from "next/navigation";

interface NavBarProps {
  activeRoute?: string; // optional; will be ignored if pathname-derived
  userName?: string;
  userInitials?: string;
}

export const NavBar: React.FC<NavBarProps> = ({
  activeRoute,
  userName = "Lawrence",
  userInitials = "LB",
}) => {
  const pathname = usePathname();
  
  // Derive active tab from current route
  const derivedActive: string = (() => {
    if (!pathname) return activeRoute || "home";
    if (pathname.startsWith("/dashboard") || pathname === "/") return "home";
    if (pathname.startsWith("/create-poll")) return "create-poll";
    if (pathname.startsWith("/vote") || pathname.startsWith("/my-vote")) return "my-vote";
    if (pathname.startsWith("/live-results")) return "live-results";
    return activeRoute || "home";
  })();

  return (
    <header className="bg-purple-600 text-white fixed top-0 left-0 right-0 z-50" role="banner">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Logo className="text-2xl sm:text-3xl font-bold" />

          {/* Navigation - Hidden on mobile, shown on tablet+ */}
          <nav className="hidden md:flex space-x-8" role="navigation" aria-label="Main navigation">
            <NavItem label="HOME" href="/dashboard" active={derivedActive === "home"} />
            <NavItem label="CREATE POLL" href="/create-poll" active={derivedActive === "create-poll"} />
            <NavItem label="MY VOTE" href="/vote" active={derivedActive === "my-vote"} />
            <NavItem label="LIVE RESULTS" href="/live-results" active={derivedActive === "live-results"} />
          </nav>

          {/* User Profile */}
          <div className="flex items-center space-x-3" role="complementary" aria-label="User profile">
            <Avatar initials={userInitials} />
            <span className="hidden sm:block font-medium" aria-label={`Current user: ${userName}`}>Hey, {userName}</span>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className="md:hidden mt-4 flex flex-wrap gap-4" role="navigation" aria-label="Mobile navigation">
          <a href="/dashboard" className="text-sm hover:text-purple-200 transition-colors" aria-label="Navigate to home">HOME</a>
          <a href="/create-poll" className="text-sm hover:text-purple-200 transition-colors" aria-label="Navigate to create poll">CREATE POLL</a>
          <a href="/vote" className="text-sm hover:text-purple-200 transition-colors" aria-label="Navigate to my vote">MY VOTE</a>
          <a href="/live-results" className="text-sm hover:text-purple-200 transition-colors" aria-label="Navigate to live results">LIVE RESULTS</a>
        </nav>
      </div>
    </header>
  );
};
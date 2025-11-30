"use client";
import React from "react";

import { LoginCard } from "./LoginCard";
import { LoginHeading } from "./LoginHeading";
import { LoginSubheading } from "./LoginSubheading";
import { GoogleSignupButton } from "./GoogleSignupButton";

export const LoginContainer: React.FC = () => {
  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-4"
      style={{
        background:
          "linear-gradient(135deg, rgba(78,141,245,1) 0%, rgba(108,92,231,1) 100%)",
      }}
    >
      <div className="w-full max-w-md">
        <LoginCard>
          {/* Main Heading */}
          <div className="text-center mb-12 sm:mb-16">
            <LoginHeading />
          </div>

          {/* Content Section */}
          <div className="space-y-8">
            {/* Create Account Heading */}
            <div className="text-center">
              <LoginSubheading />
              
              {/* Sign In Link */}
              <p className="text-base sm:text-lg mt-4" style={{ color: "var(--color-slate)", fontFamily: "var(--font-poppins)" }}>
                Already have account,{" "}
                <button className="font-medium underline transition-colors hover:opacity-80" style={{ color: "var(--color-primary)" }}>
                  sign in
                </button>
              </p>
            </div>

            {/* Google Sign Up Button */}
            <div className="pt-8">
              <GoogleSignupButton />
            </div>
          </div>
        </LoginCard>
      </div>
    </div>
  );
};
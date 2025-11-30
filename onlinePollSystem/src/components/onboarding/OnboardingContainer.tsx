"use client";
import React from "react";
import { LogoWordmark } from "./LogoWordmark";
import { Tagline } from "./Tagline";
import { CtaHeading } from "./CtaHeading";
import { SwingingIllustration } from "./SwingingIllustration";
import { GetStartedButton } from "./GetStartedButton";

export const OnboardingContainer: React.FC = () => {
  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, rgba(78,141,245,1) 0%, rgba(108,92,231,1) 100%)",
      }}
    >
      <div className="container mx-auto px-4 py-8 lg:py-16">
        {/* Header */}
        <header className="mb-12 lg:mb-20">
          <LogoWordmark />
        </header>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 lg:space-y-12">
            {/* Description */}
            <Tagline />

            {/* Call to Action Section */}
            <div className="space-y-6 lg:space-y-8">
              <CtaHeading />
              <GetStartedButton />
            </div>
          </div>

          {/* Right Content - Illustration */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
              <SwingingIllustration />
            </div>
          </div>
        </div>
      </div>

      {/* Background Decorative Elements */}
      <div className="absolute top-20 right-10 w-20 h-20 bg-white bg-opacity-10 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 left-10 w-32 h-32 bg-white bg-opacity-5 rounded-full blur-2xl"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-purple-300 bg-opacity-20 rounded-full blur-lg"></div>
    </div>
  );
};
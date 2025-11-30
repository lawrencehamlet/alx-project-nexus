import { OnboardingContainer } from "@/components/onboarding/OnboardingContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Welcome to PollPulse - Get Started",
  description: "Create and participate in real-time polls with PollPulse",
};

export default function Home() {
  return <OnboardingContainer />;
}

import { LoginContainer } from "@/components/login/LoginContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - PollPulse",
  description: "Sign in to your PollPulse account",
};

export default function LoginPage() {
  return <LoginContainer />;
}
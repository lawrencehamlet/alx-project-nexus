"use client";
import { NavBar } from "@/components/shared/NavBar";
import { Footer } from "@/components/shared/Footer";
import { HeroHeading } from "@/components/dashboard/HeroHeading";
import { HeroSubtext } from "@/components/dashboard/HeroSubtext";
import { PollCard } from "@/components/dashboard/PollCard";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useActivePoll } from "@/hooks/useActivePoll";

export default function DashboardPage() {
  const router = useRouter();
  const { poll, loading, error } = useActivePoll();

  useEffect(() => {
    document.title = "Dashboard - PollPulse";
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 pt-[72px]">
      <NavBar activeRoute="home" />

      <section 
        className="relative bg-cover bg-center py-20 sm:py-32 lg:py-40"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('/assets/hero-bg.jpg')`
        }}
        role="banner"
        aria-label="Hero section"
      >
        <div className="container mx-auto px-4 text-center text-white">
          <HeroHeading>Discover Polls that need your voice</HeroHeading>
          <HeroSubtext>Stay informed. Stay involved. Stay in the pulse.</HeroSubtext>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12 lg:py-20" role="main">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8" role="list" aria-label="Dashboard poll cards">
            {/* Create Poll Card */}
            <PollCard
              title="Create New Poll"
              description="Launch a fresh poll in minutes."
              buttonLabel="Create"
              onButtonClick={() => router.push("/create-poll")}
            />
            {/* Review / Live Results Card */}
            <PollCard
              title="Vote Analytics"
              description="Track participation and insights."
              buttonLabel="Review"
              onButtonClick={() => {
                if (poll) router.push(`/live-results/${poll.id}`);
                else router.push("/live-results");
              }}
            />
            {/* Active Poll Card - only one displayed */}
            {loading && (
              <div className="rounded-md bg-base-200 p-6 flex flex-col h-full animate-pulse gap-4" role="status" aria-label="Loading active poll" aria-live="polite">
                <div className="h-12 w-2/3 skeleton" />
                <div className="h-8 w-full skeleton" />
                <div className="mt-auto h-14 w-40 skeleton rounded-full" />
              </div>
            )}
            {!loading && error && (
              <div className="rounded-md bg-red-100 border border-red-300 p-6 flex flex-col h-full" role="alert" aria-live="assertive">
                <p className="text-red-700 font-medium">Failed to load active poll: {error}</p>
              </div>
            )}
            {!loading && !error && !poll && (
              <div className="rounded-md bg-base-200 p-6 flex flex-col h-full justify-center text-center" role="status" aria-live="polite">
                <p className="text-lg text-gray-600">No active polls available right now.</p>
              </div>
            )}
            {!loading && !error && poll && (
              <PollCard
                title="Active Poll"
                description={poll.question}
                buttonLabel="Vote"
                statusText="Active"
                statusColor="#16A34A"
                onButtonClick={() => router.push(`/vote/${poll.id}`)}
              />
            )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
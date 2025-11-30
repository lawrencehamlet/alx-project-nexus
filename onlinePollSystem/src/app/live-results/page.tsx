"use client";
import React, { useEffect } from "react";
import { NavBar } from "@/components/shared/NavBar";
import { Footer } from "@/components/shared/Footer";
import { useActivePoll } from "@/hooks/useActivePoll";
import { PollResultsChart } from "@/components/results/PollResultsChart";
import { VoteAnalyticsHeading } from "@/components/results/VoteAnalyticsHeading";
import { ResultsCard } from "@/components/results/ResultsCard";
import { Ring } from "@/components/results/Ring";
import { PollManagementHeading } from "@/components/management/PollManagementHeading";
import { ManagementCard } from "@/components/management/ManagementCard";

export default function LiveResultsPage() {
  const { poll, loading, error, totalVotes } = useActivePoll();

  useEffect(() => {
    if (poll) {
      document.title = `Results: ${poll.question} - PollPulse`;
    } else {
      document.title = "Live Results - PollPulse";
    }
  }, [poll]);

  return (
    <div className="min-h-screen flex flex-col bg-white pt-[72px]">
      <NavBar activeRoute="live-results" />
      <main className="grow flex flex-col px-6 py-12 max-w-7xl mx-auto w-full gap-12" role="main">
        {/* Vote Analytics Section */}
        <section aria-labelledby="vote-analytics-heading">
          <VoteAnalyticsHeading />
          {loading && <div className="skeleton h-72 w-full mt-6" role="status" aria-label="Loading poll results" />}
          {!loading && error && (
            <div className="alert alert-error mt-6" role="alert" aria-live="polite"><span>{error}</span></div>
          )}
          {!loading && !error && !poll && (
            <div className="alert alert-info mt-6" role="status" aria-live="polite">
              <span>There's no available poll yet. Create one or wait for others to share.</span>
            </div>
          )}
          {!loading && !error && poll && (
            <div className="mt-6" role="region" aria-label="Poll results visualization">
              <PollResultsChart poll={poll} />
            </div>
          )}
        </section>

        {/* Poll Management Section */}
        <section aria-labelledby="poll-management-heading">
          <PollManagementHeading />
          {loading && <div className="skeleton h-40 w-full mt-6" role="status" aria-label="Loading management options" />}
          {!loading && !error && poll && (
            <div className="mt-6">
              <ManagementCard pollId={poll.id} title={poll.question} />
            </div>
          )}
          {!loading && !error && !poll && (
            <div className="alert alert-info mt-6" role="status" aria-live="polite">
              <span>No active poll to manage.</span>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}

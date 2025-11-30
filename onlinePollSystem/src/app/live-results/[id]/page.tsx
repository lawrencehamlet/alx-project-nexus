"use client";
import React, { useEffect, useState } from "react";
import { NavBar } from "@/components/shared/NavBar";
import { Footer } from "@/components/shared/Footer";
import { PollResultsChart } from "@/components/results/PollResultsChart";
import { useParams } from "next/navigation";

interface PollOption { id: string; label: string; votes: number }
interface PollData { id: string; question: string; options: PollOption[] }

export default function LiveResultsByIdPage() {
  const params = useParams<{ id: string }>();
  const [poll, setPoll] = useState<PollData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (poll) {
      document.title = `Results: ${poll.question} - PollPulse`;
    } else {
      document.title = "Live Results - PollPulse";
    }
  }, [poll]);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch(`/api/polls/${params.id}`);
        if (!res.ok) throw new Error(`Status ${res.status}`);
        const data = await res.json();
        const optionsWithVotes = (data.options || []).map((o: any) => ({ ...o, votes: o.votes ?? 0 }));
        if (!cancelled) setPoll({ id: data.id, question: data.title || data.question, options: optionsWithVotes });
      } catch (e: any) {
        if (!cancelled) setError(e.message || "Failed to load poll");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true };
  }, [params.id]);

  return (
    <div className="min-h-screen flex flex-col bg-white pt-[72px]">
      <NavBar activeRoute="live-results" />
      <main className="grow flex flex-col px-6 py-12 max-w-7xl mx-auto w-full gap-12">
        {loading && <div className="skeleton h-72 w-full" />}
        {!loading && error && (
          <div className="alert alert-error"><span>{error}</span></div>
        )}
        {!loading && !error && !poll && (
          <div className="alert alert-info">
            <span>
              There’s no available poll yet. Create one or wait for others to share.
            </span>
          </div>
        )}
        {!loading && !error && poll && (
          <PollResultsChart poll={poll as any} />
        )}
      </main>
      <Footer />
    </div>
  );
}
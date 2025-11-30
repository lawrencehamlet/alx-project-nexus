"use client";
import React, { useEffect, useState } from "react";
import { NavBar } from "@/components/shared/NavBar";
import { Footer } from "@/components/shared/Footer";
import { VotingCard } from "@/components/vote/VotingCard";
import { useParams } from "next/navigation";

interface PollOption { id: string; label: string }
interface PollData { id: string; question: string; options: PollOption[] }

export default function VoteByIdPage() {
  const params = useParams<{ id: string }>();
  const [poll, setPoll] = useState<PollData | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (poll) {
      document.title = `Vote: ${poll.question} - PollPulse`;
    } else {
      document.title = "Vote - PollPulse";
    }
  }, [poll]);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch(`/api/polls/${params.id}`);
        if (!res.ok) throw new Error(`Status ${res.status}`);
        const data = await res.json();
        if (!cancelled) setPoll({ id: data.id, question: data.title || data.question, options: data.options || [] });
      } catch (e: any) {
        if (!cancelled) setError(e.message || "Failed to load poll");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true };
  }, [params.id]);

  const handleVote = async (pollId: string, optionId: string) => {
    // Only count votes on this page; placeholder for backend integration
    console.log("Submit vote", { pollId, optionId });
    if (!poll) return;
    try {
      setSubmitting(true);
      // Optimistic update
      setPoll((prev: any) => {
        if (!prev) return prev;
        return {
          ...prev,
          options: prev.options.map((o: any) =>
            o.id === optionId ? { ...o, votes: (o.votes ?? 0) + 1 } : o
          ),
        };
      });

      const res = await fetch(`/api/vote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pollId: poll.id, optionId }),
      });
      if (!res.ok) throw new Error("Failed to submit vote");
      const data = await res.json();
      // Sync with server response (normalize to client schema)
      setPoll({ id: data.poll.id, question: data.poll.title || data.poll.question, options: data.poll.options || [] });
    } catch (e) {
      // Rollback could be added; for now, refetch
      console.error(e);
      await fetch(`/api/polls/${params.id}`)
        .then((r) => r.json())
        .then((data) => setPoll({ id: data.id, question: data.title || data.question, options: data.options || [] }));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white pt-[72px]">
      <NavBar />
      <main className="grow flex flex-col px-6 py-12 max-w-7xl mx-auto w-full" role="main">
        {loading && <div className="skeleton h-40 w-full" role="status" aria-label="Loading poll" aria-live="polite" />}
        {!loading && error && (
          <div className="alert alert-error" role="alert" aria-live="assertive"><span>{error}</span></div>
        )}
        {!loading && !error && !poll && (
          <div className="alert alert-info" role="status" aria-live="polite">
            <span>
              There's no available poll yet. Create one or wait for others to share.
            </span>
          </div>
        )}
        {!loading && !error && poll && (
          <VotingCard poll={poll} onVote={(optionId) => handleVote(poll.id, optionId)} disabled={submitting} />
        )}
      </main>
      <Footer />
    </div>
  );
}
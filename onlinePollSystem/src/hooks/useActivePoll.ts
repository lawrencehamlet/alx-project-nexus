"use client";
import { useEffect, useState, useRef } from "react";
import { io, Socket } from "socket.io-client";

export interface PollOption {
  id: string;
  label: string;
  votes: number;
}

export interface ActivePoll {
  id: string;
  question: string;
  isActive: boolean;
  options: PollOption[];
}

interface UseActivePollResult {
  poll: ActivePoll | null;
  loading: boolean;
  error: string | null;
  totalVotes: number;
}

export function useActivePoll(): UseActivePollResult {
  const [poll, setPoll] = useState<ActivePoll | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function fetchPoll() {
      setLoading(true);
      try {
        const res = await fetch("/api/active-polls", { cache: "no-store" });
        if (!res.ok) throw new Error(`Status ${res.status}`);
        const data = await res.json();
        if (!cancelled) setPoll(data.poll);
      } catch (e: any) {
        if (!cancelled) setError(e.message || "Failed to load poll");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchPoll();

    const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL;
    if (socketUrl) {
      socketRef.current = io(socketUrl, { transports: ["websocket"] });
      socketRef.current.on("connect", () => {
        // Optionally emit a join room event
      });
      socketRef.current.on("voteUpdate", (payload: { pollId: string; optionId: string; votes: number }) => {
        setPoll((prev) => {
          if (!prev || prev.id !== payload.pollId) return prev;
          return {
            ...prev,
            options: prev.options.map((o) =>
              o.id === payload.optionId ? { ...o, votes: payload.votes } : o
            ),
          };
        });
      });
    }
    return () => {
      cancelled = true;
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  const totalVotes = poll ? poll.options.reduce((sum, o) => sum + o.votes, 0) : 0;

  return { poll, loading, error, totalVotes };
}

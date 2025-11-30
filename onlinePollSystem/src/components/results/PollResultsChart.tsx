"use client";
import React, { useMemo } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { ActivePoll } from "@/hooks/useActivePoll";

ChartJS.register(ArcElement, Tooltip, Legend);

interface PollResultsChartProps {
  poll: ActivePoll;
}

export const PollResultsChart: React.FC<PollResultsChartProps> = ({ poll }) => {
  const total = poll.options.reduce((sum, o) => sum + o.votes, 0);
  const hasVotes = total > 0;

  const data = useMemo(() => {
    if (!hasVotes) {
      // Show empty gray circle when no votes
      return {
        labels: ['No votes yet'],
        datasets: [
          {
            label: 'Votes',
            data: [1],
            backgroundColor: ['#E5E7EB'],
            borderColor: '#ffffff',
            borderWidth: 2,
          },
        ],
      };
    }
    return {
      labels: poll.options.map((o) => o.label),
      datasets: [
        {
          label: "Votes",
          data: poll.options.map((o) => o.votes),
          backgroundColor: ["#6C63FF", "#16A34A", "#F59E0B", "#0EA5E9", "#D946EF", "#EF4444"].slice(0, poll.options.length),
          borderColor: "#ffffff",
          borderWidth: 2,
        },
      ],
    };
  }, [poll, hasVotes]);

  return (
    <div className="flex flex-col gap-6">
      {/* Poll Question */}
      <h3
        className="text-center text-[clamp(1.5rem,3vw,2.5rem)] font-semibold"
        style={{ fontFamily: "var(--font-inter)", color: "var(--color-deep)" }}
        id="chart-poll-question"
      >
        {poll.question}
      </h3>
      
      {/* Chart */}
      <div className="w-full max-w-md mx-auto" role="img" aria-labelledby="chart-poll-question" aria-label={`Pie chart showing ${hasVotes ? 'vote distribution' : 'no votes yet'}`}>
        <Pie 
          data={data}
          options={{
            plugins: {
              legend: {
                display: hasVotes,
              },
              tooltip: {
                enabled: hasVotes,
              },
            },
          }}
        />
      </div>

      {/* Stats - only show when there are votes */}
      {hasVotes ? (
        <div className="stats shadow w-full" style={{ backgroundColor: "var(--color-bg-main)" }} role="region" aria-label="Vote statistics">
          <div className="stat">
            <div className="stat-title" style={{ color: "var(--color-slate)" }}>Total Votes</div>
            <div className="stat-value" style={{ color: "var(--color-deep)" }}>{total}</div>
          </div>
          {poll.options.map((o) => (
            <div key={o.id} className="stat">
              <div className="stat-title" style={{ color: "var(--color-slate)" }}>{o.label}</div>
              <div className="stat-value text-xl" style={{ color: "var(--color-deep)" }}>{o.votes}</div>
              <div className="stat-desc" style={{ color: "var(--color-gray)" }}>{((o.votes / total) * 100).toFixed(1)}%</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-4" style={{ color: "var(--color-gray)" }} role="status" aria-live="polite">
          <p className="text-lg">No votes have been cast yet. Be the first to vote!</p>
        </div>
      )}
    </div>
  );
};

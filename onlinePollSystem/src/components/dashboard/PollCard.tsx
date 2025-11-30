"use client";
import React from "react";

interface PollCardProps {
  id?: string; // unique poll id for CRUD (optional for static cards)
  title: string;
  description: string;
  buttonLabel: string;
  onButtonClick?: () => void;
  statusText?: string; // e.g. "Active"
  statusColor?: string; // e.g. "#16A34A" (green)
}

export const PollCard: React.FC<PollCardProps> = ({
  id,
  title,
  description,
  buttonLabel,
  onButtonClick,
  statusText,
  statusColor,
}) => {
  return (
    <article className="bg-gray-300 rounded-2xl p-8 lg:p-10 flex flex-col h-full" data-poll-id={id || undefined} role="listitem">
      <div className="flex items-center justify-between mb-6">
        <h3
          className="text-2xl lg:text-3xl font-bold text-gray-800"
          style={{ fontFamily: "var(--font-poppins)" }}
          id={id ? `poll-card-title-${id}` : undefined}
        >
          {title}
        </h3>
        {id && <span className="sr-only">Poll ID: {id}</span>}
        {statusText && (
          <div className="flex items-center space-x-2" role="status" aria-label={`Poll status: ${statusText}`}>
            <span className="text-gray-500 text-sm" aria-hidden="true">status</span>
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: statusColor || "#16A34A" }}
              role="presentation"
              aria-hidden="true"
            />
          </div>
        )}
      </div>
      <p
        className="text-gray-600 text-lg mb-8 leading-relaxed flex-grow"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        {description}
      </p>
      <button
        className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-3 rounded-full transition-all duration-200 hover:shadow-lg transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-300"
        onClick={onButtonClick}
        style={{ fontFamily: "var(--font-poppins)" }}
        aria-label={`${buttonLabel} ${title}`}
      >
        {buttonLabel}
      </button>
    </article>
  );
};
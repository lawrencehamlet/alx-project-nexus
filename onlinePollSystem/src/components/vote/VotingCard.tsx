"use client";
import React, { useState } from "react";
import { RadioButton } from "./RadioButton";

interface PollOption {
  id: string;
  label: string;
}

interface Poll {
  id: string;
  question: string;
  options: PollOption[];
}

interface VotingCardProps {
  poll: Poll;
  onVote: (optionId: string) => void;
  disabled?: boolean;
}

export const VotingCard: React.FC<VotingCardProps> = ({
  poll,
  onVote,
  disabled = false,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState<boolean>(false);

  const handleVoteClick = () => {
    if (selectedOption) {
      onVote(selectedOption);
      setHasVoted(true);
    }
  };

  return (
    <div
      className="w-full rounded-none bg-[#D9D9D9] shadow-md p-4 sm:p-6 md:p-8 transition-all"
      style={{
        backgroundColor: selectedOption ? "#D9D9D9" : "#D9D9D9",
      }}
      role="form"
      aria-label="Poll voting form"
    >
      {/* Question */}
      <h3
        className="text-xl sm:text-2xl md:text-3xl lg:text-[32px] font-normal mb-4 sm:mb-6 leading-tight"
        style={{ fontFamily: "var(--font-inter)", color: "#000000" }}
        id="poll-question"
      >
        {poll.question}
      </h3>

      {/* Options Grid - dynamically rendered */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6" role="radiogroup" aria-labelledby="poll-question" aria-required="true">
        {poll.options.map((option) => (
          <RadioButton
            key={option.id}
            selected={selectedOption === option.id}
            onChange={() => setSelectedOption(option.id)}
            label={option.label}
          />
        ))}
      </div>

      {/* Vote Button */}
      <div className="flex justify-center sm:justify-end">
        <button
          type="button"
          className={`rounded-full text-white font-bold px-8 sm:px-10 md:px-12 py-3 sm:py-4 text-lg sm:text-xl md:text-2xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto ${hasVoted ? 'bg-lime-500 hover:bg-lime-600' : 'bg-[#6C63FF] hover:bg-[#5a52d5]'}`}
          style={{ fontFamily: "var(--font-inter)" }}
          onClick={handleVoteClick}
          disabled={!selectedOption || disabled || hasVoted}
          aria-label={hasVoted ? 'Vote submitted successfully' : 'Submit your vote'}
          aria-disabled={!selectedOption || disabled || hasVoted}
        >
          {hasVoted ? 'Voted' : 'Vote'}
        </button>
      </div>
    </div>
  );
};
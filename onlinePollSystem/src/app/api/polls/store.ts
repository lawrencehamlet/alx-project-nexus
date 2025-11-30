// Shared in-memory poll store (mock). In real app replace with DB.
export const polls: Record<string, any> = {
  "poll-1": {
    id: "poll-1",
    title: "Mobile development frameworks with major community support?.",
    description: "Choose the best mobile framework.",
    options: [
      { id: "opt-1", label: "Flutter", votes: 12 },
      { id: "opt-2", label: "React Native", votes: 18 },
      { id: "opt-3", label: "Swift UI", votes: 4 },
    ],
    startDate: "2025-11-01",
    endDate: "2025-12-31",
  },
};

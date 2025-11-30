"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function VoteFallbackPage() {
  const router = useRouter();
  
  useEffect(() => {
    document.title = "Loading Vote - PollPulse";
    // Client-side redirect to first available poll or dashboard
    fetch('/api/active-polls')
      .then(res => res.json())
      .then(data => {
        const id = data?.poll?.id;
        router.push(id ? `/vote/${id}` : "/dashboard");
      })
      .catch(() => router.push("/dashboard"));
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="loading loading-spinner text-primary loading-lg"></div>
    </div>
  );
}
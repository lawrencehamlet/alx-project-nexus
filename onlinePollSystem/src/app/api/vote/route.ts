import { NextResponse } from "next/server";
import { vote as voteOnPoll } from "@/lib/polls";

export async function POST(request: Request) {
  const body = await request.json();
  const { pollId, optionId } = body as { pollId: string; optionId: string };
  const updated = await voteOnPoll(pollId, optionId);
  if (!updated) return NextResponse.json({ error: "Poll or option not found" }, { status: 404 });
  return NextResponse.json({ poll: updated });
}

import { NextResponse } from "next/server";
import { getFirstActivePoll } from "@/lib/polls";

export async function GET() {
  const poll = await getFirstActivePoll();
  return NextResponse.json({ poll });
}

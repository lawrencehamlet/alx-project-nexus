import { NextResponse } from "next/server";
import { getAllPolls } from "@/lib/polls";

export async function GET() {
  const all = await getAllPolls();
  return NextResponse.json({ polls: all });
}
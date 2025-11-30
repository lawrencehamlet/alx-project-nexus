import { NextResponse } from "next/server";
import { createPoll } from "@/lib/polls";

export async function POST(request: Request) {
  const body = await request.json();
  const pollData: any = {
    title: body.title || "Untitled Poll",
    description: body.description || "",
    options: Array.isArray(body.options) ? body.options : [],
    startDate: body.startDate || "",
    endDate: body.endDate || "",
    isActive: body.isActive ?? true,
  };
  if (body.id) {
    pollData.id = body.id;
  }
  const created = await createPoll(pollData);
  return NextResponse.json(created, { status: 201 });
}

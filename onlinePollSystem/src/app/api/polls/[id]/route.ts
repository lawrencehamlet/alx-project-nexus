import { NextResponse } from "next/server";
import { getPollById, updatePoll, removePoll } from "@/lib/polls";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const rawId = resolvedParams?.id;
  const id = typeof rawId === 'string' ? rawId.trim() : '';
  if (!id) return NextResponse.json({ error: 'Missing poll id' }, { status: 400 });
  try {
    const poll = await getPollById(id);
    if (!poll) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(poll);
  } catch (e: any) {
    console.error('Poll GET error', id, e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const body = await request.json();
  const updated = await updatePoll(resolvedParams.id, body);
  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(updated);
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const rawId = resolvedParams?.id;
  const id = typeof rawId === 'string' ? rawId.trim() : '';
  if (!id) return NextResponse.json({ error: 'Missing poll id' }, { status: 400 });
  try {
    const ok = await removePoll(id);
    if (!ok) return NextResponse.json({ error: 'Poll not found' }, { status: 404 });
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    console.error('Poll DELETE error', id, e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

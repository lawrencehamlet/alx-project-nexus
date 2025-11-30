import { db } from "./firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  deleteDoc,
  runTransaction,
} from "firebase/firestore";

export type PollOption = { id: string; label: string; votes: number };
export type Poll = {
  id: string;
  title: string;
  description: string;
  options: PollOption[];
  startDate?: string;
  endDate?: string;
  isActive?: boolean;
};

const pollsCol = collection(db, "polls");

export async function getAllPolls(): Promise<Poll[]> {
  const snap = await getDocs(pollsCol);
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Poll, "id">) }));
}

export async function getPollById(id: string): Promise<Poll | null> {
  const ref = doc(pollsCol, id);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return { id: snap.id, ...(snap.data() as Omit<Poll, "id">) };
}

export async function createPoll(data: Omit<Poll, "id"> & { id?: string }): Promise<Poll> {
  const cleanOptions = (data.options || []).map((o, idx) => ({
    id: o.id || `opt-${idx + 1}`,
    label: o.label,
    votes: typeof o.votes === "number" ? o.votes : 0,
  }));
  const { id, ...rest } = data;
  const payload = { ...rest, options: cleanOptions, isActive: data.isActive ?? true };
  if (id) {
    const ref = doc(pollsCol, id);
    await setDoc(ref, payload, { merge: false });
    return { id, ...(payload as Omit<Poll, "id">) };
  } else {
    const ref = await addDoc(pollsCol, payload);
    const snap = await getDoc(ref);
    return { id: ref.id, ...(snap.data() as Omit<Poll, "id">) };
  }
}

export async function updatePoll(id: string, incoming: Partial<Poll>): Promise<Poll | null> {
  // Preserve existing votes if not provided
  const ref = doc(pollsCol, id);
  return await runTransaction(db, async (trx) => {
    const snap = await trx.get(ref);
    if (!snap.exists()) return null;
    const existing = snap.data() as Omit<Poll, "id">;
    let mergedOptions: PollOption[] = existing.options || [];
    if (incoming.options) {
      mergedOptions = incoming.options.map((o) => {
        const prev = (existing.options || []).find((p) => p.id === o.id || p.label === o.label);
        return {
          id: o.id || prev?.id || `opt-${Math.random().toString(36).slice(2, 6)}`,
          label: o.label ?? prev?.label ?? "",
          votes: typeof o.votes === "number" ? o.votes : (prev?.votes ?? 0),
        };
      });
    }
    const updated = {
      ...existing,
      ...incoming,
      options: incoming.options ? mergedOptions : existing.options,
    } as Omit<Poll, "id">;
    trx.set(ref, updated, { merge: false });
    return { id, ...updated };
  });
}

export async function removePoll(id: string): Promise<boolean> {
  const ref = doc(pollsCol, id);
  const snap = await getDoc(ref);
  if (!snap.exists()) return false;
  await deleteDoc(ref);
  return true;
}

export async function vote(pollId: string, optionId: string): Promise<Poll | null> {
  const ref = doc(pollsCol, pollId);
  const updated = await runTransaction(db, async (trx) => {
    const snap = await trx.get(ref);
    if (!snap.exists()) return null;
    const existing = snap.data() as Omit<Poll, "id">;
    const options = (existing.options || []).map((o) =>
      o.id === optionId ? { ...o, votes: (o.votes ?? 0) + 1 } : o
    );
    const next = { ...existing, options } as Omit<Poll, "id">;
    trx.set(ref, next, { merge: false });
    return { id: pollId, ...next } as Poll;
  });
  return updated;
}

export async function getFirstActivePoll(): Promise<{
  id: string;
  question: string;
  isActive: boolean;
  options: PollOption[];
} | null> {
  // Simple approach: return the first poll, map title->question
  const all = await getAllPolls();
  if (!all.length) return null;
  const p = all[0];
  return { id: p.id, question: p.title, isActive: p.isActive ?? true, options: p.options || [] };
}

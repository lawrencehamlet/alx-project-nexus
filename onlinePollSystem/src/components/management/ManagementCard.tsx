"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface ManagementCardProps {
  pollId: string;
  title: string;
}

export const ManagementCard: React.FC<ManagementCardProps> = ({ pollId, title }) => {
  const router = useRouter();
  const [modalType, setModalType] = useState<null | "update" | "delete">(null);

  const closeModal = () => setModalType(null);

  const handleUpdate = async () => {
    // Fetch poll data and navigate to create-poll with query params
    try {
      const res = await fetch(`/api/polls/${pollId}`);
      const data = await res.json();
      const params = new URLSearchParams({
        id: data.id,
        title: data.title,
        description: data.description || "",
        options: (data.options || []).map((o: any) => o.label).join(","),
        startDate: data.startDate || "",
        endDate: data.endDate || "",
      });
      router.push(`/create-poll?${params.toString()}`);
    } catch (e) {
      console.error(e);
      alert("Failed to load poll for update.");
    }
  };

  const handleDelete = async () => {
    try {
      console.log('Deleting poll with ID:', pollId);
      const res = await fetch(`/api/polls/${pollId}`, { method: "DELETE" });
      console.log('Delete response status:', res.status);
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        console.error('Delete error response:', errData);
        throw new Error(errData.error || `Status ${res.status}`);
      }
      const deleted = await res.json();
      console.log('Delete success:', deleted);
      alert(`Poll deleted successfully!`);
      router.push('/dashboard');
    } catch (e) {
      console.error('Delete failed:', e);
      alert(`Delete failed: ${(e as Error).message}`);
    }
  };

  return (
    <div className="rounded-none p-8 shadow-md" style={{ backgroundColor: "var(--color-bg-main)" }}>
      <h3
        className="text-[clamp(1.5rem,3vw,3rem)] font-normal mb-6"
        style={{ fontFamily: "var(--font-inter)", color: "var(--color-slate)" }}
      >
        {title}
      </h3>
      <div className="flex gap-6" role="group" aria-label="Poll management actions">
        <button
          className="rounded-full bg-[#0D6EFD] text-white font-bold px-8 py-4 text-2xl hover:brightness-95"
          onClick={() => setModalType("update")}
          style={{ fontFamily: "Montserrat, sans-serif" }}
          aria-label={`Update poll: ${title}`}
        >
          Update
        </button>
        <button
          className="rounded-full bg-[#EF4444] text-white font-bold px-8 py-4 text-2xl hover:brightness-95"
          onClick={() => setModalType("delete")}
          style={{ fontFamily: "Montserrat, sans-serif" }}
          aria-label={`Delete poll: ${title}`}
        >
          Delete
        </button>
      </div>
      {/* DaisyUI modal */}
      {modalType && (
        <dialog className="modal" open role="dialog" aria-modal="true" aria-labelledby="modal-title" aria-describedby="modal-description">
          <div className="modal-box">
            <h3 className="font-bold text-lg" id="modal-title">
              {modalType === "update" ? "Update Poll" : "Delete Poll"}
            </h3>
            <p className="py-4" id="modal-description">
              {modalType === "update"
                ? "Proceed to edit this poll in the create-poll page?"
                : "Are you sure you want to delete this poll? This action cannot be undone."}
            </p>
            <div className="modal-action">
              <button className="btn" onClick={closeModal} aria-label="Cancel action">Cancel</button>
              {modalType === "update" ? (
                <button className="btn btn-primary" onClick={() => { closeModal(); handleUpdate(); }} aria-label="Continue to update poll">Continue</button>
              ) : (
                <button className="btn btn-error" onClick={() => { closeModal(); handleDelete(); }} aria-label="Confirm delete poll">Delete</button>
              )}
            </div>
          </div>
          <form method="dialog" className="modal-backdrop" onClick={closeModal}>
            <button>close</button>
          </form>
        </dialog>
      )}
    </div>
  );
};

"use client";

import { useEffect, useState } from "react";
import { ComplaintCard } from "@/components/customs/gov/complaint-card";
import { complaints } from "./data";

type Complaint = {
  id: string;
  name: string;
  email: string;
  category: string;
  message: string;
  status: string;
  submittedAt: string;
};

// Adjust classification function to match your real data fields
function classifyComplaint(complaint: Complaint): "urgent" | "important" | "canWait" {
  const content = `${complaint.category} ${complaint.message}`.toLowerCase();

  const urgentKeywords = ["sewage", "fire", "outage", "flood", "explosion", "water supply", "emergency"];
  const importantKeywords = ["pothole", "broken", "noise", "vandalism", "road infrastructure", "traffic"];

  if (urgentKeywords.some((word) => content.includes(word))) return "urgent";
  if (importantKeywords.some((word) => content.includes(word))) return "important";
  return "canWait";
}

export default function ComplaintsPage() {
  const [urgent, setUrgent] = useState<Complaint[]>([]);
  const [important, setImportant] = useState<Complaint[]>([]);
  const [canWait, setCanWait] = useState<Complaint[]>([]);

  useEffect(() => {
    const u: Complaint[] = [];
    const i: Complaint[] = [];
    const c: Complaint[] = [];

    for (const complaint of complaints) {
      const category = classifyComplaint(complaint);
      if (category === "urgent") u.push(complaint);
      else if (category === "important") i.push(complaint);
      else c.push(complaint);
    }

    setUrgent(u);
    setImportant(i);
    setCanWait(c);
  }, []);

  const renderList = (items: Complaint[]) =>
    items.map((complaint) => (
      <ComplaintCard
        key={complaint.id}
        id={complaint.id}
        name={complaint.name}
        email={complaint.email}
        category={complaint.category}
        message={complaint.message}
        submittedAt={complaint.submittedAt}
        status={complaint.status}
      />
    ));

  return (
    <div className="p-6 space-y-10">
      <section>
        <h2 className="text-xl font-bold text-gray-800 mb-4">Urgent Complaints</h2>
        <div className="space-y-4">{renderList(urgent)}</div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-gray-800 mb-4">Important Complaints</h2>
        <div className="space-y-4">{renderList(important)}</div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-gray-800 mb-4">Can Wait</h2>
        <div className="space-y-4">{renderList(canWait)}</div>
      </section>
    </div>
  );
}

// app/dashboard/page.tsx
"use client";

import { ComplaintCard } from "@/components/customs/gov/complaint-card";
import { complaints } from "./data";

export default function ComplaintsDashboardPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-black mb-6">Submitted Complaints</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {complaints.map((complaint) => (
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
        ))}
      </div>
    </div>
  );
}

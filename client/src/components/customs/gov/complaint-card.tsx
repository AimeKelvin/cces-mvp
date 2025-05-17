// components/customs/gov/complaint-card.tsx
import React from "react";
import Link from "next/link";

interface Props {
  id: string;
  name: string;
  email: string;
  category: string;
  message: string;
  submittedAt: string;
  status: string;
}

export const ComplaintCard = ({
  id,
  name,
  email,
  category,
  message,
  submittedAt,
  status,
}: Props) => {
  return (
    <Link
      href={`/government/dashboard/complaint/${id}`}
      className="block bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
    >
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">{category}</h2>
        <span className="text-sm text-gray-500">{submittedAt}</span>
      </div>
      <p className="text-sm text-gray-700 mb-2">{message}</p>
      <p className="text-sm text-gray-600">
        Submitted by: {name || "Anonymous"} ({email})
      </p>
      <p
        className={`mt-2 inline-block px-2 py-1 rounded text-xs font-medium ${
          status === "Pending"
            ? "bg-yellow-100 text-yellow-800"
            : status === "Resolved"
            ? "bg-green-100 text-green-800"
            : "bg-blue-100 text-blue-800"
        }`}
      >
        {status}
      </p>
    </Link>
  );
};

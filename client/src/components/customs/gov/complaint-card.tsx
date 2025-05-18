import React from "react";
import Link from "next/link";

interface Location {
  city: string;
  district: string;
  sector: string;
}

interface Props {
  id: string;
  name: string;
  email: string;
  category: string;
  message: string;
  submittedAt: string;
  status: string;
  location: Location;
}

export const ComplaintCard = ({
  id,
  name,
  email,
  category,
  message,
  submittedAt,
  status,
  location,
}: Props) => {
  return (
    <Link href={`/government/dashboard/complaint/${id}`} className="block">
      <div className="bg-white dark:bg-muted border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-sm hover:shadow-md transition">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{category}</h2>
          <span className="text-sm text-gray-500 dark:text-gray-400">{submittedAt}</span>
        </div>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">{message}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
          Submitted by: {name || "Anonymous"} ({email})
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          Location: {location?.sector || "Unknown"}
        </p>
        <p
          className={`mt-2 inline-block px-2 py-1 rounded text-xs font-medium ${
            status === "Pending"
              ? "bg-yellow-100 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-100"
              : status === "Resolved"
              ? "bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100"
              : "bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100"
          }`}
        >
          {status}
        </p>
      </div>
    </Link>
  );
};

// app/complaint/[id]/page.tsx
import { complaints } from "../../data";
import { notFound } from "next/navigation";

interface Params {
  params: {
    id: string;
  };
}

export default function ComplaintDetailPage({ params }: Params) {
  const complaint = complaints.find((c) => c.id === params.id);

  if (!complaint) {
    return notFound();
  }

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-4 bg-white dark:bg-muted rounded-xl shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        {complaint.category}
      </h1>
      
      <p className="text-gray-700 dark:text-gray-300">{complaint.message}</p>

      <div className="text-sm text-gray-600 dark:text-gray-200">
        Submitted by: {complaint.name} ({complaint.email})
      </div>

      <div className="text-sm text-gray-600 dark:text-gray-200">
        Submitted on: {complaint.submittedAt}
      </div>

      <div
        className={`inline-block px-3 py-1 rounded text-xs font-medium ${
          complaint.status === "Pending"
            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100"
            : complaint.status === "Resolved"
            ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
            : "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100"
        }`}
      >
        {complaint.status}
      </div>

      {/* Response Section */}
      <div className="mt-6">
        <label
          htmlFor="response"
          className="block font-medium text-gray-800 dark:text-gray-200 mb-1"
        >
          Response
        </label>
        <textarea
          id="response"
          className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-muted text-gray-900 dark:text-gray-100 rounded p-2"
          rows={5}
          placeholder="Write your response to the citizen here..."
        ></textarea>
        <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
          Send Response
        </button>
      </div>
    </div>
  );
}

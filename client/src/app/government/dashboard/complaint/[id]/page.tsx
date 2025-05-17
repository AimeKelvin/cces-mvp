// app/complaint/[id]/page.tsx
import { complaints } from "../../data"; // or wherever your complaints data is
import { notFound } from "next/navigation";

interface Params {
  params: {
    id: string;
  };
}

export default function ComplaintDetailPage({ params }: Params) {
  const complaint = complaints.find((c) => c.id === params.id);

  if (!complaint) {
    return notFound(); // Show 404 if complaint not found
  }

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">{complaint.category}</h1>
      <p className="text-gray-700">{complaint.message}</p>
      <div className="text-sm text-gray-500">
        Submitted by: {complaint.name} ({complaint.email})
      </div>
      <div className="text-sm text-gray-500">Submitted on: {complaint.submittedAt}</div>
      <div
        className={`inline-block px-3 py-1 rounded text-xs font-medium ${
          complaint.status === "Pending"
            ? "bg-yellow-100 text-yellow-800"
            : complaint.status === "Resolved"
            ? "bg-green-100 text-green-800"
            : "bg-blue-100 text-blue-800"
        }`}
      >
        {complaint.status}
      </div>

      {/* Optional: Add a textarea to answer */}
      <div className="mt-6">
        <label htmlFor="response" className="block font-medium mb-1">
          Response
        </label>
        <textarea
          id="response"
          className="w-full border rounded p-2"
          rows={5}
          placeholder="Write your response to the citizen here..."
        ></textarea>
        <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Send Response
        </button>
      </div>
    </div>
  );
}

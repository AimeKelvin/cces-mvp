"use client";

import { useEffect, useState } from "react";
import { complaints } from "@/lib/data";

import { notFound } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Params {
  params: {
    id: string;
  };
}

type Complaint = {
  id: string;
  name: string;
  email: string;
  category: string;
  phone: string;
  address: string;
  message: string;
  submittedAt: string;
  location: string;
  image: string;
  status: string;
  response: string | null;
};

// Placeholder for future API integration
const fetchComplaintById = async (id: string): Promise<Complaint | null> => {
  const complaint = complaints.find((c) => c.id === id);
  return Promise.resolve(complaint || null);
};

// Placeholder for updating complaint (simulates API PATCH)
const updateComplaint = async (id: string, updates: Partial<Complaint>): Promise<void> => {
  const index = complaints.findIndex((c) => c.id === id);
  if (index !== -1) {
    complaints[index] = { ...complaints[index], ...updates };
  }
  // Replace with actual API call, e.g.:
  // await fetch(`/api/complaints/${id}`, {
  //   method: "PATCH",
  //   body: JSON.stringify(updates),
  // });
};

export default function ComplaintDetailPage({ params }: Params) {
  const [complaint, setComplaint] = useState<Complaint | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [responseText, setResponseText] = useState("");
  const [status, setStatus] = useState<string>("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchComplaintById(params.id)
      .then((data) => {
        if (!data) {
          notFound();
        }
        setComplaint(data);
        setStatus(data.status);
        setResponseText(data.response || "");
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching complaint:", error);
        notFound();
      });
  }, [params.id]);

  const handleSave = async () => {
    if (!complaint || isSaving) return;

    setIsSaving(true);
    setSaveMessage(null);

    try {
      const updates: Partial<Complaint> = {
        status,
        response: responseText || null,
      };
      await updateComplaint(complaint.id, updates);
      setComplaint({ ...complaint, ...updates });
      setSaveMessage("Changes saved successfully!");
      setTimeout(() => setSaveMessage(null), 3000);
    } catch (error) {
      console.error("Error saving changes:", error);
      setSaveMessage("Failed to save changes. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 max-w-2xl mx-auto text-center text-gray-500 dark:text-gray-400 text-xl font-semibold">
        Loading complaint...
      </div>
    );
  }

  if (!complaint) {
    return notFound();
  }

  const statusStyles = {
    Pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100",
    Resolved: "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100",
    "In Progress": "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100",
    Rejected: "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100",
  };

  const isResponseSet = complaint.response !== null;

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-4 bg-white dark:bg-muted rounded-xl shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        {complaint.category}
      </h1>

      <p className="text-gray-700 dark:text-gray-300">{complaint.message}</p>

      <div className="grid grid-cols-1 gap-4 text-sm text-gray-600 dark:text-gray-200">
        <div>
          <span className="font-medium">Submitted by:</span> {complaint.name} ({complaint.email})
        </div>
        <div>
          <span className="font-medium">Submitted on:</span> {complaint.submittedAt}
        </div>
        <div>
          <span className="font-medium">Location:</span> {complaint.location}
        </div>
        {complaint.phone && (
          <div>
            <span className="font-medium">Phone:</span> {complaint.phone}
          </div>
        )}
        {complaint.address && (
          <div>
            <span className="font-medium">Address:</span> {complaint.address}
          </div>
        )}
        {complaint.image && (
          <div>
            <img
              src={complaint.image}
              alt="Complaint attachment"
              className="max-w-full h-auto rounded-lg mt-2"
            />
          </div>
        )}
      </div>

      {/* Status Selector */}
      <div>
        <label className="block font-medium text-gray-800 dark:text-gray-200 mb-1">
          Status
        </label>
        <Select
          value={status}
          onValueChange={setStatus}
          disabled={isResponseSet || isSaving}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Complaint Status</SelectLabel>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Resolved">Resolved</SelectItem>
              <SelectItem value="Rejected">Rejected</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        {isResponseSet && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Status cannot be changed after a response is set.
          </p>
        )}
      </div>

      <div
        className={`inline-block px-3 py-1 rounded text-xs font-medium ${
          statusStyles[complaint.status as keyof typeof statusStyles] || "bg-gray-100 text-gray-800"
        }`}
      >
        {complaint.status}
      </div>

      {/* Official Response */}
      {complaint.response && (
        <div className="mt-6">
          <label className="block font-medium text-gray-800 dark:text-gray-200 mb-1">
            Official Response
          </label>
          <div className="w-full p-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-gray-700 dark:text-gray-300">
            {complaint.response}
          </div>
        </div>
      )}

      {/* Response Section */}
      {!isResponseSet && (
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
            value={responseText}
            onChange={(e) => setResponseText(e.target.value)}
            disabled={isSaving}
          ></textarea>
          <button
            onClick={handleSave}
            disabled={isSaving || !responseText.trim()}
            className={`mt-2 px-4 py-2 rounded text-white ${
              isSaving || !responseText.trim()
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            }`}
          >
            {isSaving ? "Saving..." : "Send Response"}
          </button>
        </div>
      )}

      {/* Save Feedback */}
      {saveMessage && (
        <div
          className={`mt-4 p-2 rounded text-sm ${
            saveMessage.includes("Failed")
              ? "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100"
              : "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
          }`}
        >
          {saveMessage}
        </div>
      )}
    </div>
  );
}
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { complaints } from "@/lib/data"; // Make sure this path is correct
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

const fetchComplaintById = async (id: string): Promise<Complaint | null> => {
  const complaint = complaints.find((c) => c.id === id);
  return Promise.resolve(complaint || null);
};

const updateComplaint = async (id: string, updates: Partial<Complaint>): Promise<void> => {
  const index = complaints.findIndex((c) => c.id === id);
  if (index !== -1) {
    complaints[index] = { ...complaints[index], ...updates };
  }
};

export default function ComplaintDetailPage() {
  const { id } = useParams();
  const [complaint, setComplaint] = useState<Complaint | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [responseText, setResponseText] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!id || typeof id !== "string") return;
    fetchComplaintById(id)
      .then((data) => {
        if (data) {
          setComplaint(data);
          setStatus(data.status);
          setResponseText(data.response || "");
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error loading complaint:", err);
        setIsLoading(false);
      });
  }, [id]);

  const handleSave = async () => {
    if (!complaint || isSaving) return;
    setIsSaving(true);
    setSaveMessage(null);

    try {
      await updateComplaint(complaint.id, {
        status,
        response: responseText || null,
      });
      setComplaint({ ...complaint, status, response: responseText || null });
      setSaveMessage("Changes saved successfully!");
    } catch (err) {
      console.error(err);
      setSaveMessage("Failed to save changes.");
    } finally {
      setIsSaving(false);
      setTimeout(() => setSaveMessage(null), 3000);
    }
  };

  if (isLoading) return <div className="p-4 text-center">Loading...</div>;
  if (!complaint) return <div className="p-4 text-center text-red-500">Complaint not found.</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-4 bg-white dark:bg-muted rounded-xl shadow">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{complaint.category}</h1>
      <p className="text-gray-700 dark:text-gray-300">{complaint.message}</p>

      <div className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
        <div><strong>Submitted by:</strong> {complaint.name} ({complaint.email})</div>
        <div><strong>Location:</strong> {complaint.location}</div>
        <div><strong>Date:</strong> {complaint.submittedAt}</div>
        {complaint.phone && <div><strong>Phone:</strong> {complaint.phone}</div>}
        {complaint.address && <div><strong>Address:</strong> {complaint.address}</div>}
        {complaint.image && (
          <div className="mt-2">
            <img src={complaint.image} alt="Attachment" className="rounded w-full max-w-md" />
          </div>
        )}
      </div>

      <div>
        <label className="block font-medium mb-1">Status</label>
        <Select value={status} onValueChange={setStatus} disabled={!!complaint.response || isSaving}>
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
      </div>

      {!complaint.response ? (
        <div>
          <label htmlFor="response" className="block font-medium mb-1">Response</label>
          <textarea
            id="response"
            className="w-full border rounded p-2"
            rows={4}
            value={responseText}
            onChange={(e) => setResponseText(e.target.value)}
            disabled={isSaving}
          />
          <button
            onClick={handleSave}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
            disabled={isSaving || !responseText.trim()}
          >
            {isSaving ? "Saving..." : "Send Response"}
          </button>
        </div>
      ) : (
        <div className="mt-4">
          <label className="block font-medium mb-1">Official Response</label>
          <div className="p-2 border rounded bg-gray-100 dark:bg-gray-800">
            {complaint.response}
          </div>
        </div>
      )}

      {saveMessage && (
        <div
          className={`p-2 text-sm rounded ${
            saveMessage.includes("Failed")
              ? "bg-red-100 text-red-800"
              : "bg-green-100 text-green-800"
          }`}
        >
          {saveMessage}
        </div>
      )}
    </div>
  );
}

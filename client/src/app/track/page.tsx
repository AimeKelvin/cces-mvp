"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BadgeCheck, Hourglass, XCircle } from "lucide-react";
import Navbar from "@/components/ui/Navbar";

const mockComplaint = {
  ticketId: "TKT-164568",
  title: "Broken streetlight on KK 12 Ave",
  description: "The streetlight near the bus stop has been broken for over a week. It gets very dark at night, making it unsafe.",
  dateSubmitted: "2025-05-14",
  status: "In Progress",
  response: "We have dispatched a maintenance team. Expected resolution within 3 business days.",
  organization: "Kigali City Infrastructure Department",
  citizen: {
    name: "John Doe",
  }
};

export default function TrackPage() {
  const [ticketId, setTicketId] = useState("");
  const [complaint, setComplaint] = useState<any | null>(null);

  const handleTrack = () => {
    if (ticketId === mockComplaint.ticketId) {
      setComplaint(mockComplaint);
    } else {
      setComplaint(null);
      alert("Complaint not found. Please check your Ticket ID.");
    }
  };

  const statusColor = {
    "Pending": "bg-yellow-100 text-yellow-700",
    "In Progress": "bg-blue-100 text-blue-700",
    "Resolved": "bg-green-100 text-green-700",
    "Rejected": "bg-red-100 text-red-700"
  };

  const statusIcon = {
    "Pending": <Hourglass className="w-5 h-5 text-yellow-600" />,
    "In Progress": <Hourglass className="w-5 h-5 animate-spin text-blue-600" />,
    "Resolved": <BadgeCheck className="w-5 h-5 text-green-600" />,
    "Rejected": <XCircle className="w-5 h-5 text-red-600" />,
  };

  return (
    <>
      <Navbar />
      <section className="max-w-5xl mx-auto px-4 py-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-10">Track Your Complaint</h1>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-12">
          <Input
            placeholder="Enter your Ticket ID"
            value={ticketId}
            onChange={(e) => setTicketId(e.target.value)}
            className="w-full sm:max-w-md"
          />
          <Button onClick={handleTrack} className="bg-green-600 text-white border border-gray-500">Track</Button>
        </div>

        {complaint && (
          <div className="bg-white rounded-xl shadow-md p-6 md:p-8 space-y-6">
            {/* Ticket Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-xl font-semibold text-gray-800">Ticket ID: {complaint.ticketId}</h2>
              <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${statusColor[complaint.status as keyof typeof statusColor]}`}>
                {statusIcon[complaint.status as keyof typeof statusIcon]}
                {complaint.status}
              </div>
            </div>

            {/* Complaint Detail */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-800">
              <div>
                <p className="text-sm text-gray-500">Title</p>
                <p className="font-medium">{complaint.title}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Submitted On</p>
                <p className="font-medium">{complaint.dateSubmitted}</p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-sm text-gray-500">Description</p>
                <p className="mt-1 text-gray-700">{complaint.description}</p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-sm text-gray-500">Responsible Organization</p>
                <p className="mt-1 font-medium">{complaint.organization}</p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-sm text-gray-500">Official Response</p>
                <div className="mt-1 p-4 bg-gray-50 border border-gray-200 rounded-lg text-gray-700">
                  {complaint.response}
                </div>
              </div>
              <div className="sm:col-span-2">
                <p className="text-sm text-gray-500">Submitted By</p>
                <p className="mt-1 font-medium">{complaint.citizen.name} ({complaint.citizen.email})</p>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}

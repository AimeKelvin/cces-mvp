"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BadgeCheck, Hourglass, XCircle } from "lucide-react";
import Navbar from "@/components/customs/citizen/Navbar";
import Footer from "@/components/ui/Footer";

const mockComplaint = {
  ticketId: "TKT-164568",
  title: "Broken streetlight on KK 12 Ave",
  description:
    "The streetlight near the bus stop has been broken for over a week. It gets very dark at night, making it unsafe.",
  dateSubmitted: "2025-05-14",
  status: "In Progress",
  response:
    "We have dispatched a maintenance team. Expected resolution within 3 business days.",
  organization: "Kigali City Infrastructure Department",
  citizen: {
    name: "John Doe",
    email: "john@example.com",
  },
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
    Pending: "bg-yellow-100 text-yellow-700",
    "In Progress": "bg-blue-100 text-blue-700",
    Resolved: "bg-green-100 text-green-700",
    Rejected: "bg-red-100 text-red-700",
  };

  const statusIcon = {
    Pending: <Hourglass className="w-5 h-5 text-yellow-600" />,
    "In Progress": (
      <Hourglass className="w-5 h-5 animate-spin text-blue-600" />
    ),
    Resolved: <BadgeCheck className="w-5 h-5 text-green-600" />,
    Rejected: <XCircle className="w-5 h-5 text-red-600" />,
  };

  return (
    <>
      <Navbar />
      <section className="max-w-5xl mx-auto px-4 py-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12">
          Track Your Complaint
        </h1>

        {/* Input Area */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-10">
          <Input
            placeholder="Enter your Ticket ID"
            value={ticketId}
            onChange={(e) => setTicketId(e.target.value)}
            className="w-full sm:max-w-md text-lg"
          />
          <Button
            onClick={handleTrack}
            className="w-full sm:w-auto px-8 py-3 text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
          
          >
            Track
          </Button>
        </div>

        {/* Complaint Details */}
        {complaint && (
          <div className="bg-white max-w-3xl mx-auto rounded-xl shadow-lg p-6 sm:p-8 space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-2xl font-semibold text-gray-800">
                Ticket ID: {complaint.ticketId}
              </h2>
              <div
                className={`flex items-center gap-2 px-3 py-1 rounded-full text-base font-medium ${statusColor[
                  complaint.status as keyof typeof statusColor
                ]}`}
              >
                {statusIcon[complaint.status as keyof typeof statusIcon]}
                {complaint.status}
              </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-800 text-base">
              <div>
                <p className="text-gray-500 font-medium">Title</p>
                <p>{complaint.title}</p>
              </div>
              <div>
                <p className="text-gray-500 font-medium">Submitted On</p>
                <p>{complaint.dateSubmitted}</p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-gray-500 font-medium">Description</p>
                <p className="mt-1 text-gray-700">{complaint.description}</p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-gray-500 font-medium">
                  Responsible Organization
                </p>
                <p className="mt-1">{complaint.organization}</p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-gray-500 font-medium">Official Response</p>
                <div className="mt-1 p-4 bg-gray-50 border border-gray-200 rounded-lg text-gray-700">
                  {complaint.response}
                </div>
              </div>
              <div className="sm:col-span-2">
                <p className="text-gray-500 font-medium">Submitted By</p>
                <p className="mt-1">
                  {complaint.citizen.name} ({complaint.citizen.email})
                </p>
              </div>
            </div>
          </div>
        )}
      </section>
      <Footer />
    </>
  );
}

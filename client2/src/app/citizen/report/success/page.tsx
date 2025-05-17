"use client";

import { CheckCircle, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import Footer from "@/components/ui/Footer";

export default function ReportSuccessPage() {
  const ticketId = "TKT-164568";
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(ticketId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <>
    <section className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white p-8 sm:p-10 rounded-xl shadow-md w-full max-w-xl text-center border">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
          Submit a Complaint
        </h1>

        <div className="text-green-600 text-lg font-semibold mb-1">
          Complaint Submitted Successfully
        </div>
        <p className="text-gray-600 mb-6">
          Your complaint has been received and is being processed.
        </p>

        <div className="flex justify-center mb-6">
          <div className="bg-green-100 rounded-full p-3">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>

        {/* Ticket ID with Copy */}
        <div className="bg-gray-100 p-4 rounded-md mb-4 flex items-center justify-between">
          <div className="text-left">
            <p className="text-sm text-gray-500 mb-1">Your Ticket ID</p>
            <p className="text-xl font-semibold text-gray-800">{ticketId}</p>
          </div>
          <button
            onClick={handleCopy}
            className="ml-4 text-gray-600 hover:text-blue-600 transition"
            aria-label="Copy Ticket ID"
          >
            {copied ? <Check className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5" />}
          </button>
        </div>

        <p className="text-gray-500 text-sm mb-6">
          Please save your ticket ID for tracking the status of your complaint.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href={`/report/track?ticketId=${ticketId}`}>
            <Button variant="outline" className="w-full sm:w-auto">
              Track Complaint
            </Button>
          </Link>
          <Link href="/">
            <Button className="w-full sm:w-auto bg-green-700 hover:bg-green-800 text-white">
              Return Home
            </Button>
          </Link>
        </div>
      </div>
    </section>
    <Footer />
    </>
  );
}
``

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/customs/citizen/Navbar";
import Footer from "@/components/ui/Footer";
import { postComplaint } from "@/lib/api";
import { CheckCircle, Copy, Check } from "lucide-react";
import Link from "next/link";

export default function ReportPage() {
  const [formData, setFormData] = useState({
    senderName: "",
    title: "",
    description: "",
    city: "",
    district: "",
    sector: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ticketId, setTicketId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCopy = async () => {
    if (!ticketId) return;
    try {
      await navigator.clipboard.writeText(ticketId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await postComplaint({
        title: formData.title,
        description: formData.description,
        senderName: formData.senderName,
        location: {
          city: formData.city,
          district: formData.district,
          sector: formData.sector,
        },
      });

      setTicketId(response.ticketId);
    } catch (error) {
      alert("Failed to submit complaint. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <section className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
        {!ticketId ? (
          <>
            <h1 className="text-3xl font-bold text-green-700 text-center mb-4">Report an Issue</h1>
            <p className="text-gray-600 text-center mb-8">
              Help us serve you better. Fill out the form below to report a public issue.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl shadow-md border">
              <div>
                <Label htmlFor="senderName">Your Name</Label>
                <Input id="senderName" name="senderName" value={formData.senderName} onChange={handleChange} required />
              </div>

              <div>
                <Label htmlFor="title">Complaint Title</Label>
                <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={5}
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input id="city" name="city" value={formData.city} onChange={handleChange} required />
                </div>
                <div>
                  <Label htmlFor="district">District</Label>
                  <Input id="district" name="district" value={formData.district} onChange={handleChange} required />
                </div>
                <div>
                  <Label htmlFor="sector">Sector</Label>
                  <Input id="sector" name="sector" value={formData.sector} onChange={handleChange} required />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 ${
                  isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-green-700 hover:bg-green-800 text-white"
                }`}
              >
                {isSubmitting ? "Submitting..." : "Submit Complaint"}
              </Button>
            </form>
          </>
        ) : (
          <div className="bg-white p-8 sm:p-10 rounded-xl shadow-md border text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
              Complaint Submitted Successfully
            </h2>
            <div className="flex justify-center mb-6">
              <div className="bg-green-100 rounded-full p-3">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </div>
            <p className="text-gray-600 mb-6">
              Your complaint has been received and is being processed.
            </p>

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
              <Link href={`/citizen/track`}>
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
        )}
      </section>
      <Footer />
    </>
  );
}

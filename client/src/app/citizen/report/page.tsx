"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin } from "lucide-react";
import Navbar from "@/components/customs/citizen/Navbar";
import Footer from "@/components/ui/Footer";
import { postComplaint } from "@/lib/api";

export default function ReportIssuePage() {
  const [formData, setFormData] = useState({
    senderName: "",
    title: "",
    description: "",
    city: "",
    district: "",
    sector: "",
  });

  const [submitMessage, setSubmitMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      await postComplaint({
        title: formData.title,
        description: formData.description,
        senderName: formData.senderName,
        location: {
          city: formData.city,
          district: formData.district,
          sector: formData.sector,
        },
      });

      setSubmitMessage("Complaint submitted successfully!");
      setFormData({
        senderName: "",
        title: "",
        description: "",
        city: "",
        district: "",
        sector: "",
      });
    } catch (error) {
      setSubmitMessage("Failed to submit complaint. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <section className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="text-3xl font-bold text-green-700 text-center mb-4">Report an Issue</h1>
        <p className="text-gray-600 text-center mb-8">
          Help us serve you better. Fill out the form below to report a public issue.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl shadow-md border border-gray-300">
          <div>
            <Label htmlFor="senderName">Your Name</Label>
            <Input
              id="senderName"
              name="senderName"
              value={formData.senderName}
              onChange={handleChange}
              placeholder="e.g. Jean Mukasa"
              required
            />
          </div>

          <div>
            <Label htmlFor="title">Complaint Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Broken water pipe in Nyamirambo"
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={5}
              placeholder="Explain the issue clearly..."
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="e.g. Kigali"
                required
              />
            </div>
            <div>
              <Label htmlFor="district">District</Label>
              <Input
                id="district"
                name="district"
                value={formData.district}
                onChange={handleChange}
                placeholder="e.g. Nyarugenge"
                required
              />
            </div>
            <div>
              <Label htmlFor="sector">Sector</Label>
              <Input
                id="sector"
                name="sector"
                value={formData.sector}
                onChange={handleChange}
                placeholder="e.g. Nyamirambo"
                required
              />
            </div>
          </div>

          <div className="pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className={`w-full text-white py-3 ${
                isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-green-700 hover:bg-green-800"
              }`}
            >
              {isSubmitting ? "Submitting..." : "Submit Complaint"}
            </Button>
          </div>

          {submitMessage && (
            <div
              className={`mt-4 p-3 text-sm rounded ${
                submitMessage.includes("Failed")
                  ? "bg-red-100 text-red-800"
                  : "bg-green-100 text-green-800"
              }`}
            >
              {submitMessage}
            </div>
          )}
        </form>
      </section>
      <Footer />
    </>
  );
}

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, UploadCloud } from "lucide-react";
import Navbar from "@/components/customs/citizen/Navbar";
import Footer from "@/components/ui/Footer";
import { complaints } from "@/lib/data";

export default function ReportIssuePage() {
  const [formData, setFormData] = useState({
    category: "",
    message: "",
    location: "",
    address: "",
    image: null as File | null,
    name: "",
    phone: "",
    email: "",
  });
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, image: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      // Generate unique ID (e.g., TKT- + timestamp)
      const id = `TKT-${Date.now()}`;
      // Current date in YYYY-MM-DD format
      const submittedAt = new Date().toISOString().split("T")[0];
      // Simulate image URL (in production, upload to server and get URL)
      const imageUrl = formData.image ? `https://example.com/uploads/${id}.jpg` : "";

      const newComplaint = {
        id,
        name: formData.name,
        email: formData.email || "",
        category: formData.category,
        phone: formData.phone,
        address: formData.address || formData.location, // Fallback to location if address is empty
        message: formData.message,
        submittedAt,
        location: formData.location,
        image: imageUrl,
        status: "Pending",
        response: null,
      };

      // Simulate adding to complaints array
      complaints.push(newComplaint);

      // Placeholder for API call
      // await fetch("/api/complaints", {
      //   method: "POST",
      //   body: JSON.stringify(newComplaint),
      //   headers: { "Content-Type": "application/json" },
      // });

      // Reset form
      setFormData({
        category: "",
        message: "",
        location: "",
        address: "",
        image: null,
        name: "",
        phone: "",
        email: "",
      });

      setSubmitMessage("Complaint submitted successfully!");
      setTimeout(() => setSubmitMessage(null), 3000);
    } catch (error) {
      console.error("Error submitting complaint:", error);
      setSubmitMessage("Failed to submit complaint. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-green-700 mb-6 text-center">
          Report a Public Issue
        </h1>
        <p className="text-gray-600 text-center mb-10">
          Fill out the form below to report any public issue you’ve observed. We’ll follow up as soon as possible.
        </p>

        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-xl p-6 space-y-6 border border-gray-400">
          {/* Full Name */}
          <div>
            <Label htmlFor="name" className="text-sm font-medium text-gray-700">
              Full Name
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="e.g., Jane Doe"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-2 border-gray-500"
            />
          </div>

          {/* Phone & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                Phone Number
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="e.g., +250 780 000 000"
                value={formData.phone}
                onChange={handleChange}
                required
                className="mt-2 border-gray-500"
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email (optional)
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="e.g., you@example.com"
                value={formData.email}
                onChange={handleChange}
                className="mt-2 border-gray-500"
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <Label htmlFor="category" className="text-sm font-medium text-gray-700">
              Category of the Issue
            </Label>
            <Input
              id="category"
              name="category"
              type="text"
              placeholder="e.g., Road Infrastructure"
              value={formData.category}
              onChange={handleChange}
              required
              className="mt-2 border-gray-500"
            />
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="message" className="text-sm font-medium text-gray-700">
              Detailed Description
            </Label>
            <Textarea
              id="message"
              name="message"
              rows={5}
              placeholder="Describe the issue clearly with relevant details..."
              value={formData.message}
              onChange={handleChange}
              required
              className="mt-2 border-gray-500"
            />
          </div>

          {/* Location */}
          <div>
            <Label htmlFor="location" className="text-sm font-medium text-gray-700">
              Location
            </Label>
            <div className="relative mt-2">
              <Input
                id="location"
                name="location"
                type="text"
                placeholder="e.g., KG 7 Ave, Kigali"
                value={formData.location}
                onChange={handleChange}
                required
                className="pl-10 border-gray-500"
              />
              <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            </div>
          </div>

          {/* Address */}
          <div>
            <Label htmlFor="address" className="text-sm font-medium text-gray-700">
              Address (optional)
            </Label>
            <Input
              id="address"
              name="address"
              type="text"
              placeholder="e.g., Gasabo, Kigali, Rwanda"
              value={formData.address}
              onChange={handleChange}
              className="mt-2 border-gray-500"
            />
          </div>

          {/* Image Upload */}
          <div>
            <Label htmlFor="image" className="text-sm font-medium text-gray-700">
              Upload an Image (optional)
            </Label>
            <div className="mt-2 flex items-center gap-3">
              <label
                htmlFor="image"
                className="cursor-pointer flex items-center gap-2 text-sm text-green-700 hover:text-green-800"
              >
                <UploadCloud className="w-5 h-5" />
                {formData.image ? formData.image.name : "Upload Image"}
              </label>
              <input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
              {formData.image && (
                <span className="text-xs text-gray-500 truncate">{formData.image.name}</span>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className={`w-full text-white text-sm py-3 transition ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-700 hover:bg-green-800"
              }`}
            >
              {isSubmitting ? "Submitting..." : "Submit Report"}
            </Button>
          </div>

          {/* Submission Feedback */}
          {submitMessage && (
            <div
              className={`mt-4 p-2 rounded text-sm ${
                submitMessage.includes("Failed")
                  ? "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100"
                  : "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
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
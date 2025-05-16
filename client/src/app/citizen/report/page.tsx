"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, UploadCloud } from "lucide-react";
import Navbar from "@/components/customs/citizen/Navbar";
import Footer from "@/components/ui/Footer";
export default function ReportIssuePage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    image: null as File | null,
    fullName: "",
    phone: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, image: file }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // TODO: Submit to backend
  };

  return (
    <>
    <Navbar/>
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
          <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">
            Full Name
          </Label>
          <Input
            id="fullName"
            name="fullName"
            type="text"
            placeholder="e.g., Jane Doe"
            value={formData.fullName}
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

        {/* Title */}
        <div>
          <Label htmlFor="title" className="text-sm font-medium text-gray-700">
            Title of the Issue
          </Label>
          <Input
            id="title"
            name="title"
            type="text"
            placeholder="e.g., Broken Streetlight on 5th Avenue"
            value={formData.title}
            onChange={handleChange}
            required
            className="mt-2 border-gray-500"
          />
        </div>

        {/* Description */}
        <div>
          <Label htmlFor="description" className="text-sm font-medium text-gray-700">
            Detailed Description
          </Label>
          <Textarea
            id="description"
            name="description"
            rows={5}
            placeholder="Describe the issue clearly with relevant details..."
            value={formData.description}
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
            className="w-full bg-green-700 text-white text-sm py-3 hover:bg-green-800 transition"
          >
            Submit Report
          </Button>
        </div>
      </form>
    </section>
    <Footer/>
    </>
  );
}

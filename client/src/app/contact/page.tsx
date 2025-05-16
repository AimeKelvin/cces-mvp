"use client";

import Navbar from "@/components/ui/Navbar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 py-16">
        {/* Page Heading */}
        <section className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Get in Touch</h1>
          <p className="text-gray-600 max-w-xl mx-auto text-lg">
            We're here to help. Contact us with questions, suggestions, or support needs.
          </p>
        </section>

        {/* Form + Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <form className="space-y-6 bg-white p-6 rounded-2xl shadow-md border border-gray-100">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <Input type="text" placeholder="John Doe" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <Input type="email" placeholder="you@example.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <Textarea rows={5} placeholder="Type your message..." />
            </div>
            <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white w-full">
              Send Message
            </Button>
          </form>

          {/* Contact Information */}
          <div className="space-y-8 text-gray-700">
            <div>
              <h2 className="text-xl font-semibold mb-2">Contact Information</h2>
              <p className="text-md">
                <span className="font-medium">Email:</span> support@yourapp.com
              </p>
              <p className="text-md mt-2">
                <span className="font-medium">Phone:</span> +250 788 123 456
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Office Location</h2>
              <p>Kigali, Rwanda</p>
              <p className="text-gray-500 text-sm">KK 776 St, Gasabo District</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Working Hours</h2>
              <p>Monday - Friday: 8:00 AM - 5:00 PM</p>
              <p>Saturday & Sunday: Closed</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

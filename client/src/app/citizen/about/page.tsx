"use client";

import Navbar from "@/components/customs/citizen/Navbar";
import Footer from "@/components/ui/Footer";
export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-16 space-y-16">
        {/* Header Section */}
        <section className="text-center space-y-4">
          <h1 className="text-4xl font-bold">About Us</h1>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            We're dedicated to making government services more transparent, accessible, and accountable by empowering citizens to raise and track civic concerns with ease.
          </p>
        </section>

        {/* Mission + Vision */}
        <section className="grid md:grid-cols-2 gap-10 text-gray-800">
          <div className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-md transition">
            <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
            <p>
              To create a simple and secure platform where citizens can report civic issues, follow up on responses, and contribute to a more accountable and responsive government.
            </p>
          </div>
          <div className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-md transition">
            <h2 className="text-2xl font-semibold mb-2">Our Vision</h2>
            <p>
              A society where every voice is heard, complaints are resolved transparently, and public institutions actively serve and engage with citizens in real-time.
            </p>
          </div>
        </section>

        {/* Core Values */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-10">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Transparency", desc: "Open updates, clear communication, and visible tracking of complaints." },
              { title: "Efficiency", desc: "Quick response times and simple steps to report and resolve issues." },
              { title: "Empowerment", desc: "Giving power back to citizens by letting them raise concerns with ease." },
            ].map((value, index) => (
              <div
                key={index}
                className="bg-white border p-6 rounded-lg shadow-sm hover:shadow-md transition"
              >
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center bg-green-50 py-10 px-6 rounded-xl shadow-sm">
          <h2 className="text-2xl font-bold mb-3">Join Us in Building a More Accountable Society</h2>
          <p className="text-gray-700 max-w-2xl mx-auto mb-5">
            Whether you're a citizen, community leader, or part of a government organization—your voice matters. Let’s work together to improve our cities, one complaint at a time.
          </p>
          <a
            href="/track"
            className="inline-block bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition"
          >
            Start Now
          </a>
        </section>
      </main>
      <Footer />
    </>
  );
}

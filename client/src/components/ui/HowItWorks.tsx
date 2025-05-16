import { ClipboardList, SendHorizonal, Search, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: <ClipboardList className="w-8 h-8 text-green-600" />,
    title: "1. Submit Complaint",
    description: "Describe your issue and submit the complaint form with details and your contact info.",
  },
  {
    icon: <SendHorizonal className="w-8 h-8 text-blue-600" />,
    title: "2. Get Ticket ID",
    description: "After submitting, you’ll receive a unique Ticket ID to track your complaint anytime.",
  },
  {
    icon: <Search className="w-8 h-8 text-yellow-600" />,
    title: "3. Track Progress",
    description: "Use your Ticket ID to track the status, see which organization is handling it, and view official responses.",
  },
  {
    icon: <CheckCircle className="w-8 h-8 text-emerald-600" />,
    title: "4. Resolution",
    description: "Once resolved, you’ll be notified and can see the final update from the responsible authority.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-gray-50 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid gap-8 md:grid-cols-4 sm:grid-cols-2">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition duration-300 text-center"
            >
              <div className="mb-4 flex justify-center">{step.icon}</div>
              <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
              <p className="text-gray-600 text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { BadgeCheck, Hourglass, XCircle } from 'lucide-react';
import Navbar from '@/components/customs/citizen/Navbar';
import Footer from '@/components/ui/Footer';
import { trackComplaint } from '@/lib/api';

type Complaint = {
  status: string;
  response?: string | null;
  assignedTo?: string | null;
  category: string;
  title?: string;
  description: string;
  senderName?: string | null;
  location?: string | null;
  createdAt: string;
  ticketId: string;
};

export default function TrackPage() {
  const [ticketId, setTicketId] = useState('');
  const [complaint, setComplaint] = useState<Complaint | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTrack = async () => {
    if (!ticketId.trim()) {
      setError('Please enter your Ticket ID.');
      return;
    }

    setLoading(true);
    setError('');
    setComplaint(null);

    try {
      const data = await trackComplaint(ticketId.trim());
      if (!data || !data.status) {
        throw new Error('Not found');
      }

      setComplaint({
        ticketId: data.ticketId || ticketId,
        status: data.status,
        response: data.response ?? null,
        assignedTo: data.assignedTo ?? null,
        category: data.category,
        title: data.title,
        description: data.description,
        senderName: data.senderName ?? null,
        location: data.location ?? null,
        createdAt: data.createdAt,
      });
    } catch (err) {
      setError('Complaint not found. Please check your Ticket ID.');
    } finally {
      setLoading(false);
    }
  };

  const statusColor: Record<string, string> = {
    Pending: 'bg-yellow-100 text-yellow-700',
    'In Progress': 'bg-blue-100 text-blue-700',
    Resolved: 'bg-green-100 text-green-700',
    Rejected: 'bg-red-100 text-red-700',
  };

  const statusIcon: Record<string, JSX.Element> = {
    Pending: <Hourglass className="w-5 h-5 text-yellow-600" />,
    'In Progress': <Hourglass className="w-5 h-5 animate-spin text-blue-600" />,
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
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleTrack();
            }}
            disabled={loading}
            autoFocus
            aria-label="Ticket ID"
          />
          <Button
            onClick={handleTrack}
            disabled={loading || !ticketId.trim()}
            className="w-full sm:w-auto px-8 py-3 text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
          >
            {loading ? 'Tracking...' : 'Track'}
          </Button>
        </div>

        {/* Error */}
        {error && (
          <p className="text-center text-red-600 font-medium mb-6">{error}</p>
        )}

        {/* Complaint Details */}
        {complaint && (
          <div className="bg-white max-w-3xl mx-auto rounded-xl shadow-lg p-6 sm:p-8 space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-2xl font-semibold text-gray-800">
                Ticket ID: {complaint.ticketId}
              </h2>
              <div
                className={`flex items-center gap-2 px-3 py-1 rounded-full text-base font-medium ${
                  statusColor[complaint.status] || 'bg-gray-100 text-gray-800'
                }`}
              >
                {statusIcon[complaint.status] || null}
                {complaint.status}
              </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-800 text-base">
              <div>
                <p className="text-gray-500 font-medium">Category</p>
                <p>{complaint.category}</p>
              </div>
              <div>
                <p className="text-gray-500 font-medium">Submitted On</p>
                <p>
                  {complaint.createdAt
                    ? new Date(complaint.createdAt).toLocaleString('en-US', {
                        timeZone: 'Africa/Harare',
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: true,
                      })
                    : 'Unknown'}
                </p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-gray-500 font-medium">Description</p>
                <p className="mt-1 text-gray-700">{complaint.description}</p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-gray-500 font-medium">Submitted By</p>
                <p className="mt-1">
                  {complaint.senderName?.trim() ? complaint.senderName : 'Unknown'}
                </p>
              </div>
              <p className="mt-1">
  {typeof complaint.location === 'object' && complaint.location?.sector
    ? complaint.location.sector
    : 'Unknown'}
</p>

              <div className="sm:col-span-2">
                <p className="text-gray-500 font-medium">Assigned To</p>
                <p className="mt-1">
                  {complaint.assignedTo?.trim() ? complaint.assignedTo : 'Unassigned'}
                </p>
              </div>
              {complaint.response && (
                <div className="sm:col-span-2">
                  <p className="text-gray-500 font-medium">Official Response</p>
                  <div className="mt-1 p-4 bg-gray-50 border border-gray-200 rounded-lg text-gray-700">
                    {complaint.response}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </section>
      <Footer />
    </>
  );
}

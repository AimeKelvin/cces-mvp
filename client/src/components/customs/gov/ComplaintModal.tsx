'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

type Complaint = {
  _id: string;
  title?: string;
  description: string;
  status: string;
  response?: string;
  category: string;
  senderName?: string;
  email?: string;
  location?: string | { sector?: string };
  assignedTo?: string;
  createdAt: string;
};

interface ComplaintModalProps {
  open: boolean;
  onClose: () => void;
  complaint: Complaint | null;
  onRespond: (id: string, response: string) => void;
}

export default function ComplaintModal({
  open,
  onClose,
  complaint,
  onRespond,
}: ComplaintModalProps) {
  const [reply, setReply] = useState('');

  const handleSendResponse = () => {
    if (complaint && reply.trim()) {
      onRespond(complaint._id, reply.trim());
      setReply('');
      onClose();
    }
  };

  if (!complaint) return null;

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleString('en-US', {
      timeZone: 'Africa/Harare',
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Complaint Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 text-gray-800 text-sm">
          <div>
            <p className="font-medium text-gray-500">Category</p>
            <p>{complaint.category}</p>
          </div>

          <div>
            <p className="font-medium text-gray-500">Submitted On</p>
            <p>{formatDate(complaint.createdAt)}</p>
          </div>

          <div>
            <p className="font-medium text-gray-500">Submitted By</p>
            <p>{complaint.senderName?.trim() || 'Anonymous'}</p>
            {complaint.email && (
              <p className="text-sm text-gray-500">({complaint.email})</p>
            )}
          </div>

          <div>
            <p className="font-medium text-gray-500">Location</p>
            <p>
              {typeof complaint.location === 'object'
                ? complaint.location?.sector || 'Unknown'
                : complaint.location || 'Unknown'}
            </p>
          </div>

          <div>
            <p className="font-medium text-gray-500">Status</p>
            <p>{complaint.status}</p>
          </div>

          <div>
            <p className="font-medium text-gray-500">Assigned To</p>
            <p>{complaint.assignedTo?.trim() || 'Unassigned'}</p>
          </div>

          {complaint.title && (
            <div>
              <p className="font-medium text-gray-500">Title</p>
              <p>{complaint.title}</p>
            </div>
          )}

          <div>
            <p className="font-medium text-gray-500">Description</p>
            <p className="text-gray-700">{complaint.description}</p>
          </div>

          {complaint.response && (
            <div>
              <p className="font-medium text-gray-500">Official Response</p>
              <div className="p-3 bg-gray-100 rounded">{complaint.response}</div>
            </div>
          )}
        </div>

        <div className="mt-4 space-y-2">
          <p className="font-medium text-gray-700">Write a Response</p>
          <Input
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            placeholder="Enter your response..."
          />
          <Button
            onClick={handleSendResponse}
            disabled={!reply.trim()}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Submit Response
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

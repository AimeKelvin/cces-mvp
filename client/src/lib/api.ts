// lib/api.ts
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export async function postComplaint(data: {
  title: string;
  description: string;
  senderName: string;
  location: {
    city: string;
    district: string;
    sector: string;
  };
}) {
  try {
    const res = await fetch(`${BASE_URL}/api/complaints`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (!res.ok) throw new Error('Failed to submit complaint');

    return await res.json(); // contains ticketId, message, etc.
  } catch (err) {
    throw err;
  }
}

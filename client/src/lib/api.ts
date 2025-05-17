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
}): Promise<{ ticketId: string; message: string }> {
  try {
    const res = await fetch(`${BASE_URL}/api/complaints`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error('Failed to submit complaint');

    return await res.json(); // must include ticketId
  } catch (err) {
    throw err;
  }
}

export async function trackComplaint(ticketId: string): Promise<{
  title: string;
  description: string;
  senderName: string;
  location: {
    city: string;
    district: string;
    sector: string;
  };
}> {
  const res = await fetch(`${BASE_URL}/api/complaints/track/${ticketId}`);

  if (!res.ok) {
    throw new Error('Complaint not found');
  }

  return await res.json(); // Return the flat response directly
}
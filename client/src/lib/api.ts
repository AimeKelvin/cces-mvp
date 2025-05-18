const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Submit a public complaint
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

    return await res.json();
  } catch (err) {
    throw err;
  }
}

// Track a complaint by ticket ID
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

  return await res.json();
}

// Government User Registration
export async function registerGovernmentUser(data: {
  username: string;
  email: string;
  password: string;
  organization: string;
}): Promise<{ message: string }> {
  const res = await fetch(`${BASE_URL}/api/gov/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Registration failed');
  }

  return await res.json();
}

// Government User Login
export async function loginGovernmentUser(data: {
  email: string;
  password: string;
}): Promise<{ token: string }> {
  const res = await fetch(`${BASE_URL}/api/gov/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Login failed');
  }

  return await res.json();
}

// Fetch assigned complaints for government user
export const fetchGovComplaints = async () => {
  const token = localStorage.getItem("authToken");

  if (!token) {
    throw new Error("No authentication token found.");
  }

  const res = await fetch(`${BASE_URL}/api/gov/complaints`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch complaints.");
  }

  return res.json();
};

// Fetch logged-in government user data
export async function fetchLoggedInGovernmentUser(): Promise<{
  _id: string;
  name: string;
  email: string;
  category: string;
}> {
  const token = localStorage.getItem('authToken');

  if (!token) {
    throw new Error('No authentication token found.');
  }

  const res = await fetch(`${BASE_URL}/api/gov/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    const error = await res.json().catch(() => null);
    throw new Error(error?.message || 'Failed to fetch logged-in user data.');
  }

  return res.json();
}

// Fetch a single complaint by ID for government user
export async function getComplaintById(id: string): Promise<{
  id: string;
  name: string;
  email: string;
  category: string;
  phone: string;
  address: string;
  message: string;
  submittedAt: string;
  location: string;
  image: string;
  status: string;
  response?: string;
}> {
  const token = localStorage.getItem('authToken');

  if (!token) {
    throw new Error('No authentication token found.');
  }

  const res = await fetch(`${BASE_URL}/api/gov/complaints/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    const error = await res.json().catch(() => null);
    throw new Error(error?.message || 'Failed to fetch complaint');
  }

  return res.json();
}
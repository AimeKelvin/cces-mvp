"use client";

import { useEffect, useState } from "react";
import PendingApproval from "@/components/customs/gov/PendingApproval";
import { mockUsers } from "@/lib/mockUsers"; // Import mock data

type User = {
  name: string;
  email: string;
  approved: boolean;
  role?: string;
  category?: string;
};

export default function OrgDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      // Simulate a delay to mimic real fetching
      await new Promise((res) => setTimeout(res, 500));

      // Simulate logged-in user (choose by index or logic)
      const simulatedUser = mockUsers[1]; // Example: Ministry of Finance (unapproved)
      setUser(simulatedUser);
      setLoading(false);
    };

    fetchUser();
  }, []);

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  if (user && !user.approved) return <PendingApproval />;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Welcome to Your Dashboard</h1>
      <p className="text-gray-700">Organization: {user?.name}</p>
      <p className="text-gray-700">Email: {user?.email}</p>
      <p className="text-gray-700">Category: {user?.category}</p>
      <p className="text-gray-700">Role: {user?.role}</p>
    </div>
  );
}

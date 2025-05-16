"use client";

import { Button } from "@/components/ui/button";

export default function PendingApproval() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100 px-4">
      <div className="text-center space-y-6 max-w-md">
        <h1 className="text-4xl font-bold text-blue-800">
          Identity Not Verified Yet
        </h1>
        <p className="text-gray-700 text-md">
          Your account is pending verification by the platform administrator. Once approved, you’ll gain access to the full dashboard.
        </p>
      </div>
    </div>
  );
}

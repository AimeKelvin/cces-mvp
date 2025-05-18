"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { ComplaintCard } from "@/components/customs/gov/complaint-card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Complaint = {
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
};

function classifyComplaint(complaint: Complaint): "urgent" | "important" | "canWait" {
  const content = `${complaint.category} ${complaint.message}`.toLowerCase();
  const urgentKeywords = ["sewage", "fire", "outage", "flood", "explosion"];
  const importantKeywords = ["pothole", "broken", "noise", "vandalism"];

  if (urgentKeywords.some((word) => content.includes(word))) return "urgent";
  if (importantKeywords.some((word) => content.includes(word))) return "important";
  return "canWait";
}

export default function ComplaintsPage() {
  const { token } = useAuth();
  const [allComplaints, setAllComplaints] = useState<Complaint[]>([]);
  const [filteredComplaints, setFilteredComplaints] = useState<Complaint[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<"all" | "urgent" | "important" | "canWait">("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAssignedComplaints = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/complaints/assigned", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch");

        const data = await response.json();
        setAllComplaints(data);
        setFilteredComplaints(data);
      } catch (error) {
        console.error("Error fetching assigned complaints:", error);
        setAllComplaints([]);
        setFilteredComplaints([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (token) {
      fetchAssignedComplaints();
    }
  }, [token]);

  useEffect(() => {
    const filtered = allComplaints.filter((complaint) => {
      const category = classifyComplaint(complaint);
      const matchesFilter = filter === "all" || category === filter;

      const content = `${complaint.category} ${complaint.message} ${complaint.name} ${complaint.email} ${complaint.phone} ${complaint.address} ${complaint.location}`.toLowerCase();
      const matchesSearch = content.includes(searchTerm.toLowerCase());

      return matchesFilter && matchesSearch;
    });

    setFilteredComplaints(filtered);
  }, [searchTerm, filter, allComplaints]);

  const urgent = filteredComplaints.filter((c) => classifyComplaint(c) === "urgent");
  const important = filteredComplaints.filter((c) => classifyComplaint(c) === "important");
  const canWait = filteredComplaints.filter((c) => classifyComplaint(c) === "canWait");
  const isEmpty = filteredComplaints.length === 0;

  const renderList = (items: Complaint[]) =>
    items.map((complaint) => (
      <ComplaintCard
        key={complaint.id}
        id={complaint.id}
        name={complaint.name}
        email={complaint.email}
        category={complaint.category}
        phone={complaint.phone}
        address={complaint.address}
        message={complaint.message}
        submittedAt={complaint.submittedAt}
        location={complaint.location}
        image={complaint.image}
        status={complaint.status}
      />
    ));

  return (
    <div className="p-6 space-y-10">
      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <input
          type="search"
          placeholder="Search complaints..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-1/2 px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <Select value={filter} onValueChange={(value) => setFilter(value as typeof filter)} className="w-full sm:w-1/4">
          <SelectTrigger>
            <SelectValue placeholder="Filter complaints" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Filter by Category</SelectLabel>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="urgent">Urgent</SelectItem>
              <SelectItem value="important">Important</SelectItem>
              <SelectItem value="canWait">Can Wait</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Complaints Display */}
      {isLoading ? (
        <div className="text-center py-20 text-gray-500 dark:text-gray-400 text-xl font-semibold">
          Loading complaints...
        </div>
      ) : isEmpty ? (
        <div className="text-center py-20 text-gray-500 dark:text-gray-400 text-xl font-semibold">
          🎉 Hooray! No complaints at the moment.
        </div>
      ) : (
        <>
          {urgent.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Urgent Complaints</h2>
              <div className="space-y-4">{renderList(urgent)}</div>
            </section>
          )}

          {important.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Important Complaints</h2>
              <div className="space-y-4">{renderList(important)}</div>
            </section>
          )}

          {canWait.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Can Wait</h2>
              <div className="space-y-4">{renderList(canWait)}</div>
            </section>
          )}
        </>
      )}
    </div>
  );
}

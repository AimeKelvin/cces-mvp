// app/government/dashboard/page.tsx
'use client'

import { useAuth } from '@/context/AuthContext'
import ComplaintModal from '@/components/customs/gov/ComplaintModal'
import { useEffect, useState } from 'react'
import { Badge } from '@/components/ui/badge'

type Complaint = {
  _id: string
  title: string
  description: string
  category: string
  status: string
  sector: string
  createdAt: string
  updatedAt: string
  name: string
  email: string
  response?: string
  location: {
    city: string
    district: string
    sector: string
  }
}

export default function DashboardPage() {
  const { token } = useAuth()
  const [complaints, setComplaints] = useState<Complaint[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null)

  const fetchComplaints = async () => {
    try {
      if (!token) return
      const res = await fetch("http://localhost:5000/api/gov/complaints/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      setComplaints(data)
    } catch (err) {
      console.error("Error fetching:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchComplaints()
  }, [token])

  const statusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "resolved":
        return "bg-green-100 text-green-800"
      case "in progress":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen py-10 px-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">📋 Assigned Complaints</h1>

      {loading ? (
        <div>Loading complaints...</div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {complaints.map((complaint) => (
            <div
              key={complaint._id}
              onClick={() => setSelectedComplaint(complaint)}
              className="cursor-pointer bg-white border rounded-lg p-4 shadow hover:shadow-md transition"
            >
              <div className="flex justify-between mb-2">
                <h2 className="font-semibold">{complaint.title}</h2>
                <Badge className={statusColor(complaint.status)}>{complaint.status}</Badge>
              </div>
              <p className="text-sm text-gray-600 line-clamp-3">{complaint.description}</p>
              <div className="mt-2 text-sm text-gray-500">
                <p><strong>Sector:</strong> {complaint.sector}</p>
                <p><strong>Submitted:</strong> {new Date(complaint.createdAt).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      <ComplaintModal
        complaint={selectedComplaint}
        onClose={() => setSelectedComplaint(null)}
        token={token ?? ""}
        refreshData={fetchComplaints}
      />
    </div>
  )
}

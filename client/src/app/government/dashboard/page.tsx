'use client'

import { useEffect, useState } from "react"
import { useAuth } from "@/context/AuthContext"
import { Badge } from "@/components/ui/badge"
import ComplaintModal from "@/components/customs/gov/ComplaintModal"

type Complaint = {
  _id: string
  ticketId: string
  title: string
  description: string
  senderName: string
  location: {
    city: string
    district: string
    sector: string
  }
  category: string
  status: string
  createdAt: string
  updatedAt: string
}

export default function DashboardPage() {
  const { token } = useAuth()
  const [complaints, setComplaints] = useState<Complaint[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    const fetchComplaints = async () => {
      if (!token) return
      try {
        const res = await fetch('http://localhost:5000/api/gov/complaints/', {
          headers: { Authorization: `Bearer ${token}` },
        })
        const data = await res.json()
        setComplaints(data)
      } catch (error) {
        console.error('Error fetching complaints:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchComplaints()
  }, [token])

 const handleRespond = async (id: string, response: string) => {
    if (!token || !response) return
    try {
      await fetch(`http://localhost:5000/api/gov/complaints/${id}/respond`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ response }),
      })
      alert("Response submitted!")
    } catch (err) {
      console.error("Failed to submit response", err)
    }
  }

  const statusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'resolved':
        return 'bg-green-100 text-green-800'
      case 'in progress':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">📋 Assigned Complaints</h1>

        {loading ? (
          <div className="text-center py-20 text-gray-500">Loading complaints...</div>
        ) : complaints.length === 0 ? (
          <div className="text-center py-20 text-gray-500">No complaints assigned.</div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {complaints.map((complaint) => (
              <div
                key={complaint._id}
                onClick={() => {
                  setSelectedComplaint(complaint)
                  setModalOpen(true)
                }}
                className="cursor-pointer bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-5 border border-gray-100"
              >
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-xl font-semibold text-gray-800">{complaint.title}</h2>
                  <Badge className={statusColor(complaint.status)}>
                    {complaint.status}
                  </Badge>
                </div>
                <p className="text-gray-600 text-sm line-clamp-3">{complaint.description}</p>

                <div className="mt-4 text-sm text-gray-500 space-y-1">
                  <div><span className="font-medium text-gray-700">Sector:</span> {complaint.location?.sector}</div>
                  <div>
                    <span className="font-medium text-gray-700">Date:</span>{' '}
                    {new Date(complaint.createdAt).toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      <ComplaintModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        complaint={selectedComplaint}
        onRespond={handleRespond}
      />
    </div>
  )
}

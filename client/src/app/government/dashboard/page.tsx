'use client'

import { useEffect, useState } from "react"
import { useAuth } from "@/context/AuthContext"
import { Badge } from "@/components/ui/badge"
import ComplaintModal from "@/components/customs/gov/ComplaintModal"
import Sidebar from "@/components/customs/gov/sidebar"

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

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

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
        const res = await fetch(`${BASE_URL}/api/gov/complaints/`, {
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
      await fetch(`${BASE_URL}/api/gov/complaints/${id}/respond`, {
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
    <>
      <Sidebar />
      <main className="pt-16 md:pt-6 md:ml-64 px-4 min-h-screen bg-gray-50">

        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">
            Assigned Complaints
          </h1>

          {loading ? (
            <div className="text-center py-24 text-gray-500 text-sm">Loading complaints...</div>
          ) : complaints.length === 0 ? (
            <div className="text-center py-24 text-gray-500 text-sm">No complaints assigned to you.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {complaints.map((complaint) => (
                <div
                  key={complaint._id}
                  onClick={() => {
                    setSelectedComplaint(complaint)
                    setModalOpen(true)
                  }}
                  className="cursor-pointer bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all p-5"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-lg font-medium text-gray-900">{complaint.title}</h2>
                    <Badge className={statusColor(complaint.status)}>
                      {complaint.status}
                    </Badge>
                  </div>

                  <p className="text-sm text-gray-600 line-clamp-3 mb-3">
                    {complaint.description}
                  </p>

                  <div className="text-xs text-gray-500 space-y-1">
                    <div>
                      <span className="font-medium text-gray-700">Sector:</span>{' '}
                      {complaint.location?.sector}
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Date:</span>{' '}
                      {new Date(complaint.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <ComplaintModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          complaint={selectedComplaint}
          onRespond={handleRespond}
        />
      </main>
    </>
  )
}

'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useState, useEffect } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

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
  lastResponse?: string // ← used to show what gov just answered
}

type Props = {
  open: boolean
  onClose: () => void
  complaint: Complaint | null
  onRespond: (id: string, response: string) => Promise<void>
}

export default function ComplaintModal({ open, onClose, complaint, onRespond }: Props) {
  const [response, setResponse] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [showResponse, setShowResponse] = useState<string | null>(null)

  useEffect(() => {
    if (!open) {
      setResponse("")
      setSubmitting(false)
      setSuccess(false)
      setShowResponse(null)
    } else if (complaint?.lastResponse) {
      setShowResponse(complaint.lastResponse)
    }
  }, [open, complaint])

  if (!complaint) return null

  async function handleSubmit() {
    if (!response.trim()) return
    setSubmitting(true)
    setSuccess(false)
    try {
      if (!complaint) return
      await onRespond(complaint._id, response)
      setShowResponse(response) // show it instantly
      setSuccess(true)
    } catch (e) {
      console.error("Error submitting response:", e)
      setSuccess(false)
    } finally {
      setSubmitting(false)
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
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="max-w-3xl w-full max-h-[80vh] overflow-auto"
      >
        <DialogHeader>
          <DialogTitle className="text-xl">Complaint Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-3 text-sm mb-4">
          <p><strong>Ticket ID:</strong> {complaint.ticketId}</p>
          <p><strong>Title:</strong> {complaint.title}</p>
          <p><strong>Description:</strong> {complaint.description}</p>
          <p><strong>Sender Name:</strong> {complaint.senderName || "Anonymous"}</p>
          <p><strong>Location:</strong> {complaint.location?.sector}, {complaint.location?.district}, {complaint.location?.city}</p>
          <p><strong>Category:</strong> {complaint.category}</p>
          <p className="flex items-center gap-2">
            <strong>Status:</strong>
            <Badge className={statusColor(complaint.status)}>{complaint.status}</Badge>
          </p>
          <p><strong>Submitted At:</strong> {new Date(complaint.createdAt).toLocaleString()}</p>
        </div>

        {showResponse && (
          <div className="bg-green-50 border border-green-200 p-4 rounded-lg text-sm text-green-900">
            <strong>Your Response:</strong>
            <p className="mt-1 whitespace-pre-line">{showResponse}</p>
          </div>
        )}

        {!showResponse && (
          <>
            <Textarea
              placeholder="Write your response here..."
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              rows={4}
              disabled={submitting}
            />

            <Button
              className="mt-3 w-full sm:w-auto"
              onClick={handleSubmit}
              disabled={submitting || !response.trim()}
            >
              {submitting ? "Submitting..." : "Submit Response"}
            </Button>

            {success && (
              <p className="mt-2 text-green-600 font-medium">Response submitted successfully!</p>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

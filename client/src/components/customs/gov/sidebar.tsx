'use client'

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Menu, X, LogOut } from "lucide-react"

const navLinks = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Settings", href: "/dashboard/settings" },
  { label: "Set up AI", href: "/dashboard/setup" },
]

export default function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const router = useRouter()

  const handleLogout = () => {
    // Clear token or any auth data
    localStorage.removeItem("authToken") // Adjust based on your storage method
    router.push("/government/login")
  }

  return (
    <>
      {/* Top Navbar (Mobile) */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-30 bg-white border-b px-4 py-3 flex items-center justify-between shadow-sm">
        <span className="text-lg font-semibold text-gray-900">Gov Admin</span>
        <button onClick={() => setSidebarOpen(true)}>
          <Menu className="w-6 h-6 text-gray-700" />
        </button>
      </div>

      {/* Sidebar Drawer (Mobile) */}
      <div className={`fixed inset-0 z-40 md:hidden transition-transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="fixed inset-0 bg-black/40" onClick={() => setSidebarOpen(false)} />
        <div className="relative w-64 h-full bg-white shadow-xl p-4">
          <div className="flex items-center justify-between mb-6">
            <span className="text-xl font-bold text-gray-800">Gov Admin</span>
            <button onClick={() => setSidebarOpen(false)}>
              <X className="w-5 h-5 text-gray-700" />
            </button>
          </div>
          <nav className="space-y-2">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100"
                onClick={() => setSidebarOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => {
                setSidebarOpen(false)
                handleLogout()
              }}
              className="w-full text-left px-3 py-2 mt-4 rounded-lg text-red-600 hover:bg-red-50 flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </nav>
        </div>
      </div>

      {/* Permanent Sidebar (Desktop) */}
      <aside className="hidden md:fixed md:inset-y-0 md:w-64 md:flex md:flex-col bg-white border-r z-30 shadow-sm">
        <div className="h-16 flex items-center justify-center border-b px-6">
          <span className="text-xl font-bold text-gray-900">Gov Admin</span>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="block px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 mt-4 rounded-md text-red-600 hover:bg-red-50 flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </nav>
      </aside>
    </>
  )
}

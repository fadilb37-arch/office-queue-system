"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Top Navbar */}
      <div className="bg-white border-b px-6 py-4 flex items-center justify-between">
        
        <div className="flex items-center gap-6">
          
          {/* Hamburger Menu */}
          <button
            onClick={() => setOpen(true)}
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <Menu size={24} />
          </button>

          {/* Logo */}
          <Link href="/">
            <Image
              src="/Minifootball.jpg"
              alt="Logo"
              width={90}
              height={40}
              priority
            />
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex gap-6 text-gray-700 font-medium">
            <span>Matches</span>
            <span>Table</span>
            <span>Statistics</span>
            <span>Fantasy</span>
            <span>News</span>
          </div>
        </div>

        <button className="border rounded-full px-5 py-2 text-sm font-medium hover:bg-gray-100">
          Sign in
        </button>
      </div>

      {/* Sidebar Overlay */}
      {open && (
        <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 flex justify-between items-center border-b">
          <span className="font-bold text-lg">Menu</span>
          <button onClick={() => setOpen(false)}>
            <X size={22} />
          </button>
        </div>

        <div className="p-6 space-y-4 font-medium text-gray-700">
          <div>Matches</div>
          <div>Table</div>
          <div>Statistics</div>
          <div>Fantasy</div>
          <div>News</div>
          <div>Transfers</div>
          <div>Injuries</div>
          <div>Players</div>
          <div>Clubs</div>
          <div>Video</div>
        </div>
      </div>
    </>
  )
}
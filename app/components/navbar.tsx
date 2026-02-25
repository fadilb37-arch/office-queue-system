"use client"

import { useState } from "react"
import Image from "next/image"
import { Menu, X, ChevronRight } from "lucide-react"

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* NAVBAR */}
      <div className="bg-white border-b px-6 py-4 flex items-center justify-between">

        {/* Left side */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => setOpen(true)}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <Menu size={24} />
          </button>

          <Image
            src="/Minifootball.jpg"
            alt="Logo"
            width={90}
            height={40}
          />
        </div>

        <button className="border rounded-full px-5 py-2 text-sm font-medium">
          Sign in
        </button>
      </div>

      {/* OVERLAY */}
      <div
        className={`fixed inset-0 bg-purple-900/70 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setOpen(false)}
      />

      {/* SIDEBAR */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-white z-50 shadow-2xl 
        rounded-r-3xl transform transition-transform duration-300 ease-in-out
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <Image
            src="/Minifootball.jpg"
            alt="Logo"
            width={70}
            height={35}
          />
          <button onClick={() => setOpen(false)}>
            <X size={22} />
          </button>
        </div>

        {/* Scrollable Menu */}
        <div className="overflow-y-auto h-[calc(100%-80px)] px-6 py-6">

          <button className="mb-6 bg-gray-100 rounded-full px-4 py-2 text-sm font-medium">
            Login
          </button>

          <div className="space-y-6 text-lg font-semibold text-purple-900">

            <div className="cursor-pointer hover:text-purple-600 transition">
              Home
            </div>

            <div className="cursor-pointer hover:text-purple-600 transition">
              Matches
            </div>

            <div className="cursor-pointer hover:text-purple-600 transition">
              Table
            </div>

            <div className="cursor-pointer hover:text-purple-600 transition">
              Statistics
            </div>

            <div className="flex justify-between items-center cursor-pointer hover:text-purple-600 transition">
              Fantasy
              <ChevronRight size={18} />
            </div>

            <div className="cursor-pointer hover:text-purple-600 transition">
              Games
            </div>

            <div className="cursor-pointer hover:text-purple-600 transition">
              Transfers
            </div>

            <div className="cursor-pointer hover:text-purple-600 transition">
              Injuries
            </div>

            <div className="flex justify-between items-center cursor-pointer hover:text-purple-600 transition">
              News
              <ChevronRight size={18} />
            </div>

            <div className="flex justify-between items-center cursor-pointer hover:text-purple-600 transition">
              Video & Audio
              <ChevronRight size={18} />
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

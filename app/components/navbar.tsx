import Image from "next/image"
import Link from "next/link"

export default function Navbar() {
  return (
    <div className="bg-white border-b px-6 py-4 flex items-center justify-between">
      
      {/* Left Side */}
      <div className="flex items-center gap-8">
        
        {/* Logo */}
        <Link href="/">
          <Image
            src="/Minifootball.jpg"   // put your logo inside /public folder
            alt="Logo"
            width={140}
            height={40}
            priority
            className="object-contain"
          />
        </Link>

        {/* Navigation Links */}
        <div className="hidden lg:flex gap-6 text-gray-700 font-medium">
          <span>Matches</span>
          <span>Table</span>
          <span>Statistics</span>
          <span>Fantasy</span>
          <span>News</span>
        </div>

      </div>

      {/* Right Side */}
      <button className="border rounded-full px-5 py-2 text-sm font-medium hover:bg-gray-100">
        Sign in
      </button>

    </div>
  )
}
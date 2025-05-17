"use client";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const currentPath = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/citizen" },
    { name: "Report Issue", path: "/citizen/report" },
    { name: "Track Complaint", path: "/citizen/track" },
    { name: "About", path: "/citizen/about" },
    { name: "Contact", path: "/citizen/contact" },
  ];

  return (
    <nav className="flex items-center justify-between h-[80px] px-4 md:px-10 lg:px-16 py-4 bg-white shadow-sm z-50 relative">
      {/* Logo */}
      <div className="flex items-center">
        <Link href="/">
         <h2 className="text-2xl font-bold text-green-700">Jambo</h2>
        </Link>
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center space-x-6 text-sm text-gray-700">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            href={link.path}
            className={clsx(
              "hover:text-green-700 transition",
              currentPath === link.path && "text-green-700 font-semibold"
            )}
          >
            {link.name}
          </Link>
        ))}
      </div>

      {/* CTA Button */}
      <div className="hidden md:block">
        <Link href="/report">
          <Button className="bg-green-700 text-white text-sm px-6 py-2 hover:bg-green-800 transition">
            Report Now
          </Button>
        </Link>
      </div>

      {/* Hamburger for Mobile */}
      <button
        className="md:hidden text-2xl"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle Menu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          fill="#444"
        >
          <path d="M3 6h18M3 12h18M3 18h18" strokeWidth="2" stroke="currentColor" />
        </svg>
      </button>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-20 left-0 w-full bg-white px-4 py-6 shadow-lg flex flex-col space-y-4 z-50 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={clsx(
                "text-sm hover:text-green-700 transition",
                currentPath === link.path && "text-green-700 font-semibold"
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}

          <Link href="/report" onClick={() => setIsMenuOpen(false)}>
            <Button className="w-full bg-green-700 text-white text-sm hover:bg-green-800">
              Report Now
            </Button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

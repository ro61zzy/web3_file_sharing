"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import ConnectWallet from "./ConnectWallet";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full flex items-center justify-between p-4 border-b border-gray-700 bg-gray-900 bg-opacity-90 backdrop-blur-md relative">
      <h1 className="text-xl font-bold text-blue-400">Web3 FileShare</h1>

      <div className="hidden md:flex gap-6 items-center text-white">
        <NavLinks />
        <ConnectWallet />
      </div>

      <button
        className="md:hidden text-white focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute top-16 left-0 w-full bg-gray-900 border-t border-gray-700 items-center p-6 flex flex-col gap-4 text-white md:hidden"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <NavLinks onClick={() => setIsOpen(false)} />
            <ConnectWallet className="w-full text-center py-3" />
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

const NavLinks = ({ onClick }: { onClick?: () => void }) => (
  <>
    <Link href="/" className="hover:text-blue-400 transition" onClick={onClick}>
      Home
    </Link>
    <Link
      href="/upload"
      className="hover:text-blue-400 transition"
      onClick={onClick}
    >
      Upload
    </Link>
    <Link
      href="/browse"
      className="hover:text-blue-400 transition"
      onClick={onClick}
    >
      Browse
    </Link>
  </>
);

"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <Navbar />
      <div className="flex flex-col items-center justify-center h-[60vh] text-center ">
        {/* Title Animation */}
        <motion.h1
          className="text-4xl md:text-6xl font-bold text-blue-400"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Web3 File Sharing
        </motion.h1>

        {/* Description Animation */}
        <motion.p
          className="text-lg md:text-xl mt-4 text-gray-300 max-w-2xl"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Secure & decentralized file storage using{" "}
          <span className="text-blue-400 font-semibold">IPFS</span>. Say
          goodbye to centralized servers and take full control of your data.
        </motion.p>

        {/* CTA Button Animation */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Link href="/upload">
            <button className="mt-8 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white text-lg font-semibold rounded-md transition">
              Upload File
            </button>
          </Link>
        </motion.div>
      </div>

      {/* Spacing before Features */}
      <div className="flex flex-col items-center">
        {/* Features Section */}
        <motion.div
          className="flex flex-col md:flex-row gap-8 text-gray-400 text-sm md:text-base"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="bg-gray-800 p-6 rounded-md shadow-md w-72">
            🔒 <span className="text-white font-semibold">Privacy First</span>
            <p className="mt-2">Only you control your files, no third parties involved.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-md shadow-md w-72">
            🚀 <span className="text-white font-semibold">Fast & Reliable</span>
            <p className="mt-2">Powered by IPFS for high-speed, distributed access.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-md shadow-md w-72">
            🌍 <span className="text-white font-semibold">Decentralized</span>
            <p className="mt-2">No single point of failure, files stay available forever.</p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

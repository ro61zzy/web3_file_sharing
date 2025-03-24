"use client";
import Link from "next/link";
import ConnectWallet from "./ConnectWallet";

export default function Navbar() {
  return (
    <nav className="w-full flex justify-between p-4 border-b border-gray-700 bg-gray-900 bg-opacity-90 backdrop-blur-md">
      <h1 className="text-xl font-bold text-blue-400">Web3 FileShare</h1>
      <div className="flex gap-6 items-center text-white">
        <Link href="/" className="hover:text-blue-400 transition">Home</Link>
        <Link href="/upload" className="hover:text-blue-400 transition">Upload</Link>
        <Link href="/browse" className="hover:text-blue-400 transition">Browse</Link>
        <ConnectWallet />
      </div>
    </nav>
  );
}

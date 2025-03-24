"use client";
import Link from "next/link";
import ConnectWallet from "./ConnectWallet";

export default function Navbar() {
  return (
    <nav className="w-full flex justify-between p-4 border-b">
      <h1 className="text-xl font-bold">Web3 FileShare</h1>
      <div className="flex gap-4">
        <Link href="/">Home</Link>
        <Link href="/upload">Upload</Link>
        <Link href="/browse">Browse</Link>
        <ConnectWallet />
      </div>
    </nav>
  );
}

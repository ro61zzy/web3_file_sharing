import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <Navbar />
      <div className="flex flex-col items-center justify-center h-[80vh] text-center px-6">
        <h1 className="text-4xl md:text-6xl font-bold text-blue-400">
          Web3 File Sharing
        </h1>
        <p className="text-lg md:text-xl mt-4 text-gray-300">
          Secure & decentralized file storage using IPFS
        </p>
        <Link href="/upload">
          <button className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white text-lg font-semibold rounded-md transition">
            Upload File
          </button>
        </Link>
      </div>
    </main>
  );
}

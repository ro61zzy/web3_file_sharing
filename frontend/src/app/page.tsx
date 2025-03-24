import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex flex-col items-center justify-center h-[80vh]">
        <h1 className="text-4xl font-bold">Welcome to Web3 FileShare</h1>
        <p className="text-lg mt-2">Decentralized file storage on IPFS</p>
      </div>
    </main>
  );
}

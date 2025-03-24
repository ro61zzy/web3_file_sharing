"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";
import { Copy, Share2, Trash2 } from "lucide-react"; // Icons for copy & share

const PINATA_API_KEY = process.env.NEXT_PUBLIC_PINATA_API_KEY;
const PINATA_SECRET_KEY = process.env.NEXT_PUBLIC_PINATA_SECRET_KEY;

interface FileData {
  id: string;
  ipfs_pin_hash: string;
  metadata: { name: string };
}

export default function BrowsePage() {
  const [files, setFiles] = useState<FileData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFiles() {
      try {
        const res = await axios.get("https://api.pinata.cloud/data/pinList", {
          headers: {
            pinata_api_key: String(PINATA_API_KEY),
            pinata_secret_api_key: String(PINATA_SECRET_KEY),
          },
        });
        setFiles(res.data.rows);
      } catch (error) {
        console.error("Error fetching files:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchFiles();
  }, []);

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    alert("Link copied to clipboard!");
  };

  const shareFile = (url: string) => {
    if (navigator.share) {
      navigator.share({
        title: "Check out this file on IPFS",
        url,
      }).catch(console.error);
    } else {
      alert("Sharing not supported on this browser.");
    }
  };

  const deleteFile = async (ipfsHash: string) => {
    if (!confirm("Are you sure you want to delete this file?")) return;

    try {
      await axios.delete(`https://api.pinata.cloud/pinning/unpin/${ipfsHash}`, {
        headers: {
          pinata_api_key: String(PINATA_API_KEY),
          pinata_secret_api_key: String(PINATA_SECRET_KEY),
        },
      });

   
      setFiles((prevFiles) => prevFiles.filter((file) => file.ipfs_pin_hash !== ipfsHash));
      alert("File deleted successfully!");
    } catch (error) {
      console.error("Error deleting file:", error);
      alert("Failed to delete file. Check console for details.");
    }
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white">
         <Navbar />
      <h1 className="text-3xl font-bold text-blue-400 text-center mb-6 mt-6">
        Your Uploaded Files
      </h1>

      {loading ? (
        <p className="text-center text-gray-400 p-6">Loading files...</p>
      ) : files.length === 0 ? (
        <p className="text-center text-gray-400 p-6">No files uploaded yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {files.map((file) => {
          const fileUrl = `https://gateway.pinata.cloud/ipfs/${file.ipfs_pin_hash}`;
      
          return (
            <div key={file.id} className="bg-gray-800 p-4 rounded-lg">
              <p className="text-lg font-semibold">{file.metadata.name}</p>
              <p className="text-sm text-gray-400 truncate">
                {file.ipfs_pin_hash}
              </p>
              <div className="flex items-center gap-3 mt-3">
                <a
                  href={fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 text-sm hover:underline"
                >
                  View on IPFS
                </a>
      
                <button onClick={() => copyToClipboard(fileUrl)} className="text-gray-400 hover:text-white">
                  <Copy size={20} />
                </button>
                <button onClick={() => shareFile(fileUrl)} className="text-gray-400 hover:text-white">
                  <Share2 size={20} />
                </button>
                <button onClick={() => deleteFile(file.ipfs_pin_hash)} className="text-red-500 hover:text-red-700">
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
      
      )}
    </main>
  );
}

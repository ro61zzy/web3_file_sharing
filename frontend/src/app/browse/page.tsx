"use client";
import { useEffect, useState } from "react";
import axios from "axios";

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

  return (
    <main className="min-h-screen bg-gray-950 text-white p-6">
      <h1 className="text-3xl font-bold text-blue-400 text-center mb-6">
        Your Uploaded Files
      </h1>

      {loading ? (
        <p className="text-center text-gray-400">Loading files...</p>
      ) : files.length === 0 ? (
        <p className="text-center text-gray-400">No files uploaded yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {files.map((file) => (
            <div key={file.id} className="bg-gray-800 p-4 rounded-lg">
              <p className="text-lg font-semibold">{file.metadata.name}</p>
              <p className="text-sm text-gray-400 truncate">
                {file.ipfs_pin_hash}
              </p>
              <a
                href={`https://gateway.pinata.cloud/ipfs/${file.ipfs_pin_hash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-blue-400 hover:underline"
              >
                View on IPFS
              </a>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

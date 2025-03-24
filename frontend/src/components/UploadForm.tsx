"use client";

import { useState } from "react";
import { uploadToIPFS } from "@/lib/ipfs";

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [cid, setCid] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert("Select a file first!");
    setUploading(true);
    
    const ipfsHash = await uploadToIPFS(file);
    if (ipfsHash) {
      setCid(ipfsHash);
      alert(`File uploaded! IPFS CID: ${ipfsHash}`);
    } else {
      alert("Upload failed. Try again.");
    }

    setUploading(false);
  };

  return (
    <div className="max-w-md mx-auto bg-gray-900 p-6 rounded-lg shadow-lg">
      <input type="file" onChange={handleFileChange} className="block w-full text-md text-gray-300 bg-gray-800 border border-gray-700 rounded-sm cursor-pointer focus:outline-none"
 />
      <button
        onClick={handleUpload}
        className="mt-4 w-full px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-md transition"

        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>
      {cid && (
  <p className="flex items-center justify-between mt-6 text-sm">
    File CID: {" "}
    <a
      href={`https://gateway.pinata.cloud/ipfs/${cid}`}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-500 inline-block max-w-[84%] truncate"
    >
      {cid}
    </a>
  </p>
)}

    </div>
  );
}

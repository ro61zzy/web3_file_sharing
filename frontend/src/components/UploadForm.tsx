"use client";
import { useState } from "react";
import axios from "axios";

const PINATA_API_KEY = "your-pinata-api-key";
const PINATA_SECRET_KEY = "your-pinata-secret";


export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFile(e.target.files[0]);
  };

 async function uploadToIPFS(file: File) {
    const formData = new FormData();
    formData.append("file", file);
  
    const metadata = JSON.stringify({
      name: file.name,
    });
    formData.append("pinataMetadata", metadata);
  
    const options = JSON.stringify({
      cidVersion: 1,
    });
    formData.append("pinataOptions", options);
  
    try {
      const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          pinata_api_key: PINATA_API_KEY,
          pinata_secret_api_key: PINATA_SECRET_KEY,
        },
      });
  
      return res.data.IpfsHash; // This is the CID
    } catch (error) {
      console.error("IPFS Upload Error:", error);
      return null;
    }
  }
  

  const handleUpload = async () => {
    if (!file) return alert("Select a file first!");
    alert(`File uploaded: ${file.name}`);
  };

  return (
    <div className="max-w-md mx-auto bg-gray-900 p-6 rounded-lg shadow-lg">
      <input
        type="file"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-300 bg-gray-800 border border-gray-700 rounded-lg cursor-pointer focus:outline-none"
      />
      <button
        onClick={handleUpload}
        className="mt-4 w-full px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-md transition"
      >
        Upload
      </button>
    </div>
  );
}

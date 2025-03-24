"use client";

import { useState } from "react";
import { uploadToIPFS } from "@/lib/ipfs";
import { Upload, File, Loader } from "lucide-react";
import { toast } from "react-hot-toast";


export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [cid, setCid] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return toast.error("Please select a file first!");
    setUploading(true);

    const uploadToast = toast.loading("Uploading file...");
    try {
      const ipfsHash = await uploadToIPFS(file);
      if (ipfsHash) {
        setCid(ipfsHash);
        toast.success("File uploaded successfully!");
      } else {
        toast.error("Upload failed. Please try again.");
      }
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      toast.dismiss(uploadToast);
      setUploading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gray-900 p-6 rounded-lg shadow-lg">
      {/* Drag and Drop File Upload */}
      <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-blue-500 transition p-4">
        <input type="file" onChange={handleFileChange} className="hidden" />
        <Upload size={32} className="text-gray-400" />
        <p className="mt-2 text-gray-300 text-sm">
          Drag & Drop or <span className="text-blue-400">Browse</span>
        </p>
      </label>

      {/* Selected File Preview */}
      {file && (
        <div className="mt-3 flex items-center gap-2 text-gray-300">
          <File size={20} />
          <span className="truncate">{file.name}</span>
        </div>
      )}

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        className="mt-4 w-full px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-md transition flex items-center justify-center gap-2"
        disabled={uploading}
      >
        {uploading ? <Loader size={20} className="animate-spin" /> : "Upload"}
      </button>

      {/* Display CID Link */}
      {cid && (
        <p className="flex items-center justify-between mt-6 text-sm">
          File CID:{" "}
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

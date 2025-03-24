"use client";
import { useState } from "react";

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFile(e.target.files[0]);
  };

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

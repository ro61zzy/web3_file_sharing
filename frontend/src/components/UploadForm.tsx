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
    <div className="p-4 border rounded bg-white">
      <input type="file" onChange={handleFileChange} className="mb-2" />
      <button
        onClick={handleUpload}
        className="px-4 py-2 bg-blue-600 text-white rounded"
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>
      {cid && (
        <p className="mt-2 text-sm">
          File CID: <a href={`https://gateway.pinata.cloud/ipfs/${cid}`} target="_blank" className="text-blue-500">{cid}</a>
        </p>
      )}
    </div>
  );
}

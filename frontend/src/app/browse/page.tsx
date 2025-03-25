"use client";

import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useWallet } from "@/context/WalletProvider";
import Navbar from "@/components/Navbar";
import { Copy, Share2, Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";
import contractData from "@/contracts/FileStorage.json";

const CONTRACT_ADDRESS = "0xAe14879343C5C1F239959503Fc6eA17245842499";

interface FileData {
  ipfsHash: string;
  filename: string;
  timestamp: number;
}

export default function BrowsePage() {
  const abi = contractData.abi;
  const { account, provider } = useWallet(); 
  const [files, setFiles] = useState<FileData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!account || !provider) return;
    
    const code = provider.getCode(CONTRACT_ADDRESS);
      console.log("Contract Code:", code);



    fetchUserFiles();
  }, [account, provider]);

  async function fetchUserFiles() {
    try {
      setLoading(true);

  
      if (!provider) {
        toast.error("No provider found. Please connect your wallet.");
        return;
      }

  
      const signer = provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, await signer);
      const userFiles = await contract.getFilesByOwner(account);


     
      const formattedFiles = userFiles.map((file: any) => ({
        ipfsHash: file.ipfsHash,
        filename: file.filename,
        timestamp: Number(file.timestamp) * 1000,
      }));

      setFiles(formattedFiles);
    } catch (error) {
      toast.error("Error fetching files from blockchain");
    } finally {
      setLoading(false);
    }
  }


  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard!");
  };

  const shareFile = (url: string) => {
    if (navigator.share) {
      navigator
        .share({ title: "Check out this file on IPFS", url })
        .catch(() => toast.error("Failed to share file"));
    } else {
      toast.error("Sharing not supported on this browser.");
    }
  };

  const deleteFile = async (ipfsHash: string) => {
    if (!provider) {
      toast.error("No provider found. Please connect your wallet.");
      return;
    }
  
    try {
      const signer = provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, await signer);
  
      const tx = await contract.deleteFile(ipfsHash, { gasLimit: 300000 });
      toast.loading("Deleting file from blockchain...");
  
      await tx.wait();
      toast.success("File deleted successfully!");
  
      // Remove from UI
      setFiles((prevFiles) => prevFiles.filter((file) => file.ipfsHash !== ipfsHash));
    } catch (error) {
      console.error("Error deleting file:", error);
      toast.error("Failed to delete file.");
    }
  };
  

  

  if (!account) {
    return (
      <main className="min-h-screen bg-gray-950 text-white">
        <Navbar />
        <div className="flex flex-col items-center justify-center h-screen">
          <p className="text-gray-400">Please connect your wallet</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <Navbar />
      <h1 className="text-3xl font-bold text-blue-400 text-center mt-6">
        Your Uploaded Files
      </h1>

      {loading ? (
        <div className="flex justify-center items-center min-h-[40vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-500"></div>
        </div>
      ) : files.length === 0 ? (
        <p className="text-center text-gray-400 p-6">No files uploaded yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {files.map((file) => {
            const fileUrl = `https://gateway.pinata.cloud/ipfs/${file.ipfsHash}`;

            return (
              <div key={file.ipfsHash} className="bg-gray-800 p-4 rounded-lg">
                <p className="text-lg font-semibold">{file.filename}</p>
                <p className="text-sm text-gray-400 truncate">{file.ipfsHash}</p>
                <div className="flex items-center gap-3 mt-3">
                  <a
                    href={fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 text-sm hover:underline"
                  >
                    View on IPFS
                  </a>
                  <button
                    onClick={() => copyToClipboard(fileUrl)}
                    className="text-gray-400 hover:text-white"
                  >
                    <Copy size={20} />
                  </button>
                  <button
                    onClick={() => shareFile(fileUrl)}
                    className="text-gray-400 hover:text-white"
                  >
                    <Share2 size={20} />
                  </button>
                  {/* <button
                   onClick={() => deleteFile(file.ipfsHash)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={20} />
                  </button> */}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}

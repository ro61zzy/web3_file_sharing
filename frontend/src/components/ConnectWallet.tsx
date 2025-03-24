"use client";
import { useState } from "react";
import { ethers } from "ethers";

declare global {
  interface Window {
    ethereum?: any;
  }
}

export default function ConnectWallet() {
  const [account, setAccount] = useState<string | null>(null);

  const connectWallet = async () => {
    if (!window.ethereum) return alert("Install MetaMask!");
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    setAccount(await signer.getAddress());
  };

  return (
    <button
      onClick={connectWallet}
      className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md transition duration-200"
    >
      {account ? `${account.slice(0, 6)}...${account.slice(-4)}` : "Connect Wallet"}
    </button>
  );
}

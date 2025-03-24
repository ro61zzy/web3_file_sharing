"use client";
import { useWallet } from "@/context/WalletProvider";

export default function ConnectWallet() {
  const { account, connectWallet } = useWallet();

  return (
    <button
      onClick={connectWallet}
      className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md transition duration-200"
    >
      {account ? `${account.slice(0, 6)}...${account.slice(-4)}` : "Connect Wallet"}
    </button>
  );
}

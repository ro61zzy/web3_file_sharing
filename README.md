# Web3 File Share 🚀

A decentralized file-sharing dApp using **IPFS & Ethereum**.  
Users can **upload files**, store metadata on-chain, and access their uploads securely.

## 🛠 Tech Stack
- **Frontend:** Next.js, TypeScript, ethers.js
- **Storage:** IPFS via Pinata
- **Blockchain:** Solidity smart contract deployed on Ethereum Testnet - Sepolia

## 📂 Project Structure
- `frontend/` → Next.js app for UI & wallet interactions
- `smart_contracts/` → Solidity contract & deployment scripts

## 🔧 Setup Instructions

### **Frontend**
```sh
cd frontend
npm install
npm run dev
```

### **Smart Contract**
```sh
cd smart_contracts
npm install
npx hardhat test
npx hardhat run scripts/deploy.js --network goerli
```

## 🎯 Features
✅ Upload files to IPFS  
✅ Store metadata on Ethereum  
✅ View uploaded files in the dashboard  

## 🚀 Roadmap
- [ ] Implement access control  
- [ ] Support encrypted file sharing  
- [ ] Add token incentives for storage  

## 🤝 Contributing
Open to PRs! Feel free to fork & improve the project.


import { ethers } from "hardhat";

async function main() {
  console.log("🚀 Starting deployment...");

  const FileStorage = await ethers.getContractFactory("FileStorage");
  console.log("✅ Contract Factory Loaded");

  const fileStorage = await FileStorage.deploy({
    gasLimit: 6000000,  // Increase if needed
    gasPrice: ethers.parseUnits("15", "gwei"),  // Adjust gas price
  });
  
  
  await fileStorage.waitForDeployment();
  console.log("🎉 Contract Deployed at:", await fileStorage.getAddress());
}

main().catch((error) => {
  console.error("❌ Deployment Failed:", error);
  process.exitCode = 1;
});

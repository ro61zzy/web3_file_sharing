import { ethers } from "hardhat";

async function main() {
  const FileStorage = await ethers.getContractFactory("FileStorage");
  const fileStorage = await FileStorage.deploy();

  // ✅ Wait for the contract to be fully deployed
  await fileStorage.waitForDeployment();

  // ✅ Get the deployed contract address correctly in ethers v6
  console.log("FileStorage deployed to:", await fileStorage.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

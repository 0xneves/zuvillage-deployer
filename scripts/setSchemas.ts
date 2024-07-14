import { ethers } from "hardhat";
import abi from "../abi/Resolver.json";

async function main() {
  if (
    !process.env.RESOLVER_ADDRESS ||
    !process.env.ASSIGN_MANAGER_SCHEMA ||
    !process.env.ASSIGN_VILLAGER_SCHEMA ||
    !process.env.ATTEST_EVENT_SCHEMA ||
    !process.env.ATTEST_RESPONSE_SCHEMA
  ) {
    throw new Error("RESOLVER_ADDRESS is not set");
  }

  const [deployer] = await ethers.getSigners();

  console.log("Connected with: ", deployer.address);

  const Resolver = await ethers.getContractAt(abi, process.env.RESOLVER_ADDRESS, deployer);

  const tx0 = await Resolver.setSchema(process.env.ASSIGN_MANAGER_SCHEMA, 1);
  await tx0.wait();
  const tx1 = await Resolver.setSchema(process.env.ASSIGN_VILLAGER_SCHEMA, 2);
  await tx1.wait();
  const tx2 = await Resolver.setSchema(process.env.ATTEST_EVENT_SCHEMA, 3);
  await tx2.wait();
  const tx3 = await Resolver.setSchema(process.env.ATTEST_RESPONSE_SCHEMA, 4);
  await tx3.wait();

  console.log("Schemas set on Resolver");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

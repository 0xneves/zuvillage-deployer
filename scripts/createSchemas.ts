import { ethers } from "hardhat";
import abi from "../abi/Registry.json";

async function main() {
  if (!process.env.REGISTRY_ADDRESS || !process.env.RESOLVER_ADDRESS) {
    throw new Error("REGISTRY_ADDRESS or RESOLVER_ADDRESS is not set");
  }

  const [deployer] = await ethers.getSigners();
  console.log("Connected with: ", deployer.address);

  const Registry = await ethers.getContractAt(abi, process.env.REGISTRY_ADDRESS, deployer);

  /// Register the MANAGER schema
  let schema = "string role";
  let resolverAddress = process.env.RESOLVER_ADDRESS; // Sepolia 0.26
  let revocable = true;

  const uid0 = await Registry.callStatic.register(schema, resolverAddress, revocable);
  const tx0 = await Registry.register(schema, resolverAddress, revocable);
  await tx0.wait();
  console.log("MANAGER schema registered", uid0);

  /// Register the VILLAGER schema
  schema = "string status";
  resolverAddress = process.env.RESOLVER_ADDRESS; // Sepolia 0.26
  revocable = false;

  const uid1 = await Registry.callStatic.register(schema, resolverAddress, revocable);
  const tx1 = await Registry.register(schema, resolverAddress, revocable);
  await tx1.wait();
  console.log("VILLAGER schema registered", uid1);

  /// Register the EVENT schema
  schema = "string title,string comment";
  resolverAddress = process.env.RESOLVER_ADDRESS; // Sepolia 0.26
  revocable = false;

  const uid2 = await Registry.callStatic.register(schema, resolverAddress, revocable);
  const tx2 = await Registry.register(schema, resolverAddress, revocable);
  await tx2.wait();
  console.log("ATTEST EVENT schema registered", uid2);

  /// Register the RESPONSE schema
  schema = "bool status";
  resolverAddress = process.env.RESOLVER_ADDRESS; // Sepolia 0.26
  revocable = true;

  const uid3 = await Registry.callStatic.register(schema, resolverAddress, revocable);
  const tx3 = await Registry.register(schema, resolverAddress, revocable);
  await tx3.wait();
  console.log("ATTEST RESPONSE schema registered", uid3);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

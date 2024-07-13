import { ethers } from "hardhat";
import abi from "../abi/Resolver.json";

async function main() {
  if (!process.env.RESOLVER_ADDRESS) {
    throw new Error("RESOLVER_ADDRESS is not set");
  }
  const [deployer] = await ethers.getSigners();

  console.log("Connected with: ", deployer.address);

  const Resolver = await ethers.getContractAt(abi, process.env.RESOLVER_ADDRESS, deployer);

  const tx0 = await Resolver.setSchema(
    "0x7e84e2b90ff7e288a3ba134d64c35c3d093624ccff1d84a4a60a556c19fb27da",
    1,
  );
  await tx0.wait();
  const tx1 = await Resolver.setSchema(
    "0x2b85bd1271fc0ca2c23f162bd7726688a4cc1f8ef57bbe2b8c4b24c2d6c3f1ee",
    2,
  );
  await tx1.wait();
  const tx2 = await Resolver.setSchema(
    "0xce1a0c6a7e3412f5cb2c36a8148510944131aada27d9cf98b789f4fd42cf1bee",
    3,
  );
  await tx2.wait();
  const tx3 = await Resolver.setSchema(
    "0x121dafbe9211e471f0d73e35f489e7e936f451ce858e7f74ea0fe48c9b702fdb",
    4,
  );
  await tx3.wait();

  console.log("Schemas set on Resolver");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

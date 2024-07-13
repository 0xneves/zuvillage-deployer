import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";
dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  networks: {
    op: {
      url: `${process.env.RPC_OP}`,
      accounts: [`${process.env.PRIVATE_KEY}`],
    },
  },
};

export default config;

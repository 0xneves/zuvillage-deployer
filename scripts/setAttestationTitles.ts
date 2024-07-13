import { ethers } from "hardhat";
import abi from "../abi/Resolver.json";

async function main() {
  if (!process.env.RESOLVER_ADDRESS) {
    throw new Error("RESOLVER_ADDRESS is not set");
  }
  const [deployer] = await ethers.getSigners();

  console.log("Connected with: ", deployer.address);

  const Resolver = await ethers.getContractAt(abi, process.env.RESOLVER_ADDRESS, deployer);

  const titles = [
    "Changed my mind",
    "Disagreed with somebody on stage",
    "Created session on Zuzalu city",
    "Wrote on Zuzagora",
    "Voted on significant poll",
    "Early contributor",
    "Volunteered",
    "Started a new club",
    "Hosted a discussion",
    "Friend from past Zu Events",
    "Showed me a cool tech",
    "Showed me around town",
    "Good laughs",
    "Good talk",
  ];

  //   "ChangedMyMind",
  //   "DisagreedWithSomebodyOnStage",
  //   "CreateSessionOnZuzaluCity",
  //   "WriteOnZuzagora",
  //   "VotedOnSignificantPoll",
  //   "EarlyContributors",
  //   "VolunteerDuringEvent",
  //   "StartANewClub",
  //   "HostADiscussion",

  for (let i = 0; i < titles.length; i++) {
    const tx0 = await Resolver.setAttestationTitle(titles[i], true);
    await tx0.wait();
    console.log("Set attestation title for:", titles[i]);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

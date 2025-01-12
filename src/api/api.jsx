import { ethers } from "ethers";
import abiJson from "./SpermBank.json";

const abi = abiJson.abi;
const RPC_ENDPOINT = "https://ethereum-holesky.nodit.io/4QBL2B-yQ3MOFtYxjaFC1mNy5wKe91LH";
const contractAddress = "0xdF5F998FB9D19f18D7F225328584f0767F2d8a4d";
const DEPLOYER_PRIVATE_KEY = "8e26ce13ad8e8b1be460d30858778c2d8d7a24ff126ffa1b0e23b2fae327e05e";
const receiver = "0x30ced3a9317F92b6498b075D2ec8ce2458C1fE4c";
const giver = "0x1B961BB2fc50Bbee1Eab9FE3B2f4EF2Ac93D8C4E";

let provider;
let wallet;
let spermBank;

const getUserKey = () => {
  // if (localStorage.getItem('userType') == '기증자') {
  // } else {
  //   // DEPLOYER_PRIVATE_KEY = "8e26ce13ad8e8b1be460d30858778c2d8d7a24ff126ffa1b0e23b2fae327e05e";
  // }
}

export const registerDonor = async (donorData) => {
  try {
    getUserKey();  
    provider = new ethers.JsonRpcProvider(RPC_ENDPOINT);
    const privateKey = DEPLOYER_PRIVATE_KEY

    wallet = new ethers.Wallet(privateKey, provider);
    spermBank = new ethers.Contract(contractAddress, abi, wallet);
  } catch (error) {
    console.error("Wallet initialization error:", error);
  }

  const admin = await spermBank.admin();
  const tx = await spermBank.registerDonor(
    donorData.bloodInfo,
    donorData.semenTestInfo,
    donorData.interviewInfo,
    donorData.physicalInfo,
  );

  await tx.wait();

  return;
};

export const getTransLog = async () => {
  try {
    getUserKey();  
    provider = new ethers.JsonRpcProvider(RPC_ENDPOINT);
    const privateKey = DEPLOYER_PRIVATE_KEY

    wallet = new ethers.Wallet(privateKey, provider);
    spermBank = new ethers.Contract(contractAddress, abi, wallet);
  } catch (error) {
    console.error("Wallet initialization error:", error);
  }

  const admin = await spermBank.admin();
  console.log("Admin:", admin);

  const donorInfo = await spermBank.getAllDonors();
  console.log("Donor Info:", donorInfo);

  return donorInfo;
}

export const makeTrade = async (input) => {
  try {
    getUserKey();  
    provider = new ethers.JsonRpcProvider(RPC_ENDPOINT);
    const privateKey = DEPLOYER_PRIVATE_KEY

    wallet = new ethers.Wallet(privateKey, provider);
    spermBank = new ethers.Contract(contractAddress, abi, wallet);
  } catch (error) {
    console.error("Wallet initialization error:", error);
  }

  const admin = await spermBank.admin();
  const receiveTx = await spermBank.spermReceive(receiver, input);
  const result = await receiveTx.wait();

  return;
}

export const getTradeLog = async () => {
  try {
    provider = new ethers.JsonRpcProvider(RPC_ENDPOINT);
    const privateKey = DEPLOYER_PRIVATE_KEY

    wallet = new ethers.Wallet(privateKey, provider);
    spermBank = new ethers.Contract(contractAddress, abi, wallet);
  } catch (error) {
    console.error("Wallet initialization error:", error);
  }

  const admin = await spermBank.admin();
  const receivers = await spermBank.getReceiverHistory();

  return receivers;
}
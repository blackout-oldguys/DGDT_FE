import { ethers } from "ethers";
import abiJson from "./SpermBank.json";

const abi = abiJson.abi;
const RPC_ENDPOINT = "https://ethereum-holesky.nodit.io/4QBL2B-yQ3MOFtYxjaFC1mNy5wKe91LH";
const DEPLOYER_PRIVATE_KEY = "8e26ce13ad8e8b1be460d30858778c2d8d7a24ff126ffa1b0e23b2fae327e05e";
const contractAddress = "0xEAa0C54117fd5DF46fbe1796DdecCDDE38c0A770";

let provider;
let wallet;
let spermBank;

try {
  if (!DEPLOYER_PRIVATE_KEY) {
    throw new Error('Private key is missing');
  }
  
  provider = new ethers.JsonRpcProvider(RPC_ENDPOINT);

  const privateKey = DEPLOYER_PRIVATE_KEY.startsWith('0x') 
    ? DEPLOYER_PRIVATE_KEY.slice(2) 
    : DEPLOYER_PRIVATE_KEY;
    
  wallet = new ethers.Wallet(privateKey, provider);
  spermBank = new ethers.Contract(contractAddress, abi, wallet);
} catch (error) {
  console.error("Wallet initialization error:", error);
}

export const registerDonor = async (donorData) => {
    // Admin 주소 확인
    const admin = await spermBank.admin();
    console.log("Admin:", admin);

    // 새로운 기증자 등록
    const tx = await spermBank.registerDonor(
      donorData.name,
      donorData.age,
      donorData.bloodInfo,
      donorData.semenTestInfo,
      donorData.interviewInfo,
      donorData.physicalInfo,
    );
    console.log("Transaction hash:", tx);

    await tx.wait();
    console.log("Donor registered!");

    // 기증자 정보 조회
    const donorInfo = await spermBank.getDonorInfo(wallet.address);
    console.log("Donor Info:", donorInfo);

    return donorInfo;
  };

require("dotenv").config({ path: ".env" });
import { BytesLike } from "ethers";
import { ethers } from "hardhat";

// import IMultiSig from "../typechain-types/Imultisig.sol"

async function main() {
  let provider = {
    PrivateKey: process.env.ACCOUNT_PRIVATE_KEY as BytesLike,
    URL: process.env.INFURA_ROPSTEN_API_KEY_URL,
  };

  const provider2 = ethers.getDefaultProvider("ropsten", provider.URL);
  let wallet = new ethers.Wallet(provider.PrivateKey, provider2);
  const _value = ethers.utils.parseEther("1");

  const CONTRACTADDRESS = "0x6e828b59fc799b6ef92e42d2f39e438a7477f469";
  const MULTISIG = await ethers.getContractAt("IMultiSig", CONTRACTADDRESS);

  /// TRANSFER ETHER TO WALLET
  //  await wallet.sendTransaction({ to: CONTRACTADDRESS, value: _value });
  //  console.log("contractBalanc", await MULTISIG.contractBalance());


  /// INTERACT WITH SMART CONTRACT
  // await MULTISIG.withdrawEther(_value);
  // await MULTISIG.Approve(1);
  // @ts-ignore
  const bal = await MULTISIG.contractBalance();
  console.log(Number(bal._hex));

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
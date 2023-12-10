const { Web3 } = require("web3");
const ethereumNodeURL = `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`;
const { getQuote } = require("../services/openSwap");
const ethers = require("ethers");
const { erc20 } = require("../ABI/ERC-20");
const { bigIntToDecimal } = require("../utils/helper");

const getBalance = async (req, res, next) => {
  try {
    const address = req.params.walletAddress;
    const tokenAddress = req.params.tokenAddress;
    const tokenAbi = ["function balanceOf(address) view returns (uint256)"];
    const provider = new ethers.JsonRpcProvider(ethereumNodeURL);

    // Get the balance of the ERC-20 token at the specified timestamp
    const tokenContract = new ethers.Contract(tokenAddress, erc20, provider);
    const tokenBalance = await tokenContract.balanceOf(address);

    console.log("response", tokenBalance);
    return res.json({ balance: bigIntToDecimal(tokenBalance) });
  } catch (error) {
    console.log("error", error);
    res.status(500).json(JSON.stringify(error));
  }
};

module.exports = { getBalance };

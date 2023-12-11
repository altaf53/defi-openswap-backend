const ethers = require("ethers");
const contractAddress = "0x1bcf8D19a948Fb853fd8fce84a962C3DAd9c1A5C";
const erc20ContractAddress = "0x779877A7B0D9E8603169DdbD7836e478b4624789";
const { openSwapABI } = require("../ABI/openSwap");
const { erc20 } = require("../ABI/ERC-20");

const ethereumNodeURL = `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`;

const provider = new ethers.JsonRpcProvider(ethereumNodeURL);
const contract = new ethers.Contract(contractAddress, openSwapABI, provider);
const erc20Contract = new ethers.Contract(
  erc20ContractAddress,
  erc20,
  provider
);

const getQuote = async (quoteParams) => {
  try {
    const quoteData = await contract.quote(
      quoteParams.tokenIn,
      quoteParams.tokenOut,
      quoteParams.amountIn
    );
    console.log("quoteData", quoteData);
    return quoteData;
  } catch (error) {
    console.error("error getQuote", error);
    throw new Error("An error occurred while getting the quote.");
  }
};

const getTokenInfo = async (address) => {
  try {
    const tokenInfo = await contract.tokenInfo(address);
    console.log("tokenInfo", tokenInfo);
    return tokenInfo;
  } catch (error) {
    console.error("error getTopkenInfo", error);
    throw new Error("An error occurred while getting the getTokenInfo.");
  }
};

const erc20Approve = async (address, contractAdd, amount) => {
  try {
    const params = [contractAddress, amount];
    const erc20Contract = new ethers.Contract(
      contractAdd,
      erc20,
      provider
    );
    
    const data = erc20Contract.interface.encodeFunctionData("approve", params);

    const transactionObject = {
      to: contractAdd,
      data: data,
      chainId: "11155111",
      from: address,
    };
    return transactionObject;
  } catch (error) {
    console.error("error erc20Approve", error);
    throw new Error("An error occurred while getting the erc20Approve.");
  }
};

const addLiquidity = async (userAddress, tokenAddress, amount) => {
  try {
    const params = [tokenAddress, amount];
    const data = contract.interface.encodeFunctionData("addLiquidity", params);

    const transactionObject = {
      to: contractAddress,
      data: data,
      chainId: "11155111",
      from: userAddress,
    };
    return transactionObject;
  } catch (error) {
    console.error("error addLiquidity", error);
    throw new Error("An error occurred while getting the addLiquidity.");
  }
};

const swap = async (userAddress, tokenIn, tokenOut, amountIn, amountOutMin) => {
  try {
    console.log(userAddress, tokenIn, tokenOut, amountIn, amountOutMin);
    const params = [tokenIn, tokenOut, amountIn, amountOutMin];
    const data = contract.interface.encodeFunctionData("swap", params);
    const transactionObject = {
      to: contractAddress,
      data: data,
      chainId: "11155111",
      from: userAddress,
    };
    return transactionObject;
  } catch (error) {
    console.error("error swap", error);
    throw new Error("An error occurred while getting the swap.");
  }
};

module.exports = { getQuote, getTokenInfo, erc20Approve, addLiquidity, swap };

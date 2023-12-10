const ethers = require("ethers");
const address = "0x1bcf8D19a948Fb853fd8fce84a962C3DAd9c1A5C";
const { openSwapABI } = require("../ABI/openSwap");
const ethereumNodeURL = `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`;

const provider = new ethers.JsonRpcProvider(ethereumNodeURL);
const contract = new ethers.Contract(address, openSwapABI, provider);

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

module.exports = { getQuote };

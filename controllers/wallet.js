const { Web3 } = require("web3");
const ethereumNodeURL = `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`;
const { getQuote } = require("../services/openSwap");
const ethers = require("ethers");

const getBalance = async (req, res, next) => {
  try {
    const web3 = new Web3(new Web3.providers.HttpProvider(ethereumNodeURL));
    const hexaBalance = await web3.eth.getBalance(
      req.params.walletId,
      "latest"
    );

    const etherBalance = web3.utils.fromWei(hexaBalance, "ether");
    const tokenDecimals = 18;
    const userAmount = 1;
    const amountInDecimal = ethers.parseUnits(
      userAmount.toString(),
      tokenDecimals
    );
    console.log("amountInDecimal", amountInDecimal.toString());
    const quote = await getQuote({
      tokenIn: "0x39A4269650B394159Ac6147e48A88f5345316FB1",
      tokenOut: "0x779877A7B0D9E8603169DdbD7836e478b4624789",
      amountIn: amountInDecimal.toString(),
    });
    console.log("response", etherBalance);
    return res.json(quote);
  } catch (error) {
    console.log("error", error);
    res.status(500).json(JSON.stringify(error));
  }
};

module.exports = { getBalance };

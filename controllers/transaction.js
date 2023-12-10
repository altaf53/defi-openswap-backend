const {
  getQuote,
  getTokenInfo,
  erc20Approve,
  addLiquidity,
  swap,
} = require("../services/openSwap");
const ethers = require("ethers");
const { bigIntToDecimal } = require("../utils/helper");
const tokenDecimals = 18;

const getQuoteFromOpenSwap = async (req, res, next) => {
  try {
    const userAmount = req.body.amount;
    const amountInDecimal = ethers.parseUnits(
      userAmount.toString(),
      tokenDecimals
    );
    const quote = await getQuote({
      tokenIn: req.body.tokenIn,
      tokenOut: req.body.tokenOut,
      amountIn: amountInDecimal.toString(),
    });

    return res.json({
      amountOut: bigIntToDecimal(quote[0], tokenDecimals),
      fees: bigIntToDecimal(quote[1], tokenDecimals),
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json(JSON.stringify(error));
  }
};

const getTokenInfoFromOpenSwap = async (req, res, next) => {
  try {
    const info = await getTokenInfo(req.params.address);
    return res.json({ balance: bigIntToDecimal(info[1], tokenDecimals) });
  } catch (error) {
    console.log("error", error);
    res.status(500).json(error);
  }
};

const deposit = async (req, res, next) => {
  try {
    const amountInDecimal = ethers.parseUnits(
      req.body.amount.toString(),
      tokenDecimals
    );
    const txn = await addLiquidity(
      req.body.userAddress,
      req.body.tokenAddress,
      amountInDecimal
    );
    return res.json(txn);
  } catch (error) {
    console.log("error", error);
    res.status(500).json(error);
  }
};

const approve = async (req, res, next) => {
  try {
    const amountInDecimal = ethers.parseUnits(
      req.body.amount.toString(),
      tokenDecimals
    );
    const txn = await erc20Approve(req.body.address, amountInDecimal);
    return res.json(txn);
  } catch (error) {
    console.log("error", error);
    res.status(500).json(error);
  }
};

const swapTransaction = async (req, res, next) => {
  try {
    const amountInDecimal = ethers.parseUnits(
      req.body.amountIn.toString(),
      tokenDecimals
    );
    const txn = await swap(
      req.body.userAddress,
      req.body.tokenIn,
      req.body.tokenOut,
      amountInDecimal,
      req.body.amountOutMin
    );
    return res.json(txn);
  } catch (error) {
    console.log("error", error);
    res.status(500).json(error);
  }
};

module.exports = {
  getQuoteFromOpenSwap,
  getTokenInfoFromOpenSwap,
  approve,
  deposit,
  swapTransaction,
};

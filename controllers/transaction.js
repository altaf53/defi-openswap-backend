const { getQuote } = require("../services/openSwap");
const ethers = require("ethers");
const { bigIntToDecimal } = require("../utils/helper");

const getQuoteFromOpenSwap = async (req, res, next) => {
  try {
    const tokenDecimals = 18;
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

module.exports = { getQuoteFromOpenSwap };

const express = require("express");
const transactionRoutes = express.Router({ mergeParams: true });
const { transactionController } = require("../controllers");

transactionRoutes.post(
  "/get-quote",
  transactionController.getQuoteFromOpenSwap
);
transactionRoutes.get(
  "/get-token-info/:address",
  transactionController.getTokenInfoFromOpenSwap
);

transactionRoutes.post("/approve", transactionController.approve);

transactionRoutes.post("/deposit", transactionController.deposit);

transactionRoutes.post("/swap", transactionController.swapTransaction);

module.exports = transactionRoutes;

const express = require("express");
const transactionRoutes = express.Router({ mergeParams: true });
const { transactionController } = require("../controllers");

transactionRoutes.post(
  "/get-quote",
  transactionController.getQuoteFromOpenSwap
);

module.exports = transactionRoutes;

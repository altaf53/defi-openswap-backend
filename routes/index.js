const express = require("express");
const walletRoutes = require("./wallet");
const transactionRoutes = require("./transaction");

const apiRoutes = express.Router();

apiRoutes.use("/wallet", walletRoutes);
apiRoutes.use("/transaction", transactionRoutes);

module.exports = apiRoutes;

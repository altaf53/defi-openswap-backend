const express = require("express");
const walletRoutes = require("./wallet");
const transactionRoutes = require("./transaction");
const tokensRoutes = require("./tokens.route");

const apiRoutes = express.Router();

apiRoutes.use("/wallet", walletRoutes);
apiRoutes.use("/transaction", transactionRoutes);
apiRoutes.use("/token",tokensRoutes)

module.exports = apiRoutes;

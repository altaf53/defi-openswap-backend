const express = require("express");
const walletRoutes = require("./wallet");

const apiRoutes = express.Router();

apiRoutes.use("/wallet", walletRoutes);

module.exports = apiRoutes;

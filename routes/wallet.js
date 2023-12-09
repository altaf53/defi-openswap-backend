const express = require("express");
const walletRoutes = express.Router({ mergeParams: true });
const { walletController } = require("../controllers");

walletRoutes.get("/get-balance/:walletId", walletController.getBalance);

module.exports = walletRoutes;

const express = require("express");
const { getAllTokens, getUserHistory, getUserInfo } = require("../controllers/tokens.controller");
const tokensRoutes = express.Router({ mergeParams: true });

tokensRoutes.post("/tokeninfo",getAllTokens);
tokensRoutes.post("/userSupplyHistory",getUserHistory);
tokensRoutes.post("/userInfo",getUserInfo)

module.exports = tokensRoutes
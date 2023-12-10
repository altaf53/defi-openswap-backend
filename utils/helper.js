const ethers = require("ethers");

const bigIntToDecimal = (bigIntValue, decimalPlaces) => {
  return ethers.formatUnits(bigIntValue, decimalPlaces);
};

module.exports = { bigIntToDecimal };

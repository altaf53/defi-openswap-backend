const { Web3 } = require("web3");
const ethereumNodeURL = `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`;

const getBalance = async (req, res, next) => {
  try {
    const web3 = new Web3(new Web3.providers.HttpProvider(ethereumNodeURL));
    const hexaBalance = await web3.eth.getBalance(
      req.params.walletId,
      "latest"
    );

    const etherBalance = web3.utils.fromWei(hexaBalance, "ether");

    console.log("response", etherBalance);
    return res.json(etherBalance);
  } catch (error) {
    console.log("error", error);
    res.status(500).json(JSON.stringify(error));
  }
};

module.exports = { getBalance };

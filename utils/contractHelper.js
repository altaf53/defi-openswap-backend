const ethers = require("ethers");
const { erc20 } = require("../ABI/ERC-20");
const dotenv = require("dotenv");
dotenv.config()


const getcontractSymbol = async (contractAddress) => {
    const provider = await getProvider();
    const erc20Contract = new ethers.Contract(
        contractAddress,
        erc20,
        provider
    );

    const symbol = await erc20Contract.symbol();
    console.log( symbol);
    return symbol;
} 

const contractsymbolAdder = async (arrayOfTokensInfo) => {
    for(let i = 0; i < arrayOfTokensInfo.length; i++){
        const symbol = await getcontractSymbol(arrayOfTokensInfo[i].token);
        arrayOfTokensInfo[i].symbol = symbol;
    }
    console.log("arrray final ", arrayOfTokensInfo);
    return arrayOfTokensInfo;
}

const getProvider = async () => {
    const ethereumNodeURL = `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`;
    const provider = new ethers.JsonRpcProvider(ethereumNodeURL);
    return provider
}

module.exports = { getcontractSymbol, contractsymbolAdder };
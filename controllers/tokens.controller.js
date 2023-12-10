const { types } = require("web3");
const { fetchAllTokensFromSubgraph, fetchUserSupplyHistory, fetchUserInfo } = require("../services/tokens.services")



const getAllTokens = async (req,res) => {
    try {
        const result = await fetchAllTokensFromSubgraph();
        console.log("result ",result)

        if(!result.data){
            throw new TypeError(result.message);
        }

        return res.status(200).json({result: result.data})

    } catch(err) {
        if(err instanceof TypeError){
            return res.status(400).json({result: err.message});
        }
        return res.status(500).json({result: err.message });
    }
}

const getUserHistory = async (req,res) => {
    try {
        const {userAddress} = req.body;

        if(!userAddress){
            throw new TypeError("Need user address for query");
        }

        const result = await fetchUserSupplyHistory(userAddress);
        console.log("result from con ",result)
        if(!result.data){
            throw new TypeError(result.message);
        }

        return res.status(result.statusCode).json({result: result.data})

    } catch(err) {
        if(err instanceof TypeError){
            return res.status(400).json({
                result: err.message
            })
        }

        return res.status(500).json({result: err.message});
    }
}

const getUserInfo = async (req,res) => {
    try {
        const {userAddress} = req.body;

        if(!userAddress){
            throw new TypeError("Need user address for query")
        }

        const result = await fetchUserInfo(userAddress);
        console.log("result  ",result)
        if(!result.data){
            throw new TypeError(result.message);
        }

        return res.status(200).json({result: result.data});

    } catch(err) {
        if(err instanceof TypeError){
            return res.status(404).json({result: err.message})
        }
        return res.status(500).json({result: err.message})
    }
}

module.exports = { getAllTokens, getUserHistory, getUserInfo }
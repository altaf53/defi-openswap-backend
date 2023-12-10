const axios = require('axios');
const { openSwapSubgrpahUrl, querytokenPool, queryUserSuppliedTokensHistory, queryUserInfo } = require('../utils/query');
const { contractsymbolAdder } = require('../utils/contractHelper');


const fetchAllTokensFromSubgraph = async () => {
    try {
        const result = await axios.post(
                openSwapSubgrpahUrl,
                {
                    query:querytokenPool,
                }
            ); 
            
            if(result.data.error){
                throw new TypeError(result.data.error.message)
            }
            console.log ("Query result: \n", result.data.data, result.data);

            const finalData = await contractsymbolAdder(result.data.data.tokenPools);

            console.log("final data", finalData)

            return {
                data: result.data.data, message: "Success"
            }
    } catch (err){
        console.log(err);
        if(err instanceof TypeError){
            return {
                data: false, message: err.message
            }
        }
        return {
            data: false, message: err.message
        }
    }
}

const fetchUserSupplyHistory = async (userAddress) => {
    try {
        const query = queryUserSuppliedTokensHistory(userAddress);

        const result = await axios.post(
            openSwapSubgrpahUrl,
            {
                query:query,
            }
        ); 

        if(result.data.error){
            throw new TypeError(result.data.error.message)
        }

        return {
            data: result.data.data, message: "Success", statusCode: 200
        }

    } catch(err) {
        if(err instanceof TypeError){
            return {
                data: false, message: err.message, statusCode: 404
            }
        }
        return {
            data: false, message: err.message, statusCode: 500
        }
    }
}

const fetchUserInfo = async (address) => {
    try {
        const query = queryUserInfo(address);

        const result = await axios.post(
            openSwapSubgrpahUrl,
            {
                query:query,
            }
        ); 

        if(result.data.error){
            throw new TypeError(result.data.error.message)
        }

        return {
            data: result.data.data, message: "Success", statusCode: 200
        }

    } catch(err) {
        if(err instanceof TypeError){
            return {
                data: false, message: err.message, statusCode: 404
            }
        }
        return {
            data: false, message: err.message, statusCode: 500
        }
    }
}

module.exports = { fetchAllTokensFromSubgraph, fetchUserSupplyHistory, fetchUserInfo }
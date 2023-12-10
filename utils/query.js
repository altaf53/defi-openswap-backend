const openSwapSubgrpahUrl = "https://api.studio.thegraph.com/query/60995/openswapv2/version/latest"
const querytokenPool = `
{
    tokenPools {
        id
        createdAtTimestamp
        token
        poolBalance
    }
} 
`

const queryUserInfo = (address) => `
query MyQuery {
    user(id: "${address}") {
      id
      lastInteractedAtTimestamp
      lastRewardedBlock
      rewardEarnedValueInUsd
      suppliedValueInUsd
      createdAtTimestamp
      address
    }
}
`

const queryUserSuppliedTokensHistory = (address) => `
query MyQuery {
    userSuppliedTokens(where: {user: "${address}"}) {
      id
      timestamp
      token
      user
      hash
      amount
    }
  }
`

module.exports = { openSwapSubgrpahUrl, queryUserInfo, querytokenPool, queryUserSuppliedTokensHistory }
const { deployments, getNamedAccounts } = require("hardhat");



module.exports = async({ deployments, getNamedAccounts }) => {
    const {deploy} = await deployments
    const {firstAccount, secondAccount} = await getNamedAccounts()
    
    const USDTToken = await deploy("USDTToken", {
        from: firstAccount,
        args: [],
        log: true,
    })
    console.log(`USDTToken is deployed success, address:  ${USDTToken.address}`)
}


// const { deployments, getNamedAccounts, ethers } = require("hardhat");


module.exports = async({deployments, getNamedAccounts}) => {
    const {deploy} = await deployments
    const {firstAccount, secondAccount} = await getNamedAccounts()
    const usdt = await deployments.get("USDTToken")
    // const USDTToken = await ethers.getContractAt("USDTToken", usdt.address)
    const IdoToken = await deploy("IDOToken", {
        from: firstAccount,
        args: [usdt.address],
        log: true,
    })

    console.log(`IdoToken deployed success, address:  ${IdoToken.address}`)
}
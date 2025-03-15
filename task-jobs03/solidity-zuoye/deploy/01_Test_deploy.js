// const { getNamedAccounts, deployments } = require("hardhat");



module.exports = async({getNamedAccounts, deployments}) =>{
    const {deploy} = await deployments;
    const { firstAccount } = await getNamedAccounts();
    console.log("3333333"+ firstAccount)
    const testExample = await deploy("Test", {
        from: firstAccount,
        args: [firstAccount],
        log: true
    })
    console.log(`Test contract address is:  ${testExample.address}`)
}
module.exports.tags = ["Test", "test"]


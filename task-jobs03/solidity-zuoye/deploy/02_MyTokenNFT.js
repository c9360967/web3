

const {deployments, getNamedAccount, getNamedAccounts} = require("hardhat")

module.exports = async({deployments, getNamedAccounts}) => {
    const {deploy} = await deployments;
    const {firstAccount,secondAccount} = await getNamedAccounts();

    const myTokenExample = await deploy("MyToken", {
        from: firstAccount,
        args: [],
        log: true
    })
    console.log(`myTokenExample deploy success, address is:  ${myTokenExample.address}`)
}
exports.tags = ["test"]



module.exports = async ({ deployments, getNamedAccounts }) => {
    const { deploy } = await deployments;
    const { firstAccount, secondAccount } = await getNamedAccounts();

    const newToken = await deploy("RCCToken", {
        from: firstAccount,
        args: [],
        log: true
    })

    console.log(`RCCToken deployed success address: ${newToken.address}`)
}


module.exports.tags = ["test", "product", "deploy"]
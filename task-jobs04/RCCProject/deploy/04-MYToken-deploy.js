module.exports = async ({ deployments, getNamedAccounts }) => {
    const { deploy } = await deployments;
    const { firstAccount, secondAccount } = await getNamedAccounts();

    const MyToken = await deploy("MyToken", {
        from: firstAccount,
        args: [],
        log: true
    })

    console.log(`MyToken deployed success address: ${MyToken.address}`)
}

module.exports.tags = ["test", "product", "deploy"]
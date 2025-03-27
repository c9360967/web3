

module.exports = async ({ deployments, getNamedAccounts }) => {
    const {deploy} = await deployments;
    const {firstAccount,secondAccount} = await getNamedAccounts();
    const RCCToken = await deployments.get("RCCToken");
    // const feature = await deploy("Feature", {
    //     from: firstAccount,
    //     args: [],
    //     log: true
    // })
    // 1. 部署逻辑合约（Logic Contract）
    const Feature = await ethers.getContractFactory("Feature");
    const contract = await upgrades.deployProxy(Feature, [RCCToken.address, 6, 20, 1], {
        kind: "uups", // 指定 UUPS 模式
        initializer: "initialize", // 初始化函数名称
    });

    // 等待部署完成
    await contract.deployed();
    console.log("Proxy deployed to:", contract.address);

    // console.log(`feature deployed success, address: ${feature.address}`)

   


}


module.exports.tags = ["test", "product","feature"]
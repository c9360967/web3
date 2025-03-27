const { ethers, network, upgrades } = require("hardhat");
const { ethers: ethersJs } = require("ethers");
const wallet_privateKey = "0x3f9623ddec46f37213e228971c1d44963e21f60fd61e50c72a1ccdddcbf23f97"
const networkUrl = network.config.url
const provider = new ethersJs.JsonRpcProvider(networkUrl)
const abi = [
    "function upgradeTo( address newImplementation, bytes memory funSign) external"
]
const wallet = new ethersJs.Wallet(wallet_privateKey, provider)

module.exports = async ({ deployments, getNamedAccounts }) => {
    const { deploy } = await deployments;
    const { firstAccount, secondAccount } = await getNamedAccounts();
    // const FeatureV2 = await deploy("FeatureV2", {
    //     from: firstAccount,
    //     args: [],
    //     log: true
    // })


    const FeatureV2 = await ethers.getContractFactory("FeatureV2")
    const logicV2 = await FeatureV2.deploy();
    await logicV2.waitForDeployment();
    const proxy = await deployments.get("FeatureProxy")
    // 手动注册代理到插件系统（可选）
    await upgrades.forceImport(proxy.address, FeatureV2, {
        kind: 'uups',
        implementation: await logicV2.getAddress()
    });
    const featureV2 = await upgrades.upgradeProxy(proxy.address, FeatureV2)
    console.log(`upgrade deployed success, address: ${logicV2.target}`)
    console.log("33333333333", featureV2.target)
    console.log("be upgrading contract......")
    const blockNumber = await provider.getBlockNumber()
    console.log("upgrade: blockNumber: ", blockNumber)
    const startBlock = blockNumber + 30
    const endBlock = startBlock + 200
    const RCCToken = await deployments.get("RCCToken")
    const RRccPerBlock = 1
    const args = [RCCToken.address, startBlock, endBlock, RRccPerBlock]
    const proxiedV2 = await ethers.getContractAt("FeatureV2", proxy.address)
    const v2Initialize = await ethers.getContractAt("FeatureV2", logicV2.target)
    const initCalldata = v2Initialize.interface.encodeFunctionData("v2Initialize", args);
    await proxiedV2.v2Initialize(initCalldata)

    // console.log("upgrade: Trigger contract escalation......")
    // // const FeatureProxy = await ethers.getContractAt("FeatureProxy", proxy.address)





    // const FeatureProxy = await ethers.getContractAt("Feature", proxy.address)
    // await FeatureProxy.upgradeTo(logicV2.target);



}


module.exports.tags = ["upgrade"]

// const FeatureProxy = await ethers.getContractAt("FeatureProxy", proxy.address)
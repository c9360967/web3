const { ethers, upgrades, deployments, network } = require("hardhat")
const {ethers: ethersJs} = require("ethers");
const fs = require("fs");
const path = require("path");
const envPath = path.join(__dirname, '../.env');

const networkUrl = network.config.url
const provider = new ethersJs.JsonRpcProvider(networkUrl)


module.exports = async () => {
    const Feature = await ethers.getContractFactory("Feature");
    const RccToken = await deployments.get("RCCToken")
    const blockNumber = await provider.getBlockNumber();
    const startBlock = blockNumber + 1;
    const endBlock = startBlock + 67200;
    // 2. 部署代理合约（UUPS 模式）
    console.log("Deploying proxy contract...");
    const contract = await upgrades.deployProxy(Feature, [RccToken.address, startBlock, endBlock, 1], {
        kind: "uups", // 指定 UUPS 模式
        initializer: "initialize", // 初始化函数名称
    });

    // 3. 等待部署完成
    await contract.waitForDeployment();
    console.log("Proxy deployed to:", contract.target);
    fs.writeFileSync(envPath, `PROXY_ADDRESS=${contract.target}\n`);
}

module.exports.tags = ["deploy"];
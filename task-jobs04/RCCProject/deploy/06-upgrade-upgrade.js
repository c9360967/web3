const {ethers} = require("hardhat");
require("dotenv").config();


module.exports = async () => {
    const featureV2 = await ethers.getContractFactory("FeatureV2");
    const proxy_address = process.env.PROXY_ADDRESS;
    // 3. 升级代理合约，指向新的逻辑合约
    console.log("proxy address is: ", proxy_address)
    console.log("Upgrading proxy contract...");
    const upgradedContract = await upgrades.upgradeProxy(proxy_address, featureV2);
    // 4. 等待升级完成
    await upgradedContract.waitForDeployment(); // 使用 waitForDeployment 替代 deployed()
    console.log("Proxy upgraded to new logic contract at:", await upgradedContract.getAddress()); // 使用 getAddress() 获取地址
    const contract = await upgrades.deployProxy(featureV2, [], {
        kind: "uups", // 指定 UUPS 模式
        initializer: "v2initialize", // 初始化函数名称
    });

}
module.exports.tags = ["upgrade"]
const {ethers, upgrades, deployments} = require("hardhat")

module.exports = async()=>{
    const Feature = await ethers.getContractFactory("Feature");
    const RccToken = await deployments.get("RCCToken")
    // 2. 部署代理合约（UUPS 模式）
    console.log("Deploying proxy contract...");
    const contract = await upgrades.deployProxy(Feature, [RccToken.address, 5,20, 1], {
        kind: "uups", // 指定 UUPS 模式
        initializer: "initialize", // 初始化函数名称
    });

    // 3. 等待部署完成
    await contract.waitForDeployment();
    console.log("Proxy deployed to:", contract.target);
    // --------------------------------
    const featureV2 = await ethers.getContractFactory("FeatureV2");
    // 3. 升级代理合约，指向新的逻辑合约
    console.log("Upgrading proxy contract...");
    const upgradedContract = await upgrades.upgradeProxy(contract.target, featureV2);
    // 4. 等待升级完成
    await upgradedContract.waitForDeployment(); // 使用 waitForDeployment 替代 deployed()
    console.log("Proxy upgraded to new logic contract at:", await upgradedContract.getAddress()); // 使用 getAddress() 获取地址

}

module.exports.tags = ["all"]
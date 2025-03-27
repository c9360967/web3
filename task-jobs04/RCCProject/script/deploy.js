// scripts/deploy.js
const { ethers, upgrades } = require("hardhat");

async function main() {
    // 1. 部署逻辑合约（Logic Contract）
    const Feature = await ethers.getContractFactory("Feature");
    const contract = await upgrades.deployProxy(Feature, [], {
        kind: "uups", // 指定 UUPS 模式
        initializer: "initialize", // 初始化函数名称
    });

    // 等待部署完成
    await contract.deployed();
    console.log("Proxy deployed to:", contract.address);
}

main();


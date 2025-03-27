// scripts/upgrade.js
const { ethers, upgrades } = require("hardhat");

async function main() {
    // 1. 部署新的逻辑合约
    const MyContractV2 = await ethers.getContractFactory("MyContractV2");

    // 2. 升级代理合约
    const proxyAddress = "0x..."; // 代理合约地址
    await upgrades.upgradeProxy(proxyAddress, MyContractV2, {
        kind: "uups",
        call: { fn: "initializeV2", args: [newArg] }, // 可选：调用新初始化函数
    });

    console.log("Proxy upgraded to V2");
}

main();
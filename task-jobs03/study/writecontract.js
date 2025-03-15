
const {ethers} = require("ethers");
const fs = require('fs');
const wallet1_privateKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
const wallet2_privateKey = "0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d"
const contractAbi = JSON.parse(fs.readFileSync('./TestAbi.json', 'utf8'))['abi']
const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545")
const wallet1 = new ethers.Wallet(wallet1_privateKey, provider)
const wallet2 = new ethers.Wallet(wallet2_privateKey, provider)
const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
const contractExample = new ethers.Contract(contractAddress, contractAbi, wallet1)
const contractExample2 = new ethers.Contract(contractAddress, contractAbi, wallet2)

async function main() {
    //可调用合约的写入方法
    let ownerAddress = await contractExample.getOwner();
    console.log(`未修改合约owner地址: ${ownerAddress}`);
    const setOwner = await contractExample2.setOwner(wallet2.address);
    ownerAddress = await contractExample.getOwner();
    console.log(`owner地址修改为wallet2.address: ${ownerAddress}`)
    let contractBalance = await contractExample.getContractBalance();
    console.log(`合约初始余额: ${contractBalance}`) 
    // const transder = await contractExample.collection({value: ethers.parseEther("1")}) //尽量将两个写入操作放入不同的函数中，不然nonce会报错
    // contractBalance = await contractExample.getContractBalance();
    // console.log(`发送1eth之后的合约余额: ${contractBalance}`);

}

main()
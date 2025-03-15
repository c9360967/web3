const { ethers } = require("ethers");
const fs = require('fs');
const wallet1_privateKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
const wallet2_privateKey = "0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d"
const contractAbi = JSON.parse(fs.readFileSync('./TestAbi.json', 'utf8'))['abi']
const myTokenAbi = JSON.parse(fs.readFileSync('./MyTokenAbi.json', 'utf8'))['abi']
const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545")
const wallet1 = new ethers.Wallet(wallet1_privateKey, provider)
const wallet2 = new ethers.Wallet(wallet2_privateKey, provider)
const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
const myTokenContractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
const contractExample = new ethers.Contract(contractAddress, contractAbi, wallet1)
const contractExample2 = new ethers.Contract(contractAddress, contractAbi, wallet2)
const myTokenContractExample = new ethers.Contract(myTokenContractAddress, myTokenAbi, wallet1)
const myTokenContractExample2 = new ethers.Contract(myTokenContractAddress, myTokenAbi, wallet2)


module.exports= {
    wallet1_privateKey,
    wallet2_privateKey,
    provider,
    wallet1,
    wallet2,
    contractExample,
    contractExample2,
    myTokenContractExample,
    myTokenContractExample2
}
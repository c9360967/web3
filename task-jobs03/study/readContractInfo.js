const {ethers} = require("ethers")
const fs = require("fs")

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545")
const contractAbi = JSON.parse(fs.readFileSync('./TestAbi.json', 'utf8'))['abi']
const contractExample = new ethers.Contract(contractAddress, contractAbi, provider)
const wallet1_privateKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
const wallet1 = new ethers.Wallet(wallet1_privateKey, provider)
//将只读合约实例变为可写合约实例
const writeContractExample = contractExample.connect(wallet1)

const main = async() => {
    //调用合约中的方法
    const balance = await contractExample.getContractBalance()
    console.log(`合约余额: ${balance}`)
    const owner = await contractExample.getOwner()
    console.log(`合约拥有者: ${owner}`)


}
main()
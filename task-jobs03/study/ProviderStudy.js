const {ethers} = require("ethers")
const { blockscout } = require("../hardhat.config")
const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545")
let wallet_address = "0x824E496df215FC1fBd4B37fd90078D86839De1d6"
let contractAddress = "0xFa90928d9F31FEBD2eCae419F77B6538fF305184"

const main = async() => {
    let balance = await provider.getBalance(wallet_address)
    console.log(`balance为: ${ethers.formatEther(balance)}ETH`)
    let network = await provider.getNetwork()
    console.log("区块链信息为:")
    console.log(network.toJSON())
    let blokcNumber = await provider.getBlockNumber()
    console.log(`当前区块高度: ${blokcNumber}`)
    let txCount = await provider.getTransactionCount(wallet_address)
    console.log("wallet_address历史交易次数 " + txCount)
    let feeData = await provider.getFeeData();
    console.log("查询当前建议的gas设置")
    console.log(feeData)
    let blockInfo = await provider.getBlock()
    console.log("查询当前区块信息")
    console.log(blockInfo)
    let bytesCode = await provider.getCode(contractAddress)
    console.log("查询合约字节码")
    console.log(bytesCode)
    
}

main()
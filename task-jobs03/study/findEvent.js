const {ethers} = require("ethers")
const fs = require('fs');
const wallet1_privateKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
const contractAbi = JSON.parse(fs.readFileSync('./TestAbi.json', 'utf8'))['abi']
const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545")
const wallet1 = new ethers.Wallet(wallet1_privateKey, provider)
const contractAddress = "0x0B306BF915C4d645ff596e518fAf3F9669b97016"
const contractExample = new ethers.Contract(contractAddress, contractAbi, wallet1)

async function main() {
    const blockNumber = await provider.getBlockNumber()
    const owner = await contractExample.getOwner() //触发函数中的事件
    const LogEvent = await contractExample.queryFilter("Log", blockNumber-10, blockNumber)
    // console.log(LogEvent)
    // console.log(LogEvent.length)
    // console.log("最新的事件信息")
    // console.log(LogEvent[0])
    console.log(`owner地址为: ${LogEvent[0].args[0]}, 当前合约的余额为； ${LogEvent[0].args[1]}`) //如果事件中的传入参数存在名称的话可以使用LogEvent[0].args[“参数名称”]

}

const testListenContractEcent = async () => {
    await contractExample.collection({value: ethers.parseEther("3")})
}

testListenContractEcent()

// main()

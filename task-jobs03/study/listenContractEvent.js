const { ethers } = require("ethers")
const fs = require('fs');
const wallet1_privateKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
const contractAbi = JSON.parse(fs.readFileSync('./TestAbi.json', 'utf8'))['abi']
const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545")
const wallet1 = new ethers.Wallet(wallet1_privateKey, provider)
const contractAddress = "0x0B306BF915C4d645ff596e518fAf3F9669b97016"
const contractExample = new ethers.Contract(contractAddress, contractAbi, wallet1)

const main = async ()=>{
    // const owner = await contractExample.getOwner();
    contractExample.on("ReceiveEth", (from, to, value) =>{ //from，to，value是合约中定义的事件传入参数名
        console.log(`触发事件${from} ----> ${to}   ${ethers.formatUnits(ethers.getBigInt(value), "ether")}ETH`)
    })

}

main()
const {ethers} = require("ethers")
const { contractAbi, contractExample }  = require('./common')

const abi = [
    " function getOwner() public returns(address)"
]
async function main() {

    const interface = new ethers.Interface(abi) // 利用ethers生成interface变量

    // const inface = contractExample.interface  //从合约中获取
    // const hashSig = interface.getSighash("getOwner") //获取函数签名
    // console.log(`getOwner的函数签名为: ${hashSig}`)

    const ownerEncode = interface.encodeFunctionData("getOwner")
    console.log(`owner地址编码结果: ${ownerEncode}`)
    const ownerDecode = interface.decodeFunctionData("getOwner", ownerEncode)
    console.log(`owner地址的解码结果: ${ownerDecode}`)


}

main()
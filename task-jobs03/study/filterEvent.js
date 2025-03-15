const { ethers } = require("ethers")
const { contractExample, wallet1, wallet2 } = require("./common")

//一般和事件监听器一起使用
const main = async () => {
    //过滤来自wallet1.address的ReceiveEth事件
    let filter = contractExample.filters.ReceiveEth(wallet1.address)
    console.log("过滤来自wallet1.address的ReceiveEth事件详情")
    console.log(filter)
    //过滤所有发给wallet1.address的ReceiveEth事件
    filter = contractExample.filter.ReceiveEth(null, wallet1.address)
    //g过滤所有从wallet1.address发给wallet2.address的ReceiveEth事件
    filter = contractExample.filter.ReceiveEth(wallet1.address, wallet2.address)
    //过滤所有发送给wallet1.address或者wallet2.address的ReceiveEth事件
    filter = contractExample.filter.ReceiveEth(null, [wallet1.address, wallet2.address])
    contractExample.on(filter, (res)=> {
        console.log(`${res.args["from"]} ----> ${res.args[1]}   ${ethers.formatUnits(ethers.getBigInt(res.args[2]), "ether")}ETH`)
    })
}

main()
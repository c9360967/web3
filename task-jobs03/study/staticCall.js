const {ethers} = require("ethers")
const { contractExample, wallet1 } = require("./common")

const main = async() => {
    const tx = await contractExample.getContractBalance.staticCall()
    console.log("staticCall调用成功示例"+ ethers.formatUnits(ethers.getBigInt(tx), "ether"))

    const tx1 = await contractExample.collection({value: ethers.parseEther("20000")}, {from:wallet1.address})
    console.log("调用失败案例: "+ tx1)
}

main()
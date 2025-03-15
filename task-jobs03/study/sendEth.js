const {ethers} = require("ethers")
const wallet1_privateKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
const wallet2_privateKey = "0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d"
const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545")
const wallet1 = new ethers.Wallet(wallet1_privateKey, provider)
const wallet2 = new ethers.Wallet(wallet2_privateKey, provider)

const main = async() => {

    console.log(`发送前wallet1的钱包余额: ${ethers.formatEther(await provider.getBalance(wallet1))}ETH`)
    console.log(`发送前wallet2的钱包余额: ${ethers.formatEther(await provider.getBalance(wallet2))}ETH`)

    const tx = await wallet1.sendTransaction({
        to: wallet2.address,
        value: ethers.parseEther("2")
    }) //发送交易
    const receipt = await tx.wait()  //等待交易完成
    console.log("链上交易信息")
    console.log(receipt)
    console.log(`发送后wallet1的钱包余额: ${ethers.formatEther(await provider.getBalance(wallet1))}ETH`)
    console.log(`发送后wallet2的钱包余额: ${ethers.formatEther(await provider.getBalance(wallet2))}ETH`)

}

main()
const {ethers} = require("ethers")

// const wallet1 = ethers.Wallet.createRandom() //生成随机钱包


//通过while循环加正则再结合生成随机钱包匹配生成自己想要的钱包
let isMyWallet = false
let wallet1;
let regx = /^0x888.*$/
while(!isMyWallet){
    wallet1 = ethers.Wallet.createRandom()
    isMyWallet = regx.test(wallet1.address)
    console.log("随机钱包地址： " + wallet1.address)

}

console.log("靓号地址: " + wallet1.address)
console.log("靓号私钥: " + wallet1.privateKey)
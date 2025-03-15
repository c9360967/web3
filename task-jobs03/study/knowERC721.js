const {ethers} = require("ethers")
const { wallet1, myTokenContractExample } = require("./common")


const main = async() => {
    const name = await myTokenContractExample.name()
    console.log(`NFT721合约的名称: ${name}`)
    const symbol = await myTokenContractExample.symbol()
    console.log(`NFT721合约的简称: ${symbol}`)
    const selectorERC721 = "0x80ac58cd"
    const isERC721 = await contractERC721.supportsInterface(selectorERC721)
    console.log("是否是ERC721合约： " + isERC721)
}

main()
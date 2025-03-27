require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-ethers");
require("hardhat-deploy");
require("hardhat-deploy-ethers");
require("@openzeppelin/hardhat-upgrades")


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
  ganache: {
      url: "http://127.0.0.1:8545",
      // name: "ganache",
      // chainId: 1337,
      accounts: ['0x99a408b95eb4fd53db6d9dff0d25bf7afdc704db444d91045b4a78148886beed', '0xbf98cb28f685c9b83333546f87b2392292b5e61436713f3dfcd281e59600ec0f']
    },
    // hardhat: {
    //   websockets: true,
    // }
  },
  namedAccounts: {
    firstAccount: {
      default: 0
    },
    secondAccount: {
      default: 1
    }
  }
};

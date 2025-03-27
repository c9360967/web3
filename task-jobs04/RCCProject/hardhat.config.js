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
      accounts: ['0x1ccec80afd93f913e59cb1df9391da75bc51d82f1686eb2f92c8713cca8c7dc4', '0xb24900720bdea34cb6025fd45deba62e8144e6ecc9e0b9b91be85a59ae9fb9f2']
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


require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-ethers");
require("hardhat-deploy");
require("hardhat-deploy-ethers");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    ganache: {
      url: "http://127.0.0.1:8545",
      chainId: 1337,
      accounts: ['0x64a5e6ca0f146f3fe21918306175dece05a520f71cff26938d4eafa22232080d', '0x9c90763bb19faf017856aa7791a1deaab0c5f475ec8052988e9f0f116f7221af']

    },
    sepolia: {
      url: "https://sepolia.infura.io/v3/",
      accounts: ['0x9c90763bb19faf017856aa7791a1deaab0c5f475ec8052988e9f0f116f7221af'],
      chainId: 11155111
    }
  },
  namedAccounts: {
    firstAccount: {
      default: 0
    },
    secodeAccound: {
      default: 1

    }
  }
};

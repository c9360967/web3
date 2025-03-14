import { http, createConfig } from 'wagmi'
import { mainnet, sepolia, localhost } from 'wagmi/chains'
import { injected, walletConnect } from 'wagmi/connectors'


const ganache = {
    id: 1_337,
    name: 'Ganache',
    nativeCurrency: {
        decimals: 18,
        name: 'Ether',
        symbol: 'ETH',
    },
    rpcUrls: {
        default: { http: ['http://127.0.0.1:8545'] },
    },
}

export const chains = [ganache, sepolia]



export const config = createConfig({
    chains,
    transports: {
        [mainnet.id]: http('https://eth-mainnet.g.alchemy.com/v2/YOUR_API_KEY'),  //动态获取链id并且创建http传输实例
        [sepolia.id]: http('https://eth-sepolia.g.alchemy.com/v2/YOUR_API_KEY'),
        [ganache.id]: http('http://127.0.0.1:8545')
    },
    connectors: [
        injected(),    //自动检测浏览器的注入钱包
        walletConnect({
            projectId: 'c36ea186a022b4938c843ea3a5fa762e', 
            metadata: {
                name: 'My DApp',    //显示在用户的钱包链接页面
                description: 'Web3 App',   //应用描述
                url: 'https://XXXXXXX.com',  //应用官网地址
                icons: ['']
            }
        })
    ]
})
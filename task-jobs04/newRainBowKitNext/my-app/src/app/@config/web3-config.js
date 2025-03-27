import { http, createConfig } from 'wagmi'
import { mainnet, sepolia, localhost } from 'wagmi/chains'
import { injected, walletConnect } from 'wagmi/connectors'
import { SEPOLIA_URL, MAINNET_URL, GANACHE_URL, PROJECTID } from './helper-config'


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
        [mainnet.id]: http(MAINNET_URL),  //动态获取链id并且创建http传输实例
        [sepolia.id]: http(SEPOLIA_URL),
        [ganache.id]: http(GANACHE_URL)
    },
    connectors: [
        injected(),    //自动检测浏览器的注入钱包
        walletConnect({
            projectId: PROJECTID,
            metadata: {
                name: 'My DApp',    //显示在用户的钱包链接页面
                description: 'Web3 App',   //应用描述
                url: 'https://XXXXXXX.com',  //应用官网地址
                icons: ['']
            }
        })
    ]
})
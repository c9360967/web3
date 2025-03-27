'use client'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { config, chains } from './web3-config'
import '@rainbow-me/rainbowkit/styles.css';


export function Web3Provider({ children }) {
    const [mounted, setMounted] = useState(false)

    const [queryClient] = useState(() => new QueryClient())


    useEffect(() => setMounted(true), [])

    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider chains={chains}>
                    {children}
                </RainbowKitProvider>
            </QueryClientProvider >
        </WagmiProvider>
    )



}
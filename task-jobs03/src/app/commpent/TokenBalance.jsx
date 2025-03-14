import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Button, Flex } from 'antd';
import { useEthersProvider } from './ethers'
import { FundMeAbi } from '../abi/fundMeAbi' 
import { useReadContract } from 'wagmi'
import { ethers } from 'ethers'
 


export const TokenBalance = () => {
    const contractAddress = '0xC46Ba045637F9Ff543648a1046112fD9A8933D8B'
    const provider = useEthersProvider()
    const fundMe = new ethers.Contract(contractAddress, FundMeAbi, provider)
    const contract = useReadContract({
        FundMeAbi,
        address: contractAddress,
        functionName: 'getOwner'
    })
    console.log("333333333", contract)




    return (
        <div>
            <div className="container mx-auto p-8">
                <h1 className="text-3xl font-bold mb-4">My DApp</h1>
                <ConnectButton />
            </div>
            <div className="container mx-auto p-8">
                <h3 className="text-3xl font-bold mb-4">ownerAddress</h3>
                <Flex gap="small" wrap>
                    <Button type="primary" onClick={async() => {
                        const owner = await fundMe.getOwner()
                        console.log("owner", owner)
                    }}>getOwner</Button>
                </Flex>
            </div>
            
        </div>
        
            
            
    )
}
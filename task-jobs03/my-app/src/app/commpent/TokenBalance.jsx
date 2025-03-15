import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Button, Flex, Modal, Input } from 'antd';
import { useEthersProvider, useEthersSigner } from './ethers'
import { FundMeAbi } from '../abi/fundMeAbi' 
import { useReadContract, useAccount } from 'wagmi'
import { ethers } from 'ethers'
import { useState } from 'react';
import { ERC20ABI } from '../abi/ERC20Abi';
import { MyModal } from './MyModal';
 


export const TokenBalance = () => {
    const contractAddress = '0x2c5f362a2a082d6d24C6Cb89C0b307438E85921E'
    const erc20Address = '0x68BdA0D9e98c24da2a82148322D1C49E855013Ad'
    const userInfoObj = { amount: 0, sendEth: 0 }
    const provider = useEthersProvider()
    const provider_write = useEthersSigner()
    const fundMe = new ethers.Contract(contractAddress, FundMeAbi, provider)
    const fundMe_write = new ethers.Contract(contractAddress, FundMeAbi, provider_write) 
    const ERC20 = new ethers.Contract(erc20Address, ERC20ABI, provider_write)
    // const contract = useReadContract({
    //     abi:FundMeAbi,
    //     address: contractAddress,
    //     functionName: 'getOwner'
    // })
    // console.log("333333333", contract)
    
    const accountInfo = useAccount()
    const [_owner, setOwner] = useState('')
    const [userInfo, setUserInfo] = useState(userInfoObj)
    const [modalStatus, setModalStatus] = useState(false)
    const result = useAccount()
    const isAccountConnected = result.isConnected
    

    return (
        <div>
            <div className="container mx-auto p-8">
                <h1 className="text-3xl font-bold mb-4">My DApp</h1>
                <ConnectButton />
            </div>
            {/* <div className='container mx-auto p-8'>

            </div> */}
            <div className="container mx-auto p-8">
                <h3 className="text-3xl font-bold mb-4">ownerAddress</h3>
                <span className='text-1xl font-bold mb-3'>ownerAddress: {isAccountConnected ? _owner : ""}</span>
                <Flex gap="small" wrap>
                    <Button type="primary" onClick={async() => {
                        const owner = await fundMe.getOwner()
                        setOwner(owner)
                        console.log("owner", owner)
                        
                    }}>getOwner</Button>
                </Flex>
            </div>
            <div className="container mx-auto p-8">
                <h3 className="text-3xl font-bold mb-4">Mint ERC20</h3>
                <span className='text-1xl font-bold mb-3'>ERC20TOEKN: {isAccountConnected ? userInfo.amount: "0"}</span>
                <Flex gap="small" wrap>
                    <Input placeholder="Basic usage" value={userInfo.sendEth} onChange={(e)=>{
                        setUserInfo({ ...userInfoObj, sendEth: e.target.value })
                    }}/>
                    <Button type="primary" onClick={async () => {
                        try{
                            const fundMeWriteBalannnce = await fundMe_write.setUserAmount(userInfo.sendEth, "first")
                            // const mintRes = await ERC20.mint(result.address, 1)
                            
                            // console.log("88888", mintRes)
                        }catch (err){
                            console.log("错误",err);
                            setModalStatus(true)
                            
                        }
                    }}>MintToken</Button>
                    <Button type="primary" onClick={async () => {
                        const balannce = await fundMe_write.getAmount()
                        setUserInfo({...userInfoObj, amount: balannce})
                        console.log("balance", balannce)
                    }}>GetToken</Button>
                </Flex>
            </div>
            <Modal title="错误" open={modalStatus} onOk={()=>{
                setModalStatus(false)
            }} onCancel={()=>{
                setModalStatus(false)
            }}>
                <div>错误参数</div>
            </Modal>
            
        </div>
        
            
            
    )
}
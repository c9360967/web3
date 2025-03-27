'use client'
import { useEffect, useState } from 'react';
import { Input, Select, Button, message, Popover } from 'antd';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useWriteContract } from 'wagmi';
import { tokens } from "../common/data"
import { useEthersProvider, useEthersSigner } from '../@utils/ethers'
import { ethers } from 'ethers';
const abi = [
    "function mintToken(uint256 _amount) external payable"
]

export const ERC20Exchange = () => {
    const provider_write = useEthersSigner()
    const [ethAmount, setEthAmount] = useState(0);
    const newTokens = tokens.filter(token => {
        return token.name !== 'ETH'
    })
    const [selectedToken, setSelectedToken] = useState(newTokens[0].name);
    const [tokenMap, setTokenMap] = useState(newTokens[0])
    const { address, isConnected } = useAccount();
    const TokenContract = new ethers.Contract(tokenMap.address, tokenMap.abi, provider_write)
    const { writeContractAsync } = useWriteContract()

    // useEffect(() => {
    //     //get erc20Token
    // })
    async function handleExchange() {
        console.log("进入点击方法")
        console.log("abi", tokenMap.abi)
        const tx = await TokenContract.mintToken(parseInt(tokenNum), { value: BigInt(ethAmount * 10 ** 18) } )
        // const tx = await TokenContract.balanceOf(address)
    //    await writeContractAsync({
    //         abi: tokenMap.abi,
    //         function: "mintToken",
    //         args: [tokenNum, ethAmount],
    //         address: tokenMap.address
    //         // value: ethAmount,
    //     })
        console.log("3333333333", tx)
    }

  


    const inputEthNumber = (e) => {
        if (e.target.value < 0) {
            return
        }
        setEthAmount(e.target.value)
    }
    const tokenNum = ethAmount / tokenMap.price

    return (
        <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
            <h2>ETH</h2>
            <Input
                min={0}
                type="number"
                placeholder="输入ETH数量"
                value={ethAmount}
                onChange={(e) => {

                    inputEthNumber(e)
                }}
                style={{ marginBottom: '0px' }}
            />
            <div style={{ display: 'flex', justifyContent: 'center', fontWeight: 'bold', fontSize: '20px', }}>↓</div>
            <Popover >
                <Input
                    addonAfter={
                        <Select
                            value={selectedToken}
                            variant="borderless"
                            onChange={(value) => {

                                setSelectedToken(value)
                                setTokenMap(newTokens.filter(token => token.name == value)[0])
                            }}

                        >
                            {newTokens.map(newToken => {
                                return <Select.Option value={newToken.name}>{newToken.name}</Select.Option>
                            })}

                        </Select>}
                    defaultValue="0"
                    disabled={true}
                    value={tokenNum}
                />

            </Popover>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                {isConnected ? <Button type="primary" onClick={handleExchange} style={{ width: '20%', height: '39px', fontSize: '16px', fontWeight: 'bold', padding: '10px 16px', borderRadius: '10px' }}>
                    确认兑换
                </Button> : <ConnectButton showBalance={false} chainStatus="none" />}

            </div>



        </div>
    )
}



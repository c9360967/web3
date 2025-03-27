'use client'
import { useRef, useState } from 'react';
import { Input, Select, Flex, Button, Space } from 'antd';
import { useAccount } from 'wagmi'
import { tokens, ProxyContractAddr } from '../common/data'
import { useEthersProvider, useEthersSigner } from '../@utils/ethers.ts'
import { ethers } from 'ethers'
import { ABI_PROXY } from '../@abi/index'

export const StakePage = () => {
    const [amount, setAmount] = useState('');
    const provider_write = useEthersSigner()
    const { isConnected, address } = useAccount()
    const newTokens = tokens.map(token =>{
        if (!(token.hasOwnProperty('label') && token.hasOwnProperty('value'))){
            return {
                ...token,
                label: token.name,
                value: token.name

            }
        }
    })
    const [selectedToken, setSelectedToken] = useState(newTokens[0]);
    const proxyContract = new ethers.Contract(ProxyContractAddr, ABI_PROXY, provider_write)
    
    
    
    // const TokenContract = new ethers.Contract(tokenMap.address, tokenMap.abi, provider_write)

    const handleStake = async() => {
        if (amount <= 0 && isConnected){
            return;
        }
        
        if(selectedToken.name == "ETH"){
            const tx = await proxyContract.pledgeETH({ value: BigInt(amount * 10 ** 18) })
        }else{
            const ERC20TokenContract = new ethers.Contract(selectedToken.address, selectedToken.abi, provider_write)
            const erc20Tx = await ERC20TokenContract.approve(ProxyContractAddr,BigInt(amount * 10**18))
            const tx = await proxyContract.pledgeERC20(parseInt(amount), parseInt(selectedToken.pid))

        }

    };
    async function verifySubmit() {
        // const ERC20TokenContract = new ethers.Contract(selectedToken.address, selectedToken.abi, provider_write)
        // console.log("代理合约地址", ProxyContractAddr)
        const tx = await proxyContract.getPoolSymbol(selectedToken.pid)
    }
    const handleChange = (value) => {
        setSelectedToken(newTokens.filter(token => token.name == value)[0])


    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
            <div style={{ width: '400px', textAlign: 'center', padding: '20px', borderRadius: '8px', backgroundColor: '#f5f5f5' }}>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', borderRadius: '6px', overflow: 'hidden', backgroundColor: "#fff" }}>
                    <Input
                        type="text"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Input pledge amount"
                        style={{ flex: 1, padding: '8px' }}
                        variant='borderless'
                    />
                    <Select
                        value={selectedToken.name}
                        variant='borderless'
                        onChange={handleChange}
                        options={newTokens}
                        optionRender={(token) => (
                            <Space>
                                {token.data.label}
                            </Space>
                        )}
                    />
                </div>
                <button
                    onClick={handleStake}
                    style={{ width: '100%', padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', marginTop: "30px" }}
                >
                    OK
                </button>
                {/* <button onClick={verifySubmit}>9999999999</button> */}
                {/* <button onClick={verifySubmit}>99999</button> */}
                {/* <Flex vertical gap="small" style={{width: '50%'}}> 
                    <Button type="primary" block className=''>
                        Primary
                    </Button>
                </Flex> */}
            </div>
        </div>
    );
};

export default StakePage;
'use client'
import { useEffect, useState } from 'react';
import { Select, Card, Statistic } from 'antd';
import { tokens, ProxyContractAddr } from '../common/data'
import { ABI_PROXY } from '../@abi/index'
import { useEthersProvider, useEthersSigner } from '../@utils/ethers'
import { ethers } from 'ethers'
import { useAccount, useReadContract, useWatchContractEvent } from 'wagmi';

export const UserInfo = () => {
    const [selectedToken, setSelectedToken] = useState(tokens[0]);
    const provider_write = useEthersSigner()
    const provider = useEthersProvider()
    const {isConnected,address} = useAccount()
    const proxyContract = new ethers.Contract(ProxyContractAddr, ABI_PROXY, provider_write)
    const proxyContractRead = new ethers.Contract(ProxyContractAddr, ABI_PROXY, provider)
    console.log("pid", selectedToken.pid)
    const data = useReadContract({
        abi: ABI_PROXY,
        address: ProxyContractAddr,
        functionName: 'getUserInfo',
        // args: [selectedToken.pid]
        args: [parseInt(selectedToken.pid)]
    })
    // useEffect(() => { 
    //     const fetchData = async () => {
    //         const data = await proxyContract.getUserInfo(selectedToken.pid)
    //         console.log("pid", selectedToken.pid)
    //         console.log("getUserInfo",data)
    //     }
    //     fetchData()
    // }, [selectedToken])
    // const data = 

    console.log("111111111", data)
    // console.log("22222222", BigInt(data.data?.stAmount))
    // if (isConnected) {
    //     console.log('1111111111111')
        
    // }
    useWatchContractEvent({
        address: ProxyContractAddr,
        abi: ABI_PROXY,
        eventName: 'PledgeRecord',
        onLogs(logs) {
            console.log("触发PledgeRecord事件", logs)
        }
    })
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '200px',
            marginTop: '200px'
        }}>
            <Card
                title="质押信息"
                style={{ width: 500 }}
            >
                <Select
                    value={selectedToken.name}
                    onChange={(value) => {
                        setSelectedToken(tokens.filter(token => token.name == value)[0])
                    }}
                    style={{ width: '100%', marginBottom: '20px' }}
                >
                    {tokens.map(token => {
                        return <Select.Option key={token.name} value={token.name}>{token.name}</Select.Option>
                    })}
                    {/* <Select.Option value="ETH">ETH</Select.Option> */}
                </Select>
                <Statistic
                    title="质押数量"
                    value={0}
                    precision={2}
                />
                <Statistic
                    title="已分配奖励"
                    value={0}
                    precision={2}
                    style={{ marginTop: '20px' }}
                />
            </Card>
        </div>
    );
};


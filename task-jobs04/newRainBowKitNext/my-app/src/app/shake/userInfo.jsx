'use client'
import { useEffect, useState } from 'react';
import { Select, Card, Statistic } from 'antd';
import { tokens, ProxyContractAddr } from '../common/data'
import { ABI_PROXY } from '../@abi/index'
import { useEthersProvider, useEthersSigner } from '../@utils/ethers'
import { ethers } from 'ethers'
import { useAccount, useReadContract, useWatchContractEvent, useWriteContract } from 'wagmi';
import { formatBigInt, formatFloat } from '../@utils/formatBingInt'
import { format } from 'path';

export const UserInfo = () => {

    const [selectedToken, setSelectedToken] = useState(tokens[0]);
    const provider_write = useEthersSigner()
    const provider = useEthersProvider()
    const {isConnected,address} = useAccount()
    const proxyContract = new ethers.Contract(ProxyContractAddr, ABI_PROXY, provider_write)
    const proxyContractRead = new ethers.Contract(ProxyContractAddr, ABI_PROXY, provider)
    console.log("pid", selectedToken.pid)
    const userData = useReadContract({
        abi: ABI_PROXY,
        address: ProxyContractAddr,
        functionName: 'getUserInfoV2',
        args: [selectedToken.pid],
        // args: [parseInt(selectedToken.pid)],
        account: address
    })
    useWatchContractEvent({
        address: ProxyContractAddr,
        abi: ABI_PROXY,
        eventName: 'UpdateReward',
        onLogs(logs) {
            console.log("UpdateReward", logs)
        }
    })

    
    // useEffect(() => { 
    //     const fetchData = async () => {
    //         const data = await proxyContract.getUserInfo(selectedToken.pid)
    //         console.log("pid", selectedToken.pid)
    //         console.log("getUserInfo",data)
    //     }
    //     fetchData()
    // }, [selectedToken])

    
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '200px',
            marginTop: '200px'
        }}>
            <Card
                title={<span style={{fontSize: '20px',fontWeight: 'bold'}}>pledgeInformation</span>}
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
                    title="pledgeAmount"
                    // value={formatBigInt(userData?.data.stAmount, 18)}
                    value={userData.data?.stAmount} 
                    precision={2}
                />
                <Statistic
                    title="rewards"
                    // value={formatBigInt(userData?.data.pendingRewards, 18)}
                    value={parseInt(userData.data?.pendingReward)/10**18} 
                    precision={2}
                    style={{ marginTop: '20px' }}
                />
            </Card>
        </div>
    );
};


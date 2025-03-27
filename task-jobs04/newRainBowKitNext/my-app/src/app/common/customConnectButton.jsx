'use client';
import { useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useBalance, useToken, useReadContract } from 'wagmi';
import { Select, Space } from 'antd';
import { tokens } from './data'
import { formatBigInt } from '../@utils/formatBingInt'




export function CustomConnectButton() {

    const { address, isConnected } = useAccount();
    const [selectedToken, setSelectedToken] = useState(tokens[0]); // 默认选择 ETH
    let balance
    if (selectedToken.name == 'ETH'){
        const {data} = useBalance({ address:address });
        balance = formatBigInt(data?.value, data?.decimals)
        // console.log("ETH", formatBigInt(data?.value, data?.decimals))
    }else{
        const {data} = useReadContract({
            address: selectedToken.address,
            abi: selectedToken.abi,
            functionName: 'balanceOf',
            args: [address]

        })
        balance = data ? parseFloat(data).toFixed(2) : 0
    }
    

    // 获取 ERC-20 代币余额
    // const { data: tokenBalance } = useToken({
    //     address: selectedToken.address,
    //     enabled: !!selectedToken.address, // 只有代币有地址时才启用
    // });

    // 当前显示的余额
    // const displayBalance = selectedToken.name === 'ETH'
    //     ? ethBalance?.formatted
    //     : tokenBalance?.formatted;
    const displayBalance = balance

    return (
        <ConnectButton.Custom>
            {({
                account,
                chain,
                openAccountModal,
                openChainModal,
                openConnectModal,
                authenticationStatus,
                mounted,
            }) => {
                const ready = mounted && authenticationStatus !== 'loading';
                const connected =
                    ready &&
                    account &&
                    chain &&
                    (!authenticationStatus || authenticationStatus === 'authenticated');

                if (!ready) {
                    return (
                        <div style={{ opacity: 0, pointerEvents: 'none', userSelect: 'none' }}>
                            Loading...
                        </div>
                    );
                }

                if (!connected) {
                    return (
                        <button
                            onClick={openConnectModal}
                            type="button"
                            style={{
                                background: 'linear-gradient(90deg, #FF0080 0%, #7928CA 100%)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '12px',
                                padding: '8px 16px',
                                fontSize: '14px',
                                fontWeight: 500,
                                cursor: 'pointer',
                                transition: 'background 0.2s ease',
                                // ':hover': {
                                    background: 'linear-gradient(90deg, #FF0080 50%, #7928CA 100%)',
                                // },
                            }}
                        >
                            Connect Wallet
                        </button>
                    );
                }

                if (chain.unsupported) {
                    return (
                        <button onClick={openChainModal} type="button">
                            Wrong network
                        </button>
                    );
                }

                return (
                    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                        {/* 链信息按钮 */}
                        <button
                            onClick={openChainModal}
                            style={{
                                display: 'flex',
                                fontWeight: 'bold',
                                background: 'linear-gradient(90deg, #FF0080 0%, #7928CA 100%)',
                                boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.1)',
                                alignItems: 'center',
                                background: 'transparent',
                                border: 'none',
                                cursor: 'pointer',
                                padding: '8px',
                                borderRadius: '12px',
                                ':hover': {
                                    background: 'rgba(255, 255, 255, 0.1)',
                                },
                            }}
                            type="button"
                        >
                            {chain.hasIcon && (
                                <div
                                    style={{
                                        background: chain.iconBackground,
                                        width: '25px',
                                        height: '25px',
                                        borderRadius: 999,
                                        overflow: 'hidden',
                                        marginRight: 4,
                                    }}
                                >
                                    {chain.iconUrl && (
                                        <img
                                            alt={chain.name ?? 'Chain icon'}
                                            src={chain.iconUrl}
                                            style={{ width: '25px', height: '25px' }}
                                        />
                                    )}
                                </div>
                            )}
                            {chain.name}&nbsp;<span style={{ fontWeight: 'normal', color: 'rgba(0, 0, 0, 0.88)' }}>∨</span>
                        </button>

                        {/* 代币下拉框和余额 */}
                        <Space style={{fontWeight: 'bold'}}>
                            <Select
                                style={{ width: '100px', fontWeight: 'bold' }}
                                className='bold-select'
                                variant='borderless'
                                value={selectedToken.name}
                                onChange={(value) => {
                                    const token = tokens.find((t) => t.name === value);
                                    setSelectedToken(token);
                                }}
                                
                            >
                                {tokens.map((token) => (
                                    <Select.Option key={token.name} value={token.name} style={{fontWeight: 'bold' }}>
                                        {token.name}
                                    </Select.Option>
                                ))}
                            </Select>
                            <span>
                                {displayBalance ? parseFloat(displayBalance).toFixed(4) : '0.0000'} {selectedToken.name}
                            </span>
                        </Space>

                        {/* 账户信息按钮 */}
                        <button
                            onClick={openAccountModal}
                            style={{
                                background: 'linear-gradient(90deg, #FF0080 0%, #7928CA 100%)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '12px',
                                padding: '5px 16px',
                                fontSize: '16px',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                transition: 'background 0.2s ease',
                                ':hover': {
                                    background: 'linear-gradient(60deg, #FF0080 50%, #7632CA 100%)',
                                },
                            }}
                            type="button"
                        >
                            {/* {account.avatar || account.ensAvatar ? (
                                <img
                                    src={account.avatar || account.ensAvatar}
                                    alt="avatar"
                                    style={{ width: 20, height: 20, borderRadius: '50%' }}
                                />
                            ) : (
                                <div
                                    style={{
                                        display: 'initial',
                                        width: 20,
                                        height: 20,
                                        borderRadius: '50%',
                                        background: '#ccc', // 默认图标背景色
                                    }}
                                />
                            )} */}
                            
                            {account.displayName}
                        </button>
                    </div>
                );
            }}
        </ConnectButton.Custom>
    );
}
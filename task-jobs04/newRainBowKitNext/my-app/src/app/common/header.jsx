'use client'
import { useAccount } from 'wagmi'
import { tokenAndAddress } from './data'
import { Select, Space, Flex} from 'antd';
import Link from 'next/link';
import { useState } from 'react';
import { CustomConnectButton } from './customConnectButton'

export const Header = () =>{
    const {isConnected} = useAccount();
    const tokens = tokenAndAddress.map(token => {
        if (!(token.hasOwnProperty('value') && token.hasOwnProperty('label'))){
            return {
                ...token,
                value: token.token,
                label: token.token
            }
        }
        return token
    })
    const [token, setToken] = useState(tokens[0].value)


    function handleChange(value) {
        setToken(value)
    }
    
    return (
        <>
            <header>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '40px' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img src="/dex.png" alt="logo" style={{ width: '40px', height: '40px', marginRight: '20px',marginLeft: '200px' }} />
                        <nav style={{ display: 'flex', gap: '20px' }}>
                            <Link href="/">质押</Link>
                            <Link href="/exchange">兑换</Link>
                            <Link href="/transactions">交易信息</Link>
                        </nav>
                        </div>
                    {/* <Menu
                        mode="horizontal"
                        defaultSelectedKeys={['stake']}
                        items={[
                            { key: 'stake', label: '质押' },
                            { key: 'account', label: '账户信息' },
                            { key: 'transactions', label: '交易记录' },
                        ]}
                    /> */}
                    {/* <div style={{ marginRight: '20px' }}>
                        {isConnected ? <Select
                            value={token}
                            variant='borderless'
                            onChange={handleChange}
                            options={tokens}
                            optionRender={(token) => (
                                <Space>
                                    {token.data.label}
                                </Space>
                            )}
                        /> : 1}
                    </div> */}
                    
                    <div style={{marginRight: '200px'}}>
                        
                        <CustomConnectButton />
                        {/* <ConnectButton /> */}
                    </div>
                </div>
            </header>
        </>
    )
}
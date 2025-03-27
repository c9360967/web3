'use client'
import { useAccount } from 'wagmi'
import { tokenAndAddress } from './data'
import { Select, Space, Flex} from 'antd';
import Link from 'next/link';
import { useState } from 'react';
import { CustomConnectButton } from './customConnectButton'
import { usePathname } from 'next/navigation';

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
    const path = usePathname()
    console.log("path", path)

    function handleChange(value) {
        setToken(value)
    }
    
    return (
        <>
            <header>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '40px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', fontWeight: 'bold' }}>
                        <img src="/dex.png" alt="logo" style={{ width: '40px', height: '40px', marginRight: '20px',marginLeft: '200px' }} />
                        <nav style={{ display: 'flex', gap: '20px' }}>
                            <Link href="/" className={path == "/"? 'text-[orangered]': ''}>PLEDGE</Link>
                            <Link href="/exchange" className={path == "/exchange" ? 'text-[orangered]' : ''}>EXCHANGE</Link>
                            {/* <Link href="/transactions">TransactionInformation</Link> */}
                        </nav>
                        </div>
                    
                    <div style={{marginRight: '200px'}}>
                        
                        <CustomConnectButton />
                        {/* <ConnectButton /> */}
                    </div>
                </div>
            </header>
        </>
    )
}
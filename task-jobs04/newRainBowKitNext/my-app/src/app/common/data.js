
import { ABI_NT, ABI_RCC, ABI_MT } from '../@abi/index'
export const tokenAndAddress = [
    {token: "ETH", address: "0x0000000000000000000000000000000000000000", label: 'ETH', value:"ETH"},
    {token: "RCC", address: ""},
    {token: "NT", address: ""}
]
export const tokens = [
    { name: 'ETH', address: '',pid: 0 }, // ETH 没有合约地址
    // { name: 'RCC', address: '0x8dF4827C8B3a52e8F5F254550aAf0D21e237aB4A', abi: ABI_RCC, price: 0.01,pid:1 },
    { name: 'NT', address: '0x5FdfDA37473DF53075085134d7AD5EC25De372aE', abi: ABI_NT, price: 0.01,pid: 1 },
    { name: 'MT', address: '0x2C52A78218E0C8f9EC59e72bfC6E13ca42B7A72C', abi: ABI_MT ,price: 0.01,pid: 2}
];

export const ProxyContractAddr = "0x94A5f94b3777c1feB95176d7C4f7BCdeaEA1b1F0"

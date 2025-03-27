
import { ABI_NT, ABI_RCC, ABI_MT } from '../@abi/index'
export const tokenAndAddress = [
    {token: "ETH", address: "0x0000000000000000000000000000000000000000", label: 'ETH', value:"ETH"},
    {token: "RCC", address: ""},
    {token: "NT", address: ""}
]
export const tokens = [
    { name: 'ETH', address: '',pid: 0 }, // ETH 没有合约地址
    // { name: 'RCC', address: '0x8dF4827C8B3a52e8F5F254550aAf0D21e237aB4A', abi: ABI_RCC, price: 0.01,pid:1 },
    { name: 'NT', address: '0xD047244b638bEA1b3815d73038f4873Ca2647eDE', abi: ABI_NT, price: 0.01,pid: 1 },
    { name: 'MT', address: '0x6af93f5808cf4a1c3df1ff23dfD484E21dF3E665', abi: ABI_MT ,price: 0.01,pid: 2}
];

export const ProxyContractAddr = "0x321704423c8BD802ec1B351e1BB26983497B4783"

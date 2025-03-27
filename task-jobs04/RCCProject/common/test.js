
const {ethers} = require("ethers");
const wallet_privateKey = "0x99a408b95eb4fd53db6d9dff0d25bf7afdc704db444d91045b4a78148886beed"
const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545")
const ETHArgs = {address:"0x0000000000000000000000000000000000000000", weight:4, sy:"ETH", min:1, lockBlock:200}
const NTArgs = { address: "0x5FdfDA37473DF53075085134d7AD5EC25De372aE", weight: 3, sy: "NT", min: 10, lockBlock:200}
// const MTArgs = ["0x3A1a118b7440E9fa178Bd63F9BfD3c9cecb61030", 2, "MT", 10, 200]
const MTArgs = { address: "0x2C52A78218E0C8f9EC59e72bfC6E13ca42B7A72C", weight: 3, sy: "MT", min: 10, lockBlock: 200 }
const abi = [
    "function mintToken(uint256 _amount) external payable",
    "function balanceOf(address account) public view returns (uint256)",
    "function addPool(address _pledgeTokenAddress,uint256 _weight,string memory _stName,uint256 _minStToken,uint256 _unLockedBlocks) public",
    "function getUserInfo(uint256 _pid) public returns(uint256, uint256, uint256)",
    "function getPools() public view returns(uint256)",
    "function getPoolSymbol(uint256 _pid) public view returns(PoolInfo memory)",
    "function pledgeERC20(uint256 _amount, uint256 _pid) external",
    "function getUserInfo(uint256 _pid) public returns(uint256, uint256, uint256)",
    'function getStAmount(uint256 _pid) public view returns(uint256)'
    
]
const contractAddress = "0x94A5f94b3777c1feB95176d7C4f7BCdeaEA1b1F0"
const wallet = new ethers.Wallet(wallet_privateKey, provider)
const featureV2 = new ethers.Contract(contractAddress, abi, wallet)
const main = async () => {
    let a = await featureV2.getStAmount(0)
    console.log(a)

}
// main()
const addpool = async (args) => {
    let a = await featureV2.addPool(args.address, args.weight, args.sy, args.min, args.lockBlock)
    console.log(wallet.address)
    console.log(a)
}
// addpool(ETHArgs)
// addpool(NTArgs)
// addpool(MTArgs)
const pledge = async() => {
    let a = await featureV2.pledgeERC20(10, 1)
    console.log(wallet.address)
    console.log(a)

}
// pledge()


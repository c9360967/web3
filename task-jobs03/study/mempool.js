const {ethers} = require("ethers")

const {  contractExample } = require("./common")
const provider = new ethers.WebSocketProvider("wss://sepolia.infura.io/ws/v3/3e7b7aab91df4dfbb3dadfa55d201b74")

function throttle(fn, delay) {  //限制访问频率
    let timer;
    return function () {
        if (!timer) {
            fn.apply(this, arguments)
            timer = setTimeout(() => {
                clearTimeout(timer)
                timer = null
            }, delay)
        }
    }
}
const main =async() =>{
    let i = 0;
    provider.on("pending", async (txHash) => {  //监听pending交易并打印txhash
        if (txHash && i < 100) {
            // 打印txHash
            console.log(`[${(new Date).toLocaleTimeString()}] 监听Pending交易 ${i}: ${txHash} \r`);
            i++
        }
    });

    let j = 0
    provider.on("pending", throttle(async (txHash) => {  //监听pending交易并打印交易详情信息
        if (txHash && j <= 100) {
            // 获取tx详情
            let tx = await provider.getTransaction(txHash);
            console.log(`\n[${(new Date).toLocaleTimeString()}] 监听Pending交易 ${j}: ${txHash} \r`);
            console.log(tx);
            j++
        }
    }, 1000));
};



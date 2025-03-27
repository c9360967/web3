

export function formatBigInt(balance, decimals) {
    if (!balance || !decimals) return '0';

    const balanceStr = balance.toString();

    const integerPart = balanceStr.slice(0, -decimals) || '0';
    const decimalPart = balanceStr.slice(-decimals).padStart(decimals, '0');
    return `${integerPart}.${decimalPart}`;
}
export function formatFloat(number, decimals) {
    if (typeof number !== 'number' || isNaN(number)) return '0';

    // 将数字转换为字符串
    const numberStr = number.toString();

    // 分割整数部分和小数部分
    const [integerPart, decimalPart = ''] = numberStr.split('.');

    // 如果小数部分不足指定位数，用 '0' 补齐
    const formattedDecimalPart = decimalPart.padEnd(decimals, '0').slice(0, decimals);

    return `${integerPart}.${formattedDecimalPart}`;
}
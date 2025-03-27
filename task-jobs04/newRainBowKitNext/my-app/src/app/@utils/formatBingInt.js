

export function formatBigInt(balance, decimals) {
    if (!balance || !decimals) return '0';

    const balanceStr = balance.toString();

    const integerPart = balanceStr.slice(0, -decimals) || '0';
    const decimalPart = balanceStr.slice(-decimals).padStart(decimals, '0');
    return `${integerPart}.${decimalPart}`;
}
/**
 * 
 * @param size 钱包个数
 * @returns {*[]} 靓号钱包
 * @constructor
 */
function CreateWallet(size) {
    // 靓号地址
    let wallets = []
    // 靓号正则表达式
    let regexps = new Array(size)
    // 生成正则匹配表达式
    for (let i = 0; i < size; i++) {
        let prefix = (i).toString().padStart(3, '0');
        regexps[i] = new RegExp(`^0x${prefix}.*$`)
    }

    while (regexps.length > 0) {
        let wallet = ethers.Wallet.createRandom();
        let idx = regexps.findIndex(regex => regex.test(wallet.address));
        if (idx >= 0) {
            console.log(regexps[idx], wallet.address);
            wallets.push(wallet.address + ':' + wallet.privateKey);
            regexps.splice(idx, 1);
        }
    }
    return wallets.sort()
}

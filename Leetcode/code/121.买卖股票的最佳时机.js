/*
 * @lc app=leetcode.cn id=121 lang=javascript
 *
 * [121] 买卖股票的最佳时机
 */

// @lc code=start
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
    let res = [];
    for (let i = 0; i < prices.length; i++) {
        for (let j = 1; j < prices.length; j++) {
            let e = prices[j] - prices[i]
            if (e > 0) {
                console.log('first', e)
                res[i] = res[i] > e ? res[i] : e;
            } else {
                res[i] = 0
            }
        }
    }
    return Math.max(res)

};
// @lc code=end


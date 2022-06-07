/*
 * @lc app=leetcode.cn id=50 lang=javascript
 *
 * [50] Pow(x, n)
 */

// @lc code=start
/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
// var myPow = function (x, n) {
//     if (n == 0) {
//         return 1
//     }
//     if (n < 0) {
//         return 1 / myPow(x, -n)
//     }
//     if (n % 2) {
//         return x * myPow(x, n - 1)
//     }
//     return myPow(x * x, n / 2)
// };
var myPow = function (x, n) {
    if (n < 0) {
        x = 1 / x;
        n = -n
    }
    pow = 1;
    while (n) {
        if (n & 1) {
            pow *= x;
        }
        x *= x;
        n >>= 1
    }
    return pow
};
// @lc code=end


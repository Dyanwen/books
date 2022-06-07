/*
 * @lc app=leetcode.cn id=70 lang=javascript
 *
 * [70] 爬楼梯
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {
    if (n == 0 || n == 1 || n == 2) {
        return n
    }
    // let mem = new Array(n)
    // mem[0] = 1;
    // mem[1] = 2;
    // for (let i = 2; i < n; i++) {
    //     mem[i] = mem[i - 1] + mem[i - 2]
    // }
    // return mem[n - 1]

    let o = 2, t = 1;
    for (let i = 2; i < n; i++) {
        [t, o] = [o, o + t]
    }
    return o;

    // let o = 1, t = 1;
    // for (let i = 1; i < n; i++) {
    //     [t, o] = [o, o + t]
    // }
    // return o;
};
// @lc code=end


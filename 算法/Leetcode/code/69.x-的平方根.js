/*
 * @lc app=leetcode.cn id=69 lang=javascript
 *
 * [69] x 的平方根 
 */

// @lc code=start
/**
 * @param {number} x
 * @return {number}
 */
var mySqrt = function (x) {
    if (x == 0 || x == 1) {
        return x;
    }
    let l = 1, r = Math.floor(x / 2) + 1, m;
    while (l <= r) {
        m = Math.floor((l + r) / 2)
        if (m == x / m) {
            return m
        } else if (m > x / m) {
            r = m - 1
        } else {
            l = m + 1
            res = m
        }
    }
    return r;

    // let r = x;
    // while (r * r > x) {
    //     r = (r + x / r) / 2
    // }
    // return r;
};
// @lc code=end


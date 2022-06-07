/*
 * @lc app=leetcode.cn id=152 lang=javascript
 *
 * [152] 乘积最大子数组
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function (nums) {
    if (!nums.length) {
        return 0
    }
    let dp = [[0, 1], [0, 1]], res;
    [dp[0, 1], dp[0, 0], res] = [nums[0], nums[0], nums[0]]
    for (let i = 1; i <= nums.length; i++) {
        let x = i % 2, y = (i - 1) % 2;
        console.log(x, y)
        dp[x][0] = Math.max(dp[y][0] * nums[i], dp[y][1] * nums[i], nums[i])
        dp[x][1] = Math.min(dp[y][0] * nums[i], dp[y][1] * nums[i], nums[i])
        res = Math.max(res, dp[x][0])
    }
    return res

};
console.log(maxProduct([2, 3, -2, 4]))
// @lc code=end


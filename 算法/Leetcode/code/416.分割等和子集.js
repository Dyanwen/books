/*
 * @lc app=leetcode.cn id=416 lang=javascript
 *
 * [416] 分割等和子集
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function (nums) {
    if (nums.length <= 1) return false
    let sum = nums.reduce((a, b) => { return a + b })
    if (sum % 2 !== 0) return false
    let capacity = sum / 2
    let n = nums.length
    let dp = new Array(capacity + 1).fill(0)
    for (let i = 0; i <= capacity; i++) {
        dp[i] = nums[0] === i
    }
    for (let i = 1; i < n; i++) {
        for (let j = capacity; j >= nums[i]; j--) {
            dp[j] = dp[j] || dp[j - nums[i]]
        }
    }
    return dp[capacity]
};
// @lc code=end


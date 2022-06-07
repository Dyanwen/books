/*
 * @lc app=leetcode.cn id=169 lang=javascript
 *
 * [169] 多数元素
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function (nums) {
    let s = new Map();
    for (let i = 0; i < nums.length; i++) {
        s[nums[i]] ? s[nums[i]] += 1 : s[nums[i]] = 1;
        if (s[nums[i]] > (nums.length / 2)) {
            return nums[i]
        }
    }
};
// @lc code=end


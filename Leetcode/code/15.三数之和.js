/*
 * @lc app=leetcode.cn id=15 lang=javascript
 *
 * [15] 三数之和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
    let l = nums.length, result = new Set()
    if (nums.length < 3) {
        return []
    }
    nums.sort((a, b) => a - b)
    for (let i = 0; i < l; i++) {
        for (let j = 1; j < l; j++) {
            for (let k = 2; k < l; k++) {
                let r = nums[i] + nums[j] + nums[k];
                if (r == 0 && !result.has([nums[i], nums[j], nums[k]])) {
                    result.add([nums[i], nums[j], nums[k]])
                }
            }
        }
    }
    console.log(result)
    return [...result]

};
threeSum([-1, 0, 1, 2, -1, -4])
// @lc code=end


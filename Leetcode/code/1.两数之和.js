/*
 * @lc app=leetcode.cn id=1 lang=javascript
 *
 * [1] 两数之和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
    for (let i = 0; i < nums.length; i++) {
        const e = nums[i];
        const t = nums.indexOf(target - e)
        if ((t != -1) && (t !== i)) {
            return [i, nums.indexOf(target - e)]
        }
    }
    return []
    
    // const map = new Map();
    // for (let i = 0; i < nums.length; i++) {
    //     if (map.has(target - nums[i])) {
    //         return [map.get(target - nums[i]), i]
    //     } else {
    //         map.set(nums[i], i)
    //     }
    // }
    // return []


};
// @lc code=end


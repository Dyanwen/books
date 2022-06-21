/*
 * @lc app=leetcode.cn id=703 lang=javascript
 *
 * [703] 数据流中的第 K 大元素
 */

// @lc code=start

var KthLargest = function (k, nums) {
    for (let j = 0; j < nums.length - 1; j++) {
        for (let i = 0; i < nums.length - 1; i++) {
            if (nums[i] > nums[i + 1]) {
                [nums[i], nums[i + 1]] = [nums[i + 1], nums[i]]
            }
        }
    }
    this.k = k
    this.nums = nums

};

KthLargest.prototype.add = function (val) {
    this.nums.push(val)
    let insertIndex = this.nums.length - 2
    while (insertIndex >= 0 && this.nums[insertIndex] > val) {
        this.nums[insertIndex + 1] = this.nums[insertIndex]
        insertIndex--
    }
    this.nums[insertIndex + 1] = val
    return this.nums[this.nums.length - this.k]
};


// var KthLargest = function (k, nums) {
//     this.nums = nums.sort((a, b) => b - a)
//     this.k = k

// };

// KthLargest.prototype.add = function (val) {
//     this.nums.push(val)
//     return this.nums.sort((a, b) => b - a)[this.k - 1]
// };



/**
 * Your KthLargest object will be instantiated and called as such:
 * var obj = new KthLargest(k, nums)
 * var param_1 = obj.add(val)
 */
// @lc code=end


/*
 * @lc app=leetcode.cn id=703 lang=javascript
 *
 * [703] 数据流中的第 K 大元素
 */

// @lc code=start
/**
 * @param {number} k
 * @param {number[]} nums
 */
var KthLargest = function (k, nums) {

};

/** 
 * @param {number} val
 * @return {number}
 */
KthLargest.prototype.add = function (val) {

};

class MinHeap {
    constructor(data = []) {
        this.data = data

    }
    bubbleUp(i) { }
    bubbleDown(i){}
    comparator(a, b) {
        return a - b
    }
    peek() {//返回栈顶元素
        if (!this.size()) return null;
        return this.data[0]
    }
    swap(i1, i2) {
        [this.data[i1], this.data[i2]] = [this.data[i2], this.data[i1]]
    }
    size() {
        return this.data.size
    }
}

/**
 * Your KthLargest object will be instantiated and called as such:
 * var obj = new KthLargest(k, nums)
 * var param_1 = obj.add(val)
 */
// @lc code=end


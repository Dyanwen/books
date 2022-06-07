/*
 * @lc app=leetcode.cn id=225 lang=javascript
 *
 * [225] 用队列实现栈
 */

// @lc code=start
var MyStack = function () {
    this.queue = [];
    this.tmp = [];
};

/**
 * @param {number} x
 * @returns {void}
 */
MyStack.prototype.push = function (x) {
    this.queue.push(x);
};

/**
 * @returns {void}
 */
MyStack.prototype.pop = function () {
    while (this.queue.length > 1) {
        this.tmp.push(this.queue.shift());
    }
    this.queue.shift();
    this.queue = this.tmp;
    this.tmp = [];
};

/**
 * @returns {number}
 */
MyStack.prototype.top = function () {
    while (this.queue.length > 1) {
        this.tmp.push(this.queue.shift());
    }
    var ele = this.queue.shift();
    this.tmp.push(ele);
    this.queue = this.tmp;
    this.tmp = [];
    return ele;
};

/**
 * @returns {boolean}
 */
MyStack.prototype.empty = function () {
    return this.queue.length === 0;

};

/**
 * Your MyStack object will be instantiated and called as such:
 * var obj = new MyStack()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.empty()
 */
// @lc code=end


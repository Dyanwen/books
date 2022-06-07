/*
 * @lc app=leetcode.cn id=22 lang=javascript
 *
 * [22] 括号生成
 */

// @lc code=start
/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
    let list = []
    function gen(left, right, n, result) {
        if (left == n && right == n) {
            list.push(result)
            return
        }
        if (left < n) {
            gen(left + 1, right, n, result + '(')
        }
        if (left > right && right < n) {
            gen(left, right + 1, n, result + ')')
        }
    }
    gen(0, 0, n, '')
    return list
};


// @lc code=end


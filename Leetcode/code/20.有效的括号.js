/*
 * @lc app=leetcode.cn id=20 lang=javascript
 *
 * [20] 有效的括号
 */

// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
    const sr = s.split('');
    const map = {
        '(': ')',
        '[': ']',
        '{': '}'
    }
    let stack = [];
    for (let i = 0; i < sr.length; i++) {
        if (Object.keys(map).includes(sr[i])) {
            stack.push(sr[i])
        } else if (map[stack.pop()] !== sr[i]) {
            return false;
        }
    }
    return !stack.length
};
// @lc code=end


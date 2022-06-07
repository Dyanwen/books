/*
 * @lc app=leetcode.cn id=242 lang=javascript
 *
 * [242] 有效的字母异位词
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function (s, t) {
    const stack = {};
    const sr = s.split('')
    const tr = t.split('')
    for (let i = 0; i < sr.length; i++) {
        if (stack[sr[i]]) {
            stack[sr[i]] += 1
        } else {
            stack[sr[i]] = 1
        }
    }
    for (let i = 0; i < tr.length; i++) {
        if (stack[tr[i]]) {
            stack[tr[i]] -= 1
        } else {
            return false
        }
    }
    return Object.values(stack).every(o => !o)
};
// @lc code=end


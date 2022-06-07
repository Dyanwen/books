/*
 * @lc app=leetcode.cn id=1047 lang=javascript
 *
 * [1047] 删除字符串中的所有相邻重复项
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
var removeDuplicates = function (s) {
    let sr = []
    for (const key of s) {
        if (sr.length && sr[sr.length - 1] == key) {
            sr.pop()
        } else {
            sr.push(key)
        }
    }
    return sr.join('')
};
// @lc code=end


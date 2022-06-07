/*
 * @lc app=leetcode.cn id=49 lang=javascript
 *
 * [49] 字母异位词分组
 */

// @lc code=start
/**
 * @param {string[]} strs
 * @return {string[][]}
 */
// var groupAnagrams = function (strs) {
//     const map = new Map()
//     for (const str of strs) {
//         let array = Array.from(str);//对一个类似数组或可迭代对象创建一个新的，浅拷贝的数组实例
//         array.sort();
//         let s = array.toString();
//         let list = map.get(s) ? map.get(s) : new Array();
//         list.push(str)
//         map.set(s, list)
//     }
//     return Array.from(map.values())
// };
var groupAnagrams = function (strs) {
    const map = new Object();
    for (const s of strs) {
        const count = new Array(26).fill(0);
        for (const c of s) {
            count[c.charCodeAt() - 'a'.charCodeAt()]++;
        }
        map[count] ? map[count].push(s) : map[count] = [s]
    }
    return Object.values(map)
};
// @lc code=end


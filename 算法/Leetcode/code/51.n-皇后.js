/*
 * @lc app=leetcode.cn id=51 lang=javascript
 *
 * [51] N 皇后
 */

// @lc code=start
/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function (n) {
    if (n < 1) return []
    let result = [], cols = new Set(), pie = new Set(), na = new Set()
    DFS(n, 0, [])
    return _generate_result(n)

    function _generate_result(n) {
        let board = []
        for (let res = 0; res < result.length; res++) {
            for (let i = 0; i < array.length; i++) {
                board.push('.'.repeat(i) + "Q" + '.'.repeat(n - i - 1))
            }
        }
        return 
    }

    function DFS(n, row, cur_state) {
        if (row > n) {
            result.push(cur_state)
            return
        }
        for (let col = 0; col < n; col++) {
            if (cols.has(col) || pie.has(row + col) || na.has(row - col)) {
                continue
            }
            cols.add(col)
            pie.add(col + row)
            na.add(row - col)
            DFS(n, row + 1, cur_state + [col])
            cols.delete(col)
            pie.delete(col + row)
            na.delete(row - col)
        }
    }
};
// @lc code=end


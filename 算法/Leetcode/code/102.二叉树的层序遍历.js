/*
 * @lc app=leetcode.cn id=102 lang=javascript
 *
 * [102] 二叉树的层序遍历
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function (root) {
    const ret = []
    if (!root) {
        return ret
    }
    let result = []
    dfs(root, 0)
    function dfs(node, level) {
        if (!node) {
            return
        }
        if (result.length < level + 1) {
            result.push([])
        }
        result[level].push(node.val)
        dfs(node.left, level + 1)
        dfs(node.right, level + 1)
    }
    return result
};

// var levelOrder = function (root) {
//     const ret = []
//     if (!root) {
//         return ret
//     }
//     const queue = []
//     queue.push(root)
//     while (queue.length !== 0) {
//         const temp = [];
//         const size = queue.length; // 需先保存queue的元素个数（下面代码会修改queue）
//         for (let i = 0; i < size; i++) {
//             const node = queue.shift(); // 取数组第一个元素; node -> TreeNode
//             temp.push(node.val);
//             if (node.left != null) {
//                 queue.push(node.left);
//             }
//             if (node.right != null) {
//                 queue.push(node.right);
//             }
//         }
//         ret.push(temp);
//     }
//     return ret;
// };
// @lc code=end


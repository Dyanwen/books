/*
 * @lc app=leetcode.cn id=144 lang=javascript
 *
 * [144] 二叉树的前序遍历
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
function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
}
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var preorderTraversal = function (root) {
    const answer = []
    const traversal = (node, arr) => {
        if (!node) return;
        arr.push(node.val)
        traversal(node.left, answer)
        traversal(node.right, answer)
    }
    traversal(root, answer)
    return answer
};
// var preorderTraversal = function (root) {
//     const answer = []
//     const stack = []
//     if (!root) {
//         return answer
//     }
//     stack.push(root)
//     while (stack.length) {
//         const cur = stack.pop()
//         answer.push(cur.val)
//         if (cur.right) {
//             stack.push(cur.right)
//         }
//         if (cur.left) {
//             stack.push(cur.left)
//         }
//     }
//     return answer
// };
// @lc code=end


/*
 * @lc app=leetcode.cn id=206 lang=javascript
 *
 * [206] 反转链表
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
}
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function (head) {
    let [cur, pre] = [head, null]
    while (cur) {
        [cur.next, pre, cur] = [pre, cur, cur.next]
    }
    return pre
};
// @lc code=end


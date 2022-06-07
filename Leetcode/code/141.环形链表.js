/*
 * @lc app=leetcode.cn id=141 lang=javascript
 *
 * [141] 环形链表
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function (head) {
    let s = new Set();
    while (head && head.next) {
        if (s.has(head)) {
            return true
        } else {
            s.add(head)
        }
        head = head.next;
    }
    return false
    // let fast = head;
    // let slow = head;
    // while (slow && fast && fast.next) {
    //     slow = slow.next;
    //     fast = fast.next.next;
    //     if (slow == fast) {
    //         return true
    //     }
    // }
    // return false
};
// @lc code=end


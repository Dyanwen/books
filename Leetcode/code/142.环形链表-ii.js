/*
 * @lc app=leetcode.cn id=142 lang=javascript
 *
 * [142] 环形链表 II
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
 * @return {ListNode}
 */
var detectCycle = function (head) {
    let fast = head;
    let slow = head;
    while (fast && slow && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow == fast) {
            slow = head;
            while (slow !== fast) {
                slow = slow.next;
                fast = fast.next;
            }
            return slow;
        }
    }
    return null;
    // let s = new Set();
    // while (head && head.next) {
    //     if (s.has(head)) {
    //         return head
    //     } else {
    //         s.add(head)
    //     }
    //     head = head.next;
    // }
    // return null
};
// @lc code=end


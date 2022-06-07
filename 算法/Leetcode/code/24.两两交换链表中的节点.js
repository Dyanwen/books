/*
 * @lc app=leetcode.cn id=24 lang=javascript
 *
 * [24] 两两交换链表中的节点
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */

// var swapPairs = function (head) {
//     if (head == null || head.next == null) {
//         return head
//     }
//     const newHead = head.next
//     head.next = swapPairs(newHead.next);
//     newHead.next = head;
//     return newHead;
// };


var swapPairs = function (head) {
    const dummyHead = new ListNode(0)
    dummyHead.next = head
    let temp = dummyHead
    while (temp.next && temp.next.next) {
        const node1 = temp.next;
        const node2 = temp.next.next;
        temp.next = node2
        node1.next = node2.next
        node2.next = node1
        temp = node1;
    }
    return dummyHead.next;
};
// @lc code=end


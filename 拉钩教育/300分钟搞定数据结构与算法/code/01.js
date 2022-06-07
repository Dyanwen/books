// function reverse(s) {
//     return s.split('').reverse().join('');
// }


// let str = 'algorithm'
// let result = reverse(str);
// console.log(result);


/**
 * leetcode 242
 * 给定两个字符串 s 和 t，编写一个函数来判断 t 是否是 s 的字母异位词。
 */

// let s = "anagram", t = "nagaram";
// let s1 = "rat", t1 = "car"
// function compareStr(s, n) {
//     let a = 'qwertyuioplkjhgfdsazxcvbnm'.split('');
//     let o = {};
//     a.forEach(i => o[i] = 0);
//     let sa = s.split(''), na = n.split('');
//     for (let i = 0; i < sa.length; i++) {
//         const e = sa[i];
//         o[e]++;
//     }
//     for (let i = 0; i < na.length; i++) {
//         const e = na[i];
//         o[e]--;
//     }
//     for (const key in o) {
//         if (o[key] != 0) {
//             return false;
//         }
//     }
//     return true;
// }
// var result = compareStr(s1, t1)
// console.log(result);


/**
 * LeetCode 第 25 题
 * 给你一个链表，每 k 个节点一组进行翻转，请你返回翻转后的链表。k 是一个正整数，它的值小于或等于链表的长度。如果节点总数不是 k 的整数倍，那么请将最后剩余的节点保持原有顺序
 * 给定这个链表：1->2->3->4->5
 * 当 k=2 时，应当返回：2->1->4->3->5
 * 当 k=3 时，应当返回：3->2->1->4->5
 */

// function ListNode(val, next) {
//     this.val = (val === undefined ? 0 : val);
//     this.next = (next === undefined ? 0 : val);
// }

// function reverseList(headtemp) {
//     let head = headtemp;
//     let pre = null;
//     let post = null;

//     while (head !== null) {
//         post = head.next;
//         head.next = pre;
//         pre = head;
//         head = post;
//     }
// }
// function getEndNode(head, k) {
//     for (let i = 0; i < k - 1; i++) {
//         if (head == null) {
//             return false
//         }
//         head = head.next;
//     }
//     return head;
// }

// function reverseKGroup(head, k) {
//     let first = null;
//     let pre = null;
//     while (head != null) {
//         let start = head;
//         let end = getEndNode(head, k);
//         if (end === false || end === null) {
//             return first;
//         } else {
//             head = end.next;
//         }
//         end.next = null;
//         reverseList(start)
//         start.next = head;
//         if (pre != null) {
//             pre.next = end
//         } else {
//             first = end;
//         }
//         pre = start
//     }
//     return first;

// }

/**
 * LeetCode 第 20 题
 * 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。
 */

// let stack1 = "({[]})", stack2 = "{[";
// function stackEmprt(s) {
//     let arr = s.split('');
//     let o = {
//         '[':']',
//         '{':'}',
//         '(':')',
//     }
//     let newStack = [];
//     arr.forEach(e => {
//         if (e == '[' || e == '{' || e == '(') {
//             newStack.push(e);
//         }
//         if (e == ']' || e == '}' || e == ')') {
//             if (o[newStack[newStack.length - 1]] === e ) {
//                 newStack.pop(e);
//             }
//         }
//     });
//     return !newStack.length;
// }
// let result = stackEmprt(stack1);
// console.log(result)

/**
 * LeetCode 第 739 题：
 * 根据每日气温列表，请重新生成一个列表，对应位置的输入是你需要再等待多久温度才会升高超过该日的天数。如果之后都不会升高，请在该位置用 0 来代替。
 */

// let stack1 = [23, 25, 21, 19, 22, 26, 23];
// function generateList(s) {
//     let res = [], index = [];
//     for (let i = s.length - 1; i >= 0; i--) {
//         while (index.length > 0 && s[index[index.length - 1]] <= s[i]) {
//             index.pop()
//         }
//         res[i] = index.length > 0 ? index[index.length - 1] - i : 0;
//         index.push(i);
//     }
//     return res;

// }

// var dailyTemperatures = function (T) {
//     let stack = [];
//     for (let i = 0; i < T.length; i++) {
//         for (let j = i; j < T.length; j++) {
//             if (T[j] > T[i]) {
//                 stack.push(j + i);
//                 break
//             } else {
//                 stack.push(0);
//             }
//         }
//     }
//     return stack;
// };
// function generateList(T) {
//     let result = new Array(T.length).fill(0),
//         stack = [];
//     for (let i = 0; i < T.length; i++) {
//         while (stack.length && T[i] > T[stack[stack.length - 1]]) {
//             let index = stack.pop();
//             result[index] = i - index;
//         }
//         stack.push(i);
//     }
//     return result;
// }
// let result = generateList(stack1);
// console.log(result);
/**
 * LeetCode 第 239 题：
 * 给定一个数组 nums，有一个大小为 k 的滑动窗口从数组的最左侧移动到数组的最右侧。你只可以看到在滑动窗口 k 内的数字，滑动窗口每次只向右移动一位。返回滑动窗口最大值。
 */
// 示例：给定一个数组以及一个窗口的长度 k，现在移动这个窗口，要求打印出一个数组，数组里的每个元素是当前窗口当中最大的那个数。
// 输入：nums = [1, 3, -1, -3, 5, 3, 6, 7]，k = 3
// 输出：[3, 3, 5, 5, 6, 7]
let num = [1, 3, -1, -3, 5, 3, 6, 7];
function maxSlidingWindow(nums, k) {
    if (!nums) {
        return []
    }
    let n = [], r = [];
    for (let i = 0; i < nums.length; i++) {
        if (i >= k && n[0] <= i - k) {

        }
    }
}

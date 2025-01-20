// You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

// You may assume the two numbers do not contain any leading zero, except the number 0 itself.

// Example 1:

// Input: l1 = [2,4,3], l2 = [5,6,4]
// Output: [7,0,8]
// Explanation: 342 + 465 = 807.
// Example 2:

// Input: l1 = [0], l2 = [0]
// Output: [0]
// Example 3:

// Input: l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
// Output: [8,9,9,9,0,0,0,1]

// Constraints:

// The number of nodes in each linked list is in the range [1, 100].
// 0 <= Node.val <= 9
// It is guaranteed that the list represents a number that does not have leading zeros.

// TC: O(max(m,n)), we're looping thorough the LL with the max number of elements.
// SC: O(max(max(m,n), (n+1)), we're building an output LL that may hold at most max(max(m,n), (n+1)), where m and n are the number of elements in the LL and 1 is the carry

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
  //   (2) -> (4) -> (3)
  // + (5) -> (6) -> (4)
  // -------------------
  //   (7) -> (0) -> (8)

  let dummy = new ListNode();
  let curr = dummy;

  let carry = 0;

  while (l1 || l2 || carry) {
    const v1 = l1 !== null ? l1.val : 0;
    const v2 = l2 !== null ? l2.val : 0;

    // Compute the addition of the values
    let val = v1 + v2 + carry;
    carry = Math.floor(val / 10); // we need the second digit for the carry
    val = val % 10; // we need the first digit to create the new node

    // This node points to dummy and is used to capture the output LL
    curr.next = new ListNode(val);

    // Update the pointers
    curr = curr.next;
    l1 = l1 !== null ? l1.next : null;
    l2 = l2 !== null ? l2.next : null;
  }

  return dummy.next;
};

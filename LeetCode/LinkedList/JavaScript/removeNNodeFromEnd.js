// Given the head of a linked list, remove the nth node from the end of the list and return its head.

// Example 1:

// Input: head = [1,2,3,4,5], n = 2
// Output: [1,2,3,5]
// Example 2:

// Input: head = [1], n = 1
// Output: []
// Example 3:

// Input: head = [1,2], n = 1
// Output: [1]

// Constraints:

// The number of nodes in the list is sz.
// 1 <= sz <= 30
// 0 <= Node.val <= 100
// 1 <= n <= sz

// Follow up: Could you do this in one pass?

// TC: O(n) we need do traverse all nodes in the LL to find the n node from end
// SC: O(1) in place processing

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
  let dummy = new ListNode(0, head); // we use a dummy node to return the new LL
  let left = dummy; // left pointer initial points at the dummy node
  let right = head; // right pointer initial points to head

  // We need to move right pointer n nodes
  while (right && n > 0) {
    right = right.next;
    n -= 1;
  }

  // Then, we need to move both right and left pointers until right is null
  while (right) {
    left = left.next;
    right = right.next;
  }

  // At this point, we found the node which is n node from the end
  // We need to delete this node
  left.next = left.next.next;

  // We're done
  return dummy.next;
};

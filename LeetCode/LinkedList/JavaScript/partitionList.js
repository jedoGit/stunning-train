// Given the head of a linked list and a value x, partition it such that all nodes less than x come before nodes greater than or equal to x.

// You should preserve the original relative order of the nodes in each of the two partitions.

// Example 1:

// Input: head = [1,4,3,2,5,2], x = 3
// Output: [1,2,2,4,3,5]
// Example 2:

// Input: head = [2,1], x = 2
// Output: [1,2]

// Constraints:

// The number of nodes in the list is in the range [0, 200].
// -100 <= Node.val <= 100
// -200 <= x <= 200

// TC: O(n), we visit all input nodes
// SC: O(1), in place processing

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} x
 * @return {ListNode}
 */
var partition = function (head, x) {
  let left = new ListNode(); // initialize to an empty node. This is our dummy left node
  let right = new ListNode(); // Initialized to an empty node. This is our dummy right node

  let cur = head;
  let curLeft = left;
  let curRight = right;

  // We'll traverse through all the nodes and filter the nodes.
  // All nodes that have val less than x will be linked to the left dummy node, and the rest is on the right dummy node
  // We need current pointers listed above
  while (cur) {
    // console.log(cur)
    if (cur.val < x) {
      // Connect this node to the left pointer
      curLeft.next = cur;
      curLeft = curLeft.next;
    } else {
      // Connect this node to the right pointer
      curRight.next = cur;
      curRight = curRight.next;
    }

    cur = cur.next;
  }

  // console.log(curRight, curLeft)

  // Last step is to connect the left dummy pointer to the right dummy pointer,
  curLeft.next = right.next;
  // Then, set curRight.next to null to create a new end node
  curRight.next = null;

  // We're done and return left.next
  return left.next;
};

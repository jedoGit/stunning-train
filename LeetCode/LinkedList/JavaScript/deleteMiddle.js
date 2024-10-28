// You are given the head of a linked list. Delete the middle node, and return the head of the modified linked list.

// The middle node of a linked list of size n is the ⌊n / 2⌋th node from the start using 0-based indexing, where ⌊x⌋ denotes the largest integer less than or equal to x.

// For n = 1, 2, 3, 4, and 5, the middle nodes are 0, 1, 1, 2, and 2, respectively.

// Example 1:

// Input: head = [1,3,4,7,1,2,6]
// Output: [1,3,4,1,2,6]
// Explanation:
// The above figure represents the given linked list. The indices of the nodes are written below.
// Since n = 7, node 3 with value 7 is the middle node, which is marked in red.
// We return the new list after removing this node.
// Example 2:

// Input: head = [1,2,3,4]
// Output: [1,2,4]
// Explanation:
// The above figure represents the given linked list.
// For n = 4, node 2 with value 3 is the middle node, which is marked in red.
// Example 3:

// Input: head = [2,1]
// Output: [2]
// Explanation:
// The above figure represents the given linked list.
// For n = 2, node 1 with value 1 is the middle node, which is marked in red.
// Node 0 with value 2 is the only node remaining after removing node 1.

// Constraints:

// The number of nodes in the list is in the range [1, 105].
// 1 <= Node.val <= 105

// TC: O(n) we're traverse the LL to find the middle
// SC: O(1) we're not creating new memory

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
var deleteMiddle = function (head) {
  // Edge cases
  if (!head || !head.next) return null;

  // We'll use two pointers, one fast and the other slow.
  // The slow pointer will be used to find the middle node of the LL
  let slowPtr = head;
  let fastPtr = head.next.next; // We want to the fast pointer move 2 steps ahead so we find the prev node of the middle node

  // Let's traverse the Singly LL and find the middle
  while (fastPtr && fastPtr.next) {
    slowPtr = slowPtr.next;
    fastPtr = fastPtr.next.next;
  }

  // We found the node prev to the middle node
  // We'll start deleting the middle note
  slowPtr.next = slowPtr.next.next;

  // Return the head
  return head;
};

// Recursive solution

var reverseList = function (head) {
  if (!head || !head.next) {
    return head;
  }

  var newHead = reverseList(head.next);
  head.next.next = head;
  head.next = null;
  return newHead;
};

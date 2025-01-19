// Given the head of a singly linked list, reverse the list, and return the reversed list.

// Example 1:

// Input: head = [1,2,3,4,5]
// Output: [5,4,3,2,1]
// Example 2:

// Input: head = [1,2]
// Output: [2,1]
// Example 3:

// Input: head = []
// Output: []

// Constraints:

// The number of nodes in the list is the range [0, 5000].
// -5000 <= Node.val <= 5000

// Follow up: A linked list can be reversed either iteratively or recursively. Could you implement both?

// TC: O(n) we're traversing the LL
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
var reverseList = function (head) {
  if (!head) return head;

  let prev = head;
  let cur = prev.next;

  // We want to point cur.next to the prev node
  // Then, we move the pointers to the right
  while (cur) {
    let tmp = cur.next; // save cur.next
    cur.next = prev; // point cur.next to the prev node
    prev = cur; // move the prev pointer to the right
    cur = tmp; // move the cur pointer to the right
  }

  // Update the head.next to point to null
  // The head is now the tail at this point
  head.next = null;

  // We return the prev pointer. The prev pointer is now the head at this point
  return prev;
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

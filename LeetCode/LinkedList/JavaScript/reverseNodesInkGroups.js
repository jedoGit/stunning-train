// Given the head of a linked list, reverse the nodes of the list k at a time, and return the modified list.

// k is a positive integer and is less than or equal to the length of the linked list. If the number of nodes is not a multiple of k then left-out nodes, in the end, should remain as it is.

// You may not alter the values in the list's nodes, only nodes themselves may be changed.

// Example 1:

// Input: head = [1,2,3,4,5], k = 2
// Output: [2,1,4,3,5]
// Example 2:

// Input: head = [1,2,3,4,5], k = 3
// Output: [3,2,1,4,5]

// Constraints:

// The number of nodes in the list is n.
// 1 <= k <= n <= 5000
// 0 <= Node.val <= 1000

// Follow-up: Can you solve the problem in O(1) extra memory space?

// TC: O(n), we visit all the nodes and reverse the nodes in k groups
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
 * @param {number} k
 * @return {ListNode}
 */
var reverseKGroup = function (head, k) {
  // What we need to do here is reverse k nodes at a time.
  // To do this, we need to find the start and end of the k nodes we need to reverse

  let dummy = new ListNode(0, head); // We use a dummy node so we can create our output LL
  let groupPrev = dummy; // the groupPrev pointer marks the start of the nodes we need to reverse

  while (true) {
    let kth = getKth(groupPrev, k); // Let's call a helper function to get the pointer of the kth node

    // If the kth node is null, we're done processing
    if (!kth) {
      break;
    }
    // The kth node is the end node that we need to reverse. We need to mark the start of the next group that need to be reversed
    groupNext = kth.next;

    // Then, let's reverse the nodes of the current group we have
    let prev = kth.next;
    let curr = groupPrev.next;
    let tmp = null;

    while (curr !== groupNext) {
      tmp = curr.next;
      curr.next = prev;
      prev = curr;
      curr = tmp;
    }

    // Here, we're just updating our pointers for the next group of nodes
    tmp = groupPrev.next;
    groupPrev.next = kth;
    groupPrev = tmp;
  }

  // This helper function traverse k nodes and return the pointer of the kth node given a starting node
  function getKth(curr, k) {
    while (curr && k > 0) {
      curr = curr.next;
      k -= 1;
    }
    return curr;
  }

  return dummy.next;
};

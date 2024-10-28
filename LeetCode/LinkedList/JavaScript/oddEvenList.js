// Given the head of a singly linked list, group all the nodes with odd indices together followed by the nodes with even indices, and return the reordered list.

// The first node is considered odd, and the second node is even, and so on.

// Note that the relative order inside both the even and odd groups should remain as it was in the input.

// You must solve the problem in O(1) extra space complexity and O(n) time complexity.

// Example 1:

// Input: head = [1,2,3,4,5]
// Output: [1,3,5,2,4]
// Example 2:

// Input: head = [2,1,3,5,6,4,7]
// Output: [2,3,6,7,1,5,4]

// Constraints:

// The number of nodes in the linked list is in the range [0, 104].
// -106 <= Node.val <= 106

// TC: O(n) we're traversing the LL
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
 * @return {ListNode}
 */
var oddEvenList = function (head) {
  if (!head) return head;

  // From the requirements, the first node is considered odd, the second node is even.
  // We'll defince our indices like this.

  let odd = head;
  let even = head.next;
  let evenHead = even; // We need to save the even head so we can connect the odd LL to the even LL later

  // We only check for the even node. If there's only 1 node, then it's an odd node
  while (even && even.next) {
    // Point the odd.next pointer to the next odd node
    odd.next = even.next;
    // Move the odd pointer to the next odd node
    odd = odd.next;
    // Point the even.next pointer to the next even node
    even.next = odd.next;
    // Move the even pointer to the next even node
    even = even.next;
  }

  // After exiting the while loop, we know that the even LL is terminated with a null
  // We need to link the odd LL to the even LL.
  odd.next = evenHead;

  return head;
};

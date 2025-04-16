// Given the head of a linked list, return the list after sorting it in ascending order.

// Example 1:

// Input: head = [4,2,1,3]
// Output: [1,2,3,4]
// Example 2:

// Input: head = [-1,5,3,4,0]
// Output: [-1,0,3,4,5]
// Example 3:

// Input: head = []
// Output: []

// Constraints:

// The number of nodes in the list is in the range [0, 5 * 104].
// -105 <= Node.val <= 105

// Follow up: Can you sort the linked list in O(n logn) time and O(1) memory (i.e. constant space)?

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
var sortList = function (head) {
  if (!head || !head.next) return head;

  // Find middle of the current LL
  let mid = findMid(head);
  // Find right of middle
  let r = mid.next;
  // Mark the mid as the end of the current ll
  mid.next = null;

  // Find left of the current ll
  let l = sortList(head);
  r = sortList(r);

  // Find the mid of the ll.. Use slow fast pointer
  function findMid(root) {
    let slow = root;
    let fast = root.next;

    while (fast && fast.next) {
      slow = slow.next;
      fast = fast.next.next;
    }
    return slow;
  }

  // Merge two ll
  function mergeLists(l1, l2) {
    let dummy = new ListNode(null);
    let temp = dummy;

    while (l1 && l2) {
      if (l1.val < l2.val) {
        temp.next = l1;
        l1 = l1.next;
      } else {
        temp.next = l2;
        l2 = l2.next;
      }

      temp = temp.next;
    }

    temp.next = l1 || l2;
    return dummy.next;
  }

  return mergeLists(l, r);
};

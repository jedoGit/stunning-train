// You are given the heads of two sorted linked lists list1 and list2.

// Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.

// Return the head of the merged linked list.

// Example 1:

// Input: list1 = [1,2,4], list2 = [1,3,4]
// Output: [1,1,2,3,4,4]
// Example 2:

// Input: list1 = [], list2 = []
// Output: []
// Example 3:

// Input: list1 = [], list2 = [0]
// Output: [0]

// Constraints:

// The number of nodes in both lists is in the range [0, 50].
// -100 <= Node.val <= 100
// Both list1 and list2 are sorted in non-decreasing order.

// TC: O(m+n), we visit at most the all nodes of the input LL
// SC: O(1), we only create 1 dummy node which is negligible

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function (list1, list2) {
  //  L1  (1) -> (2) -> (4)
  //  L2  (1) -> (3) -> (4)
  // -------------------
  //  (1) -> (1) -> (2) -> (3) -> (4) -> (4)

  // We'll use a dummy node to create our output LL
  // tail will point to our dummy node
  let dummy = new ListNode();
  let tail = dummy;

  // We traverse through the nodes in both LL and compare the values
  // Make sure both LLs are not null
  while (list1 && list2) {
    // compare the values... point tail.next to the ll with the smaller value
    // then move the ll to the next node
    if (list1.val < list2.val) {
      tail.next = list1;
      list1 = list1.next;
    } else {
      tail.next = list2;
      list2 = list2.next;
    }
    // make sure to move the tail to the next node
    tail = tail.next;
  }

  // After the merge completed in the while loop, sometimes, there will be one ll that will be longer.
  // We need to connect the remaining nodes of the longer LL to our output LL
  if (list1) {
    tail.next = list1;
  } else if (list2) {
    tail.next = list2;
  }

  // Our output LL starts at dummy.next, so return dummy.next
  return dummy.next;
};

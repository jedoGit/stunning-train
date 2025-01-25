// Given the head of a sorted linked list, delete all nodes that have duplicate numbers, leaving only distinct numbers from the original list. Return the linked list sorted as well.

// Example 1:

// Input: head = [1,2,3,3,4,4,5]
// Output: [1,2,5]
// Example 2:

// Input: head = [1,1,1,2,3]
// Output: [2,3]

// Constraints:

// The number of nodes in the list is in the range [0, 300].
// -100 <= Node.val <= 100
// The list is guaranteed to be sorted in ascending order.

// TC: O(n) at traverse all nodes.
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
var deleteDuplicates = function (head) {
  // We always want to use a dummy node
  let dummy = new ListNode(0, head); // this dummy node has it's next pointer point to the head
  let curr = dummy; // we need a current pointer to point initial to the dummy node. The reason for this is that, the first few nodes might be duplicates and we need to remove them.

  while (curr) {
    // Check if the next two nodes are duplicates
    if (curr.next && curr.next.next && curr.next.val === curr.next.next.val) {
      // In this case, there are duplicate nodes, we want to find all the duplicate and find the end of the duplicate nodes
      let temp = curr.next.next;
      while (temp && temp.next && temp.val === temp.next.val) {
        temp = temp.next;
      }
      // Now, we severe the duplicate nodes
      curr.next = temp.next;
    } else {
      // there's no duplicate and move curr to next node
      curr = curr.next;
    }
  }

  return dummy.next;
};

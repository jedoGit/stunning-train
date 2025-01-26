// Given the head of a linked list, rotate the list to the right by k places.

// Example 1:

// Input: head = [1,2,3,4,5], k = 2
// Output: [4,5,1,2,3]
// Example 2:

// Input: head = [0,1,2], k = 4
// Output: [2,0,1]

// Constraints:

// The number of nodes in the list is in the range [0, 500].
// -100 <= Node.val <= 100
// 0 <= k <= 2 * 109

// TC: O(n) => O(n+k), n to get the length of the LL, k to move the cur pointer
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
 * @param {number} k
 * @return {ListNode}
 */
var rotateRight = function (head, k) {
  if (!head) {
    return head;
  }

  // Get the lenght of the LL
  let len = 1; // init lenght to 1 because we're starting our count at the first node... which means we already counted 1 node which is the first node
  let tail = head;

  // Count the number of nodes the LL has and we'll stop at the end node.
  while (tail.next) {
    tail = tail.next;
    len += 1;
  }

  // Now, we know the length of the LL, let's check our length and the k value.
  // If k % length === 0, it means there's no rotation.
  k = k % len;
  if (k === 0) {
    return head;
  }

  // Last step, let's update the pointers to rotate the LL
  let cur = head;
  for (let i = 0; i < len - k - 1; i++) {
    // we need to move our cur pointer len-k-1 nodes.
    cur = cur.next;
  }

  // H        N
  // 1->2->3->4->5
  //       C     T

  // At this point, our cur pointer is pointing to the node which is the new last node
  // the new head is cur.next
  let newHead = cur.next;
  cur.next = null; // cur node is the new last node, so we need to point it to null
  // we need to point tail node to head
  tail.next = head;

  // We're done updating the pointer, we need to return the new head
  return newHead;
};

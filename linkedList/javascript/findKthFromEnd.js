// Implement a member function called findKthFromEnd(k) that finds and returns the kth node from the end of the linked list.
// Note: this LinkedList implementation does not have a length member variable.

// Output:
// Return the kth node from the end of the linked list.
// If the value of k is greater than or equal to the number of nodes in the list, return null.

// Constraints:
// You are not allowed to use any additional data structures (such as arrays) or modify the existing data structure.
// You can only traverse the linked list once.

function findKthFromEnd(k) {
  // This is somekind of a sliding window problem
  // we'll use a fast and slow pointer

  let slow = this.head;
  let fast = this.head;

  // First, we'll need to move the fast pointer one step at
  // a time, until k-1. If we hit a null, it means
  // k is too large for the size of the LL
  for (let i = 0; i < k; i++) {
    if (fast === null) {
      return null;
    }

    fast = fast.next;
  }

  // At the point, now we have a sliding window. The slow points at the head,
  // the fast, points at k-1 node from the head.
  // Moving both pointers until fast hits null, then, the slow pointer
  // is the kth node from the tail.

  // Move both pointer one step at a time until fast equals null
  while (fast !== null) {
    slow = slow.next;
    fast = fast.next;
  }

  // we return the slow pointer
  return slow;
}

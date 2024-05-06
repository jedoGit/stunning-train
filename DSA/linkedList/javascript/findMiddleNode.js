// Problem:
// Implement a member function called findMiddleNode() that finds and returns the middle node of the linked list.

// Note: this LinkedList implementation does not have a length member variable.

// Output:
// Return the middle node of the linked list.
// If the list has an even number of nodes, return the second middle node (the one closer to the end).

// Constraints:
// You are not allowed to use any additional data structures (such as arrays) or modify the existing data structure.
// You can only traverse the linked list once.

function findMiddleNode() {
  // We do not have a node
  if (this.head === null) {
    return null;
  }

  // We only have exactly 1 node
  if (this.head === this.tail) {
    return this.head;
  }

  // At this point, we know we have at least 1 node
  // We'll use a slow and a fast pointer. Both will initially point to head
  // Slow pointer will move one node at a time, fast pointer will move 2 nodes at a time
  // Move both pointers until fast points to null.

  let slow = this.head;
  let fast = this.head;

  // we will stop looping until the fast pointer is null
  while (fast !== null && fast.next !== null) {
    // move slow one step
    slow = slow.next;
    // move fast two steps
    fast = fast.next.next;
  }

  // Return the slow pointers
  return slow;
}

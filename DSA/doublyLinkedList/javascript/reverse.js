// implement a member function called reverse() that reverses the nodes of a doubly linked list.
// Output:
// The function should modify the doubly linked list in-place, reversing the order of the nodes.
// Constraints:
// You can only reverse the nodes themselves, not just their values.

function reverse() {
  // We'll use two pointers
  // Current pointer will initially point to the head
  // The temp pointer will initially point to null
  let current = this.head;
  let temp = null;

  while (current !== null) {
    // First, let's save the current.prev to temp
    temp = current.prev;
    // then we switch the current.prev and current.next
    current.prev = current.next;
    current.next = temp;

    // lastly, we update the current pointer to the next node
    current = current.prev;
  }

  // Once we're done switching the next and prev pointers of all the nodes,
  // we'll switch the head and the tail pointers.
  temp = this.head;
  this.head = this.tail;
  this.tail = temp;
}

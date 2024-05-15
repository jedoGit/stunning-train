// Implement a member function called swapPairs() that swaps every two adjacent nodes of a doubly linked list.
// Note: This DoublyLinkedList does not have a tail pointer which will make the implementation easier.

// Output:
// The function should modify the doubly linked list in-place, swapping every two adjacent nodes.

// Constraints:
// You can only traverse the doubly linked list once.

function swapPairs() {
  // Let's create a dummy node where the next pointer points to the head.
  // Also create a prev pointer to point to the dummy node
  const dummy = new Node(0);
  dummy.next = this.head;
  let prev = dummy;

  // We're going to traverse through the DLL
  // I recommend to use diagrams.net to visualize this algorithm
  while (this.head !== null && this.head.next !== null) {
    const firstNode = this.head;
    const secondNode = this.head.next;

    // take care of the next pointers
    prev.next = secondNode;
    firstNode.next = secondNode.next;
    secondNode.next = firstNode;

    // take care of the prev pointers
    secondNode.prev = prev;
    firstNode.prev = secondNode;
    if (firstNode.next !== null) {
      firstNode.next.prev = firstNode;
    }

    // then move the head and prev pointers
    this.head = firstNode.next;
    prev = firstNode;
  }

  // Cleanup
  // move head dummy.next and sever the dummy connection
  this.head = dummy.next;
  if (this.head) this.head.prev = null;
}

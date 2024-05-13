// Implement a member function called swapFirstLast() that swaps the values of the first and last nodes of a doubly linked list.

// Output:

// The function should modify the doubly linked list in-place, swapping the values of the first and last nodes.

function swapFirstLast() {
  // Check if there's less than 2 nodes in the DoublyLinkedList, then return
  // There's nothing to swap
  if (this.length < 2) {
    return;
  }

  // Store the value only! Not the Node!
  // Then reassign the value
  const temp = this.head.value;

  this.head.value = this.tail.value;

  this.tail.value = temp;
}

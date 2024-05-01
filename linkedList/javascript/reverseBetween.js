// Implement a member function called reverseBetween(m, n) that reverses the nodes between indexes (using 0-based indexing)  m and n (inclusive) in the linked list.
// Note: this linked list class does NOT have a tail which will make this method easier to implement.

// Assumption: You can assume that m and n are not out of bounds.

// Output:
// The function should reverse the nodes between the indexes m and n in the linked list. The reversal should be done in-place.

// Constraints:
// You are not allowed to use any additional data structures (such as arrays) or modify the existing data structure.

// You can only traverse the linked list once.

// Example 1:
// Suppose you have a LinkedList object, list, with the following values:
// 1 -> 2 -> 3 -> 4 -> 5

// After calling the reverseBetween(1, 3) function:

// list.reverseBetween(1, 3);
// The linked list should now have the following values:
// 1 -> 4 -> 3 -> 2 -> 5

// Example 2:
// Now suppose you have a LinkedList object, list, with the following values:
// 1 -> 2 -> 3 -> 4 -> 5 -> 6

// After calling the reverseBetween(3, 5) function:

// list.reverseBetween(3, 5);
// The linked list should now have the following values:
// 1 -> 2 -> 3 -> 6 -> 5 -> 4

function reverseBetween(m, n) {
  // Exit right away if the LL is empty
  if (this.head === null) {
    return;
  }

  // We'll need a dummy node and a pointer to the dummy node
  // Connect the dummy node to the head
  const dummy = new Node(0);
  dummy.next = this.head;
  let prev = dummy;

  // Traverse the prev pointer to the m-1 index
  for (let i = 0; i < m; i++) {
    prev = prev.next;
  }

  // Now we set the current pointer to point to prev.next
  let current = prev.next;

  // Now we reverse between
  for (let i = 0; i < n - m; i++) {
    const temp = current.next;
    current.next = temp.next;
    temp.next = prev.next;
    prev.next = temp;
  }

  this.head = dummy.next;
}

// Implement a member function called removeDuplicates() that removes all duplicate nodes from the linked list based on their values.
// Note: this linked list class does NOT have a tail which will make this method easier to implement.

// Output:
// The function should modify the linked list in-place, removing all nodes with duplicate values.

// Constraints:
// You are allowed to use the JavaScript Set data structure to keep track of unique node values.

function removeDuplicates() {
  // We're allowed to use Set(). A Set() stores only unique values.
  // There's no key-value pair in a Set()
  // Then we'll also use two pointers to manipulate the LL.

  let valCheck = new Set();
  let previous = null;
  let current = this.head;

  // We want to traverse through the LL and check if the current value is in the Set().
  // If it's in the Set(), we sever the current node by setting the previous.next to point to
  // current.next. Then we move the current pointer to current.next.
  // Also, we decrement the length
  // If it's not in the Set(), we add that value to the set and move the previous pointer to
  // the current pointer and move the current to the next LL.

  while (current !== null) {
    if (valCheck.has(current.value)) {
      previous.next = current.next;
      this.length -= 1;
    } else {
      valCheck.add(current.value);
      previous = current;
    }
    current = current.next;
  }
}

// Implement a member function called isPalindrome() that checks if a doubly linked list is a palindrome.
// A doubly linked list is a palindrome if the sequence of values read from the head to the tail is the same as the sequence of values read from the tail to the head.
// Output:
// Return a boolean value: true if the doubly linked list is a palindrome, and false otherwise.
// Constraints:
// You can only traverse the doubly linked list once.

function isPalindrome() {
  if (this.length < 2) {
    return true;
  }

  let start = this.head;
  let end = this.tail;

  // We want to compare the values of the start and end pointer
  // For each iteration, we want to move the start pointer to the right
  // while, we move the end pointer to the left.
  // We'll stop once we hit this.length/2, which is the middle of the DLL.

  for (let i = 0; i < Math.floor(this.length / 2); i++) {
    if (start.value !== end.value) {
      return false;
    }

    start = start.next;
    end = end.prev;
  }

  return true;
}

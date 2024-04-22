// Write a method called hasLoop that is part of the linked list class.
// The method should be able to detect if there is a cycle or loop present in the linked list.
// You are required to use Floyd's cycle-finding algorithm (also known as the "tortoise and the hare" algorithm) to detect the loop.
// This algorithm uses two pointers: a slow pointer and a fast pointer. The slow pointer moves one step at a time, while the fast pointer moves two steps at a time. If there is a loop in the linked list, the two pointers will eventually meet at some point. If there is no loop, the fast pointer will reach the end of the list.
// The method should follow these guidelines:

// Create two pointers, slow and fast, both initially pointing to the head of the linked list.
// Traverse the list with the slow pointer moving one step at a time, while the fast pointer moves two steps at a time.
// If there is a loop in the list, the fast pointer will eventually meet the slow pointer. If this occurs, the method should return true.
// If the fast pointer reaches the end of the list or encounters a null value, it means there is no loop in the list. In this case, the method should return false.

// Output:

// Return true if the linked list has a loop.
// Return false if the linked list does not have a loop.

// Constraints:

// You are not allowed to use any additional data structures (such as arrays) or modify the existing data structure.
// You can only traverse the linked list once.

function hasLoop() {
  // Initialize the slow and fast pointers to point to head
  let slow = this.head;
  let fast = this.head;

  // We need to stop the loop when the fast pointer points to null
  while (fast !== null && fast.next !== null) {
    // move the slow pointer one node at a time
    slow = slow.next;
    // move the fast pointer two nodes at a time
    fast = fast.next.next;

    // if we test that slow and fast pointers are equal,
    // then there is a loop and return true
    if (slow === fast) {
      return true;
    }
  }

  // If we exit the while loop, that means there's no loop
  return false;
}

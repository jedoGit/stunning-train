// Implement the Selection Sort algorithm on a singly linked list.
// The linked list will contain integer elements.
// You are required to write a method selectionSort() within the LinkedList class. This method will sort the linked list in ascending order using the Selection Sort algorithm.
// The Selection Sort algorithm works by dividing the list into a sorted and an unsorted region. The sorted region starts out empty and the unsorted region is initially the entire list. The algorithm repeatedly selects the smallest (or largest, depending on sorting order) element from the unsorted region and moves it into the sorted region. When the unsorted region becomes empty, the algorithm stops and the list is sorted.
// Here is a brief overview of the steps involved in implementing the selection sort algorithm:
// Check if the length of the linked list is less than 2. If it is, the list is already sorted, so the method should return immediately.
// Initialize a Node object current to the head of the list.
// Set up a while loop that continues as long as current.next is not null.
// Within this loop, set smallest to current and innerCurrent to the next node in the list.
// While innerCurrent is not null, if innerCurrent's value is less than smallest's value, set smallest to innerCurrent. Then, advance innerCurrent to the next node.
// After going through all nodes in the unsorted region, if smallest is not current, swap the values in smallest and current.
// Move current to the next node and repeat the process until the entire list is sorted.
// At the end of the sort, update the tail of the list to current.
// Please ensure your code follows these steps to correctly implement the selection sort method.
// Assume that all values in the list are integers. The selectionSort() method should not return any value; it should sort the linked list in-place. That is, it should modify the original linked list rather than creating and returning a new, sorted list.

// For selection sort, we first start by compararing the value on the first node if it's less that each value of the nodes to the right
// We use a pointer to continuously keep track of which node has the smaller value. After we hit the end of the LL, we swap the value
// We keep keep doing this until we visit all the nodes.
function selectionSort() {
  if (this.length < 2) return;

  // This pointer the the node we compare to all nodes in the right
  let current = this.head;

  while (current.next !== null) {
    // The smallest pointer is used to keep track of the node which has the smaller value compared to the current pointer
    let smallest = current;
    // This pointer is used to compare to the current pointer. Remember, we compare the current pointer to all the nodes to the right.
    // The innerCurrent will start to the right of the current pointer.
    let innerCurrent = current.next;

    // Loop through all the nodes to the right of current and compare the value if it's less than what's pointed by the smallest pointer.
    // Update the smallest pointer to point to the innerCurrent pointer if we find a smaller value
    while (innerCurrent !== null) {
      if (innerCurrent.value < smallest.value) {
        smallest = innerCurrent;
      }

      innerCurrent = innerCurrent.next;
    }

    // After we finish the inner while loop, we swap the value of node pointed by the smallest pointer and the current pointer.
    if (smallest !== current) {
      const temp = current.value;
      current.value = smallest.value;
      smallest.value = temp;
    }

    // We'll move the current pointer to the next node
    current = current.next;
  }
}

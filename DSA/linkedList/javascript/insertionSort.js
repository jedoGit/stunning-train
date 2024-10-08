// Write  insertionSort() method that sorts a singly linked list in ascending order using the Insertion Sort algorithm. The method should take no input arguments.
// The insertionSort() method should sort the linked list in place by repeatedly inserting each unsorted node into its correct position in the sorted part of the list.  If the length of the linked list is less than 2, the method should simply return because the list is already sorted.  After the sort, the method should update the head and tail pointers of the linked list to point to the first and last nodes, respectively.
// The implementation should start with a sortedListHead variable that initially points to the head of the list, and a unsortedListHead variable that initially points to the second node in the list (if it exists).  The method should then iterate through the unsorted part of the list and insert each node into its correct position in the sorted part of the list.
// If a node in the unsorted part of the list is less than the head of the sorted part of the list, it should become the new head of the sorted list. Otherwise, the method should iterate through the sorted part of the list using a searchPointer variable until it finds the correct position to insert the node.  The node should then be inserted into the sorted list by updating the next reference of the previous node to point to the new node, and the next reference of the new node to point to the next node in the sorted part of the list.

function insertionSort() {
  if (this.length < 2) {
    return; // List is already sorted
  }

  let sortedListHead = this.head;
  let unsortedListHead = this.head.next;
  sortedListHead.next = null;

  while (unsortedListHead !== null) {
    let current = unsortedListHead;
    unsortedListHead = unsortedListHead.next;

    if (current.value < sortedListHead.value) {
      current.next = sortedListHead;
      sortedListHead = current;
    } else {
      let searchPointer = sortedListHead;
      while (
        searchPointer.next !== null &&
        current.value > searchPointer.next.value
      ) {
        searchPointer = searchPointer.next;
      }
      current.next = searchPointer.next;
      searchPointer.next = current;
    }
  }

  this.head = sortedListHead;
  let temp = this.head;
  while (temp.next !== null) {
    temp = temp.next;
  }
  this.tail = temp;
}

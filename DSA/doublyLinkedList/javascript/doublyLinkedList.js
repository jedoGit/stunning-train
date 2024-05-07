class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

class DoublyLinkedList {
  constructor(value) {
    const newNode = new Node(value);
    this.head = newNode;
    this.tail = this.head;
    this.length = 1;
  }

  // Push method always insert new node
  // on the end of the LL and return
  // the updated LinkedList
  push(value) {
    const newNode = new Node(value);

    // Edge case, if head and tail points to null, meaning
    // LinkedList is empty
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      // LinkedList has at least 1 node
      // First, point the tail.next to the newNode
      this.tail.next = newNode;
      // Then, point the newNode.prev to tail
      newNode.prev = this.tail;
      // Lastly, point the tail to the newNode
      this.tail = newNode;
    }

    // Increment the LL length
    this.length++;

    // Return this instance of LL
    return this;
  }
}

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

  // Pop method always remove the node
  // at the end of the LL and return the
  // popped value
  pop() {
    if (this.length === 0) {
      return undefined;
    }

    // Set temp pointer
    let temp = this.tail;

    // Boundary condition, if the length is 1,
    // this means there's only 1 node left on the DLL.
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      // Because we want to pop the last node of the DLL,
      // we want to move the tail to tail.prev
      this.tail = this.tail.prev;

      // Now that we moved the tail to the previous node,
      // we need to sever the last node
      this.tail.next = null;

      // Now, let's sever the popped node
      temp.prev = null;
    }

    this.length--;

    // Then let's return the popped node
    return temp;
  }

  // Unshift method always insert a node
  // at the beginning of the LL and return the LL
  unshift(value) {
    const newNode = new Node(value);

    // First, check if the LL is empty
    if (this.length === 0) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      // LL has at least 1 node. Point the newNode.next to the head
      newNode.next = this.head;
      this.head.prev = newNode;

      // Then point the head to the newNode
      this.head = newNode;
    }

    // Increment the LL length
    this.length++;

    // Return the LL
    return this;
  }
}

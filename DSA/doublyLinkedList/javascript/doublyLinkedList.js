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

  // Shift method always remove a node from
  // the beginning of the LL and return the node
  shift() {
    // If LL is empty, return undefined
    if (this.length === 0) {
      return undefined;
    }

    // Set a temp variable and point it to head
    let temp = this.head;

    // Check if that was the only node in the LL
    // if it was the only node, then set head and tail to null
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      // then, point head to the next node in the LL
      this.head = this.head.next;
      this.head.prev = null;

      // finally, sever the temp node by setting temp.next to null
      temp.next = null;
    }

    // decrement the length
    this.length--;

    // return the temp node
    return temp;
  }

  // Get method returns the node at the given index
  // It is zero based index
  get(index) {
    // If index < 0 or index > length-1, return undefined
    if (index < 0 || index >= this.length) {
      return undefined;
    }

    // Let's traverse through the LL
    // We'll use a similar algorithm as binary search
    // We'll check where index falls, then use either
    // the head or the tail as starting point for the traversal
    let temp = this.head;

    if (index < this.length / 2) {
      for (let i = 0; i < index; i++) {
        temp = temp.next;
      }
    } else {
      temp = this.tail;
      for (let i = this.length - 1; i > index; i--) {
        temp = temp.prev;
      }
    }

    // return the temp node
    return temp;
  }
}

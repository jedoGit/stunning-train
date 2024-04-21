class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor(value) {
    const newNode = new Node(value);
    this.head = newNode;
    this.tail = this.head;
    this.length = 1;
  }

  // Push method always add the new node
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
      this.tail.next = newNode;
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
    if (!this.head) {
      return undefined;
    }

    // Set two pointers
    let temp = this.head;
    let pre = this.head;

    // Traverse throught the end of the LL
    // and set pre pointer to point to the
    // node before the last node
    while (temp.next) {
      pre = temp;
      temp = temp.next;
    }

    // Once we hit the last node, your pre pointer will be the new tail
    this.tail = pre;
    this.tail.next = null;

    // Then we decrement the LL lenght
    this.length--;

    // Boundary condition, if the length is 0,
    // this means there's no node left on the LL.
    if (this.length === 0) {
      this.head = null;
      this.tail = null;
    }

    // We return temp which was the last node when we Traversed
    // throught the LL
    return temp;
  }
}

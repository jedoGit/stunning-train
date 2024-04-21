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

  // Unshift method always insert a node
  // at the beginning of the LL and return the LL
  unshift(value) {
    const newNode = new Node(value);

    // First, check if the LL is empty
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      // LL has at least 1 node. Point the newNode.next to the head
      // Then point the head to the newNode
      newNode.next = this.head;
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
    if (!this.head) {
      return undefined;
    }

    // Set a temp variable and point it to head
    // then, point head to the next node in the LL
    // finally, severe the temp node by setting temp.next to null
    let temp = this.head;
    this.head = this.head.next;
    temp.next = null;

    // decrement the length
    this.length--;

    // Check if that was the only node in the LL
    // if it was the only node, then set tail to null
    if (this.length === 0) {
      this.tail = null;
    }

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
    // Use a temp variable and don't manipulate the head and tail pointers!
    let temp = this.head;

    for (let i = 0; i < index; i++) {
      temp = temp.next;
    }

    // return the temp node
    return temp;
  }

  // Set method finds the index and update the value of
  // that index, return true if successful otherwise return false
  set(index, value) {
    // Let's use the get method to find the index
    // the get method returns an undefined or the
    // the node
    let temp = this.get(index);

    // If temp is the node
    // set the value to the new value and return true
    if (temp) {
      temp.value = value;
      return true;
    }

    // Return false by default
    // This is the case when get method
    // returns undefined
    return false;
  }
}

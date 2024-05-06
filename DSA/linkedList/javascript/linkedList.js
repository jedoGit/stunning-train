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
    // finally, sever the temp node by setting temp.next to null
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

  // Insert method inserts a node based on an index specified
  // Return true if successful or false if not
  insert(index, value) {
    // if inserting at index 0, call the unshift method
    // return the LL
    if (index === 0) {
      return this.unshift(value);
    }

    // if inserting at index equal to the length of the LL
    // call the push method and return the LL
    // Remember, the index is zero based!
    if (index === this.length) {
      return this.push(value);
    }

    // check for out-of-bound scenarios, return false
    if (index < 0 || index > this.length) {
      return false;
    }

    // create a new node
    const newNode = new Node(value);

    // set a temp node and find the node prior to the index we
    // want to insert
    const temp = this.get(index - 1);

    // now, set newNode.next to temp.next to connect the new node to the old index
    newNode.next = temp.next;

    // finally, set temp.next to the newNode to finalize the connections
    temp.next = newNode;

    // increment the length
    this.length++;

    return true;
  }

  // Remove method removes a node based on an index specified
  // Return the removed node if successful or return undefined if not
  remove(index) {
    // check for out of bound
    if (index < 0 || index >= this.length) {
      return undefined;
    }

    // if removing index 0
    if (index === 0) {
      return this.shift();
    }

    // if removing index === length - 1, Remember this is 0 based index
    if (index === this.length - 1) {
      return this.pop();
    }

    // set a pointer to the node prior to the index we want to remove
    const pre = this.get(index - 1);

    // then set a pointer to the node with the index we want to remove
    const temp = pre.next;

    // sever the temp connections
    pre.next = temp.next;
    temp.next = null;

    // decrement the lenght
    this.length--;

    // Return the severed node
    return temp;
  }

  // Reverse method basically just reverse the LL.
  // The head will now point at the tail and the tail
  // will now point at the head, then all of the node.next
  // pointers will point in the reverse direction
  reverse() {
    // Reverse the head and tail pointers
    let temp = this.head;
    this.head = this.tail;
    this.tail = temp;

    // We need 3 pointers, the first one, prev,  will point to null initially
    // the second one is the temp, which will point to the head
    // the third one is the next, which will point to temp.next

    let prev = null;
    let next = temp.next;

    // Now we need a for loop so we can traverse through the LL
    // and reverse the next pointer

    // first, set next to temp.next, initially, next was null
    // then, set temp.next to prev, which is the reverse direction
    // then, move the prev pointer to point to temp
    // finally, move the temp pointer to point to next
    for (let i = 0; i < this.length; i++) {
      next = temp.next;
      temp.next = prev;
      prev = temp;
      temp = next;
    }

    // Return the LL
    return this;
  }
}

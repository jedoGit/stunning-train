class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Stack {
  constructor(value) {
    const newNode = new Node(value);
    this.top = newNode;
    this.length = 1;
  }

  // Push will push the node on the top
  // O(1)
  push(value) {
    const newNode = new Node(value);

    if (this.length === 0) {
      this.top = newNode;
    } else {
      newNode.next = this.top;
      this.top = newNode;
    }

    this.length++;

    return this;
  }

  // Pop will remove the node from the top and return the node
  pop() {
    if (this.length === 0) {
      return undefined;
    }

    let temp = this.top;
    this.top = temp.next; // you cal also use this.top.next
    temp.next = null;

    this.length--;

    return temp;
  }
}

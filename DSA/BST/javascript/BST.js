class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BST {
  constructor() {
    this.root = null;
  }

  insert(value) {
    const newNode = new Node(value);

    // If this is an empty tree, insert the new node
    // then return the BST
    if (this.root === null) {
      this.root = newNode;
      return this;
    }

    // This is not an empty tree, so let's continue
    let temp = this.root;

    // Let's us a while loop
    // We will check the value we want to insert if it's greater/less than
    // the value of the temp variable
    while (true) {
      // For this BST, we're not tracking duplicates, so we return undefined
      if (newNode.value === temp.value) {
        return undefined;
      }

      // We check if value is less/greater than
      if (newNode.value < temp.value) {
        // if the temp.left is empty, insert the new node to left and return BST
        if (temp.left === null) {
          temp.left = newNode;
          return this;
        } else {
          // If left is not empty, move the temp pointer
          // to the left node
          temp = temp.left;
        }
      } else {
        // the value is greater and insert to the right and return BST
        if (temp.right === null) {
          temp.right = newNode;
          return this;
        } else {
          // the right pointer is not empty, hence, move the temp pointer to the right node
          temp = temp.right;
        }
      }
    }
  }

  contains(value) {
    // If BST is empty, return false
    if (this.root === null) {
      return false;
    }

    // The BST is not empty
    let temp = this.root;

    // The BST is null terminated, so we search until we hit null
    while (temp) {
      // check if value is less/greater than or equal to temp
      if (value < temp.value) {
        // Move temp pointer to left if less than
        temp = temp.left;
      } else if (value > temp.value) {
        // Move temp pointer to right if greater than
        temp = temp.right;
      } else {
        // There's a match, so we return true
        return true;
      }
    }

    // We exited the while loop and therefore
    // we did not find a match
    return false;
  }
}

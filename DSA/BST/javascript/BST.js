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

  // Recursive method to check the BST for a value
  rContains(value, currentNode = this.root) {
    if (currentNode === null) return false;
    if (value === currentNode.value) return true;

    if (value < currentNode.value) {
      return this.rContains(value, currentNode.left);
    } else {
      return this.rContains(value, currentNode.right);
    }
  }

  // Recursive private method to insert value to BST
  #rInsert(value, currentNode = this.root) {
    // Check if there are no more nodes in this side of the BST
    // If so, create a new Node return it
    if (currentNode === null) return new Node(value);

    // If we're not in the end of the tree, compare if
    // we should go to the left or right of the tree
    if (value < currentNode.value) {
      currentNode.left = this.#rInsert(value, currentNode.left);
    } else if (value > currentNode.value) {
      currentNode.right = this.#rInsert(value, currentNode.right);
    }

    // Return the result of the prior recursion
    return currentNode;
  }

  // Recursive method to insert value to BST
  rInsert(value) {
    // If the BST is empty, create a new node, the call the recursion fuction
    if (this.root === null) this.root = new Node(value);

    // This recursion uses the default currentNode input
    this.#rInsert(value);
  }

  // Helper method for the recursive deleteNode method
  // In BST, the left node always have the min value
  //                     currentNode -> (49)
  //                                    /  \
  //                                   /    \
  //                                  /      \
  //                                 /        \
  //                                /          \
  //                               /            \
  //                             (45)          (52)
  //                             /  \          /  \
  //                        (null)  (null)(null)  (null)
  minValue(currentNode) {
    while (currentNode.left !== null) {
      currentNode = currentNode.left;
    }
    return currentNode.value;
  }

  // Recursive private method to delete a node in BST
  #rDeleteNode(value, currentNode) {
    if (currentNode === null) return null;

    if (value < currentNode.value) {
      currentNode.left = this.#rDeleteNode(value, currentNode.left);
    } else if (value > currentNode.value) {
      currentNode.right = this.#rDeleteNode(value, currentNode.right);
    } else {
      if (currentNode.left === null && currentNode.right === null) {
        return null;
      } else if (currentNode.left === null) {
        currentNode = currentNode.right;
      } else if (currentNode.right === null) {
        currentNode = currentNode.left;
      } else {
        let subTreeMin = this.minValue(currentNode.right);
        currentNode.value = subTreeMin;
        currentNode.right = this.#rDeleteNode(subTreeMin, currentNode.right);
      }
    }

    return currentNode;
  }

  // Recursive method to delete a node in BST
  deleteNode(value) {
    this.root = this.#rDeleteNode(value, this.root);
  }

  // Breath First Search
  // This will traverse the BST level by level starting at the root.
  // Then, move to the next level then traverse from left to right
  // until either the left or right node are null
  //                     currentNode -> (49)
  //                                   /    \
  //                                 (45)   (52)
  //                                 /  \   /  \

  BFS() {
    let currentNode = this.root;
    let results = [];
    let queue = [];

    // We use a queue, FIFO, push the root initially
    queue.push(currentNode);

    while (queue.length) {
      // Process the node from front of queue
      currentNode = queue.shift();
      results.push(currentNode.value);

      // Push the left and right node to back of queue
      if (currentNode.left) queue.push(currentNode.left);
      if (currentNode.right) queue.push(currentNode.right);
    }

    return results;
  }

  // Depth First Search - Pre Order
  // This will traverse the BST level by level starting at the root.
  // Then, move to the next level then traverse through all the left nodes first
  // then, traverse through the right nodes until either the left or right node are null
  // It is Pre-order because we process the current node first before we start traversing.
  // DFS make use of the function call stack to do the recursion.
  //
  //                     currentNode -> (49)
  //                                   /    \
  //                                 (45)   (52)
  //                                 /  \   /  \
  DFSPreOrder() {
    let results = [];

    // This is the helper recursive function to traverse through the node
    function traverse(currentNode) {
      // Pre order... process the current node first
      results.push(currentNode.value);

      // Recursion, traverse to the left first until we visit
      // all the levels and we hit null
      // For recursion, a new instance of the function is added to the function call stack (LIFO)
      if (currentNode.left) traverse(currentNode.left);
      // Then traverse to the right
      if (currentNode.right) traverse(currentNode.right);
    }

    // Call the recursive function starting from the root
    traverse(this.root);

    return results;
  }

  // Depth First Search - Post Order
  // This will traverse the BST level by level starting at the root.
  // Then, move to the next level then traverse through all the left nodes first
  // then, traverse through the right nodes until either the left or right node are null
  // It is Post-order because we process the current node after we traverse both left and right nodes.
  // DFS make use of the function call stack to do the recursion.
  //
  //                     currentNode -> (49)
  //                                   /    \
  //                                 (45)   (52)
  //                                 /  \   /  \
  DFSPostOrder() {
    let results = [];

    // This is the helper recursive function to traverse through the node
    function traverse(currentNode) {
      // Recursion, traverse to the left first until we visit
      // all the levels and we hit null
      // For recursion, a new instance of the function is added to the function call stack (LIFO)
      if (currentNode.left) traverse(currentNode.left);
      // Then traverse to the right
      if (currentNode.right) traverse(currentNode.right);
      // Post order... process the current node after traversing the left and right nodes
      results.push(currentNode.value);
    }

    // Call the recursive function starting from the root
    traverse(this.root);

    return results;
  }

  // Depth First Search - In Order
  // This will traverse the BST level by level starting at the root.
  // Then, move to the next level then traverse through all the left nodes first
  // then, traverse through the right nodes until either the left or right node are null
  // It is In-order because we process the current node after we traverse the left and before we traverse the right node.
  // DFS make use of the function call stack to do the recursion.
  //
  //                     currentNode -> (49)
  //                                   /    \
  //                                 (45)   (52)
  //                                 /  \   /  \
  DFSInOrder() {
    let results = [];

    // This is the helper recursive function to traverse through the node
    function traverse(currentNode) {
      // Recursion, traverse to the left first until we visit
      // all the levels and we hit null
      // For recursion, a new instance of the function is added to the function call stack (LIFO)
      if (currentNode.left) traverse(currentNode.left);
      // In order... process the current node after traversing the left node
      results.push(currentNode.value);
      // Then traverse to the right
      if (currentNode.right) traverse(currentNode.right);
    }

    // Call the recursive function starting from the root
    traverse(this.root);
    return results;
  }
}

// Given the roots of two binary trees p and q, write a function to check if they are the same or not.

// Two binary trees are considered the same if they are structurally identical, and the nodes have the same value.

// Example 1:

// Input: p = [1,2,3], q = [1,2,3]
// Output: true
// Example 2:

// Input: p = [1,2], q = [1,null,2]
// Output: false
// Example 3:

// Input: p = [1,2,1], q = [1,1,2]
// Output: false

// Constraints:

// The number of nodes in both trees is in the range [0, 100].
// -104 <= Node.val <= 104

// TC: O(max(p,q)) We process the left and right children of each nodes starting from the root. We have 2 roots.
// SC: O(max number of nodes on a level of either p or q). We add each children node to a stack for processing as a pair.

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function (p, q) {
  // Using Iterative DFS approach
  // Since JS do not have an XOR conditional operator, we have to create our own
  // XOR Truth table
  //      0  1
  //     ------
  //  0 | 0  1
  //  1 | 1  0
  //
  const xor = (a, b) => Boolean(!a ^ !b);

  // Let's handle the edge case, return false if only either p or q is null
  if (xor(p, q)) {
    return false;
  }

  // If both roots are null, then they're the same
  if (!p && !q) {
    return true;
  }

  // We can use BFS or DFS and visit each nodes starting at the two roots.
  // Using Iterative DFS
  let stack = []; // we can push both roots on the stack as a pair

  stack.push([p, q]); // [remember that the order of the pair is p then q]

  while (stack.length) {
    // Pop left from the stack
    let [nodeP, nodeQ] = stack.pop();

    // At this point, we're guaranteed that both nodes are non null, so, we check if the values are equal
    if (nodeP.val !== nodeQ.val) {
      return false;
    }

    // Check if the children nodes are present. We return false if either the p or q child is null
    if (xor(nodeP.left, nodeQ.left)) {
      return false;
    }
    if (xor(nodeP.right, nodeQ.right)) {
      return false;
    }

    // At this point, the children nodes are both non-null or null, we add it to the stack if they're non-null
    if (nodeP.left && nodeQ.left) stack.push([nodeP.left, nodeQ.left]);
    if (nodeP.right && nodeQ.right) stack.push([nodeP.right, nodeQ.right]);
  }

  return true;
};

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function (p, q) {
  // Using Recursive DFS approach

  // Base cases
  if (!p && !q) {
    return true;
  }

  // We return false if one of the node is null or if the node values are not equal
  if (!p || !q || p.val !== q.val) {
    return false;
  }

  // At each recursion, we check if both trees are equal, so we compare the right from the left and both should be true
  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
};

// You are given the root of a binary search tree (BST) and an integer val.

// Find the node in the BST that the node's value equals val and return the subtree rooted with that node. If such a node does not exist, return null.

// Example 1:

// Input: root = [4,2,7,1,3], val = 2
// Output: [2,1,3]
// Example 2:

// Input: root = [4,2,7,1,3], val = 5
// Output: []

// Constraints:

// The number of nodes in the tree is in the range [1, 5000].
// 1 <= Node.val <= 107
// root is a binary search tree.
// 1 <= val <= 107

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} val
 * @return {TreeNode}
 */
var searchBST = function (root, val) {
  // DFS solution
  // Base case. If we're reached the end of the path,
  // we just return null
  if (!root) return root;

  // Check if we found the node we're looking for
  if (val === root.val) {
    return root;
  }

  // For BST, if the value we're looking for is less than the root value,
  // it means it's in the left side. Else, it's in the right side
  if (val < root.val) {
    return searchBST(root.left, val);
  } else if (val > root.val) {
    return searchBST(root.right, val);
  }
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
 * @param {TreeNode} root
 * @param {number} val
 * @return {TreeNode}
 */
var searchBST = function (root, val) {
  // Using while loop solution
  let temp = root;

  // We'll keep going until root is null
  while (temp) {
    if (val === temp.val) {
      return temp;
    } else if (val < temp.val) {
      temp = temp.left;
    } else {
      temp = temp.right;
    }
  }

  return null;
};

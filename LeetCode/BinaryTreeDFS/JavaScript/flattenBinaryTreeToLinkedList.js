// Given the root of a binary tree, flatten the tree into a "linked list":

// The "linked list" should use the same TreeNode class where the right child pointer points to the next node in the list and the left child pointer is always null.
// The "linked list" should be in the same order as a pre-order traversal of the binary tree.

// Example 1:

// Input: root = [1,2,5,3,4,null,6]
// Output: [1,null,2,null,3,null,4,null,5,null,6]
// Example 2:

// Input: root = []
// Output: []
// Example 3:

// Input: root = [0]
// Output: [0]

// Constraints:

// The number of nodes in the tree is in the range [0, 2000].
// -100 <= Node.val <= 100

// TC: O(n), we visit all the nodes
// SC: O(h), h is height of the tree and worst case could be equal to n

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
 * @return {void} Do not return anything, modify root in-place instead.
 */
var flatten = function (root) {
  if (!root) return root;

  // Using a helper function
  function DFS(root) {
    if (!root) return root;

    // The order is necessary. We need to DFS on the left child first. Then DFS on the right child
    let leftTail = DFS(root.left);
    let rightTail = DFS(root.right);

    // Each time we DFS, we check for the left child
    // We need to connect the right child of the root, to the left tail
    // Then, assight the left child to the right child
    // Lastly, set left child to null
    if (root.left) {
      leftTail.right = root.right;
      root.right = root.left;
      root.left = null;
    }

    // Use boolean and it needs to be in this order. JS process OR statements left to right
    let last = rightTail || leftTail || root;

    return last;
  }

  // Call the DFS helper function and provide the root
  DFS(root);
};

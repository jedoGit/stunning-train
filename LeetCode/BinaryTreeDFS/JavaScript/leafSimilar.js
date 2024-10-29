// Consider all the leaves of a binary tree, from left to right order, the values of those leaves form a leaf value sequence.

// For example, in the given tree above, the leaf value sequence is (6, 7, 4, 9, 8).

// Two binary trees are considered leaf-similar if their leaf value sequence is the same.

// Return true if and only if the two given trees with head nodes root1 and root2 are leaf-similar.

// Example 1:

// Input: root1 = [3,5,1,6,2,9,8,null,null,7,4], root2 = [3,5,1,6,7,4,2,null,null,null,null,null,null,9,8]
// Output: true
// Example 2:

// Input: root1 = [1,2,3], root2 = [1,3,2]
// Output: false

// Constraints:

// The number of nodes in each tree will be in the range [1, 200].
// Both of the given trees will have values in the range [0, 200].

// TC: O(n) because we're traversing the each nodes of the 2 trees
// SC: O(n) we're adding a function call to the stack every time we visit a node of the 2 trees

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {boolean}
 */
var leafSimilar = function (root1, root2) {
  let result1 = 0;
  let result2 = 0;

  // Create the DFS inline function
  function DFS(node, leafs) {
    if (!node) return null;

    // We'll use Pre Order DFS
    // If this the the leaf, save the value to the leaf array
    // It is the leaf if both left and right pointers are null
    if (!node.left && !node.right) {
      leafs.push(node.val);
    }

    // Now, we need to visit the left and right nodes
    DFS(node.left, leafs);
    DFS(node.right, leafs);

    // Once we reached the leaf node, we return the array
    // We'll return it as a string array
    // console.log(leafs.join())
    return leafs.join();
  }

  // Call the DFS on root1 and root2
  result1 = DFS(root1, []);
  result2 = DFS(root2, []);

  // Compare the returned string array
  if (result1 === result2) {
    return true;
  }

  return false;
};

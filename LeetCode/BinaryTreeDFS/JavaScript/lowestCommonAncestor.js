// Given a binary tree, find the lowest common ancestor (LCA) of two given nodes in the tree.

// According to the definition of LCA on Wikipedia: “The lowest common ancestor is defined between two nodes p and q as the lowest node in T that has both p and q as descendants (where we allow a node to be a descendant of itself).”

// Example 1:

// Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
// Output: 3
// Explanation: The LCA of nodes 5 and 1 is 3.
// Example 2:

// Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4
// Output: 5
// Explanation: The LCA of nodes 5 and 4 is 5, since a node can be a descendant of itself according to the LCA definition.
// Example 3:

// Input: root = [1,2], p = 1, q = 2
// Output: 1

// Constraints:

// The number of nodes in the tree is in the range [2, 105].
// -109 <= Node.val <= 109
// All Node.val are unique.
// p != q
// p and q will exist in the tree.

// TC: O(n) we're traversing through the nodes in the binary tree
// SC: O(n) we're traversing and recursing through the nodes in the binary tree

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function (root, p, q) {
  // We need to define our exit criteria first
  // We exit the recursion if root is null
  if (!root) return root;

  // We also exit the recursion if we found either p or q nodes
  if (root === p || root === q) return root;

  // The perform recursion to the left first then the right
  // to find the p and q on either side of the binary tree
  let left = lowestCommonAncestor(root.left, p, q);
  let right = lowestCommonAncestor(root.right, p, q);

  // At this point, we have some results

  // This is the case where we found p and q and they are on opposite sides
  // hence, their ancestor is the root
  if (left && right) {
    return root;
  } else {
    // This is the case where we found either the p or q on one side only. We
    // are not able to find anything on the other side. This means that
    // the LCA is the node that we found, which is the node p or q
    return left || right;
  }
};

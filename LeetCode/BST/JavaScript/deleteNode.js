// Given a root node reference of a BST and a key, delete the node with the given key in the BST. Return the root node reference (possibly updated) of the BST.

// Basically, the deletion can be divided into two stages:

// Search for a node to remove.
// If the node is found, delete the node.

// Example 1:

// Input: root = [5,3,6,2,4,null,7], key = 3
// Output: [5,4,6,2,null,null,7]
// Explanation: Given key to delete is 3. So we find the node with value 3 and delete it.
// One valid answer is [5,4,6,2,null,null,7], shown in the above BST.
// Please notice that another valid answer is [5,2,6,null,4,null,7] and it's also accepted.

// Example 2:

// Input: root = [5,3,6,2,4,null,7], key = 0
// Output: [5,3,6,2,4,null,7]
// Explanation: The tree does not contain a node with value = 0.
// Example 3:

// Input: root = [], key = 0
// Output: []

// Constraints:

// The number of nodes in the tree is in the range [0, 104].
// -105 <= Node.val <= 105
// Each node has a unique value.
// root is a valid binary search tree.
// -105 <= key <= 105

// Follow up: Could you solve it with time complexity O(height of tree)?

// TC: O(h) we're taking the DFS approach and visit nodes per level of the tree
// SC: O(h) we're taking the DFS approach and visit nodes per level of the tree

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
 * @param {number} key
 * @return {TreeNode}
 */
var deleteNode = function (root, key) {
  if (!root) return root;

  if (key < root.val) {
    // In this case, the node to delete will be in the left side of the root
    // recursively go to the left node and find the node to delete
    // then return the new left node
    root.left = deleteNode(root.left, key);
  } else if (key > root.val) {
    // In this case, the node to delete will be in the right side of the root
    // recursively to to the right node and find the node to delete
    // then return the new right node
    root.right = deleteNode(root.right, key);
  } else {
    // This is the case where we found the node to delete
    // check if this node don't have children, if so, return null.
    // This will be assigned to the children of the root node which are the
    // cases above
    if (!root.left && !root.right) {
      return null;
    } else if (!root.left) {
      return root.right;
    } else if (!root.right) {
      return root.left;
    }

    // This is the case where the node we want to delete have both right and left children
    // In this case, we can chose either left or right children.
    // Remember, the characteristic of a BST is the the min value will always be in the left child.
    // We'll chose the right child here and find the node with the minimum value and copy that to the node
    // we want to delete

    let curNode = root.right;

    // let's traverse to the lowest left node
    while (curNode.left) {
      curNode = curNode.left;
    }

    // At this point, we found the lowest left node
    // we want to update the value of the current root, which is the node we want to delete to the
    // value of the lowest left node
    root.val = curNode.val;
    // Then we update the right side of the node we want to delete
    root.right = deleteNode(root.right, root.val);
  }

  return root;
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
 * @param {number} key
 * @return {TreeNode}
 */
var deleteNode = function (root, key) {
  if (!root) return root;

  function removeNode(root, key) {
    if (!root) return root;

    if (key < root.val) {
      root.left = removeNode(root.left, key);
    } else if (key > root.val) {
      root.right = removeNode(root.right, key);
    } else {
      if (!root.left && !root.right) return null;
      if (!root.left) return root.right;
      if (!root.right) return root.left;

      root.val = min(root.right);
      root.right = removeNode(root.right, root.val);
    }
    return root;
  }

  return removeNode(root, key);
};

function min(root) {
  if (!root.left) return root.val;
  return min(root.left);
}

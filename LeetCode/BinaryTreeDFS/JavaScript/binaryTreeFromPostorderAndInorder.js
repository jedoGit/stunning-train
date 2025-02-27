// Given two integer arrays inorder and postorder where inorder is the inorder traversal of a binary tree and postorder is the postorder traversal of the same tree, construct and return the binary tree.

// Example 1:

// Input: inorder = [9,3,15,20,7], postorder = [9,15,7,20,3]
// Output: [3,9,20,null,null,15,7]
// Example 2:

// Input: inorder = [-1], postorder = [-1]
// Output: [-1]

// Constraints:

// 1 <= inorder.length <= 3000
// postorder.length == inorder.length
// -3000 <= inorder[i], postorder[i] <= 3000
// inorder and postorder consist of unique values.
// Each value of postorder also appears in inorder.
// inorder is guaranteed to be the inorder traversal of the tree.
// postorder is guaranteed to be the postorder traversal of the tree.

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} inorder
 * @param {number[]} postorder
 * @return {TreeNode}
 */
var buildTree = function (inorder, postorder) {
  // get the indices of each element of inorder array and convert to object
  // Key is the element and return the index
  let inorderIdx = inorder.reduce((obj, v, i) => {
    if (!obj[v]) {
      obj[v] = 0;
    }
    obj[v] = i;
    return obj;
  }, {});

  // console.log(inorderIdx)

  // helper function to call recursively
  function helper(l, r) {
    // base case
    if (l > r) {
      return null;
    }

    // the root is always at the end of a post order tree
    let root = new TreeNode(postorder.pop());

    // let's get the index of the root from the inorder array
    let idx = inorderIdx[root.val.toString()];

    // Assign the children
    root.right = helper(idx + 1, r);
    root.left = helper(l, idx - 1);

    return root;
  }

  return helper(0, inorder.length - 1);
};

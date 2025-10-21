package LeetCode.BinaryTreeDFS.java.symmetricTree;

import java.util.ArrayDeque;
import java.util.Deque;
import java.util.LinkedList;

//  Definition for a binary tree node.
class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;

    TreeNode() {
    }

    TreeNode(int val) {
        this.val = val;
    }

    TreeNode(int val, TreeNode left, TreeNode right) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

record symmetricTreeRecord(String[] root, boolean expected) {
}

record treeNodePair(TreeNode nodeL, TreeNode nodeR) {
}

class symmetricTree {
    public boolean isSymmetric(TreeNode root) {

        if (root == null) {
            return true;
        }

        Deque<treeNodePair> queue = new LinkedList<>();
        queue.addLast(new treeNodePair(root.left, root.right));

        while (!queue.isEmpty()) {
            int qLen = queue.size();

            for (int i = 0; i < qLen; i++) {
                treeNodePair p = queue.pollFirst();

                if (p.nodeL() == null && p.nodeR() == null) {
                    continue;
                } else if (p.nodeL() == null || p.nodeR() == null) {
                    return false;
                } else if (p.nodeL().val != p.nodeR().val) {
                    return false;
                } else {
                    queue.addLast(new treeNodePair(p.nodeL().left, p.nodeR().right));
                    queue.addLast(new treeNodePair(p.nodeL().right, p.nodeR().left));
                }
            }
        }

        return true;
    }

    public static void main(String[] args) {
        symmetricTreeRecord input = new symmetricTreeRecord(
                new String[] { "1", "2", "2", "3", "4", "4", "3" },
                true);
        symmetricTree.testSolution(input);

        input = new symmetricTreeRecord(
                new String[] { "1", "2", "2", "null", "3", "null", "3" },
                false);
        symmetricTree.testSolution(input);
    }

    private static void testSolution(symmetricTreeRecord input) {
        // Create the binary tree from the input array using BFS
        TreeNode binTree = symmetricTree.BFSCreateBinaryTree(input.root());

        // Print the binary tree and the expected output
        System.out.println("Input: " + symmetricTree.BFSPrintBinaryTree(binTree));
        System.out.println("Expected: " + String.valueOf(input.expected()));

        // Call the function to be tested
        boolean res = new symmetricTree().isSymmetric(binTree);

        // Print the result
        System.out.println("Result: " + String.valueOf(res));

        // Validate the result
        System.out.println(res == input.expected() ? "PASS" : "FAIL");
        System.out.println("-".repeat(50));
    }

    private static TreeNode BFSCreateBinaryTree(String[] nodeValsArray) {
        int arLen = nodeValsArray.length;

        if (arLen < 1) {
            return null;
        }

        TreeNode root = new TreeNode(Integer.parseInt(nodeValsArray[0]), null, null);
        int i = 1;

        // Using queue (BFS) to build the tree level by level
        Deque<TreeNode> queue = new ArrayDeque<>();
        queue.addLast(root);

        while (!queue.isEmpty() && i < arLen) {
            TreeNode curNode = queue.removeFirst();

            if (curNode != null) {
                // left child
                if (i < arLen && nodeValsArray[i] != "null") {
                    curNode.left = new TreeNode(Integer.parseInt(nodeValsArray[i]), null, null);
                    queue.addLast(curNode.left);
                }
                i++;

                // right child
                if (i < arLen && nodeValsArray[i] != "null") {
                    curNode.right = new TreeNode(Integer.parseInt(nodeValsArray[i]), null, null);
                    queue.addLast(curNode.right);
                }
                i++;
            }
        }

        return root;
    }

    private static String BFSPrintBinaryTree(TreeNode root) {
        // Using BFS traversal to print tree value level by level

        if (root == null) {
            return "[ ]";
        }

        StringBuilder sb = new StringBuilder();
        sb.append("[ ");

        Deque<TreeNode> queue = new LinkedList<>(); // Use linkedList to allow addition of null object. ArrayDeque does
                                                    // not allow null object
        queue.addLast(root);

        while (!queue.isEmpty()) {
            TreeNode curNode = queue.removeFirst();

            sb.append(curNode != null ? String.valueOf(curNode.val) : "null");
            sb.append(", ");

            if (curNode != null) {
                queue.addLast(curNode.left);
                queue.addLast(curNode.right);
            }
        }

        if (sb.length() > 0) {
            sb.setLength(sb.length() - 2);
        }

        sb.append(" ]");

        return sb.toString();
    }
}

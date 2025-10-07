package LeetCode.BinaryTreeDFS.java.sameTree;

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

record sameTreeRecord(String[] p, String[] q, boolean expected) {
}

class sameTree {

    public boolean isSameTree(TreeNode p, TreeNode q) {
        // Using recursive DFS

        // Base case
        if (p == null && q == null) {
            return true;
        }

        // check the nodes if equal
        if (p == null || q == null || p.val != q.val) {
            return false;
        }

        // At each recursion, we check if both trees are equal, so we compare the right
        // from the left and both should be true
        return (this.isSameTree(p.left, q.left) && this.isSameTree(p.right, q.right));
    }

    public static void main(String[] args) {
        sameTreeRecord input = new sameTreeRecord(
                new String[] { "1", "2", "3" },
                new String[] { "1", "2", "3" },
                true);
        sameTree.testSolution(input);

        input = new sameTreeRecord(
                new String[] { "1", "2" },
                new String[] { "1", "null", "2" },
                false);
        sameTree.testSolution(input);

        input = new sameTreeRecord(
                new String[] { "1", "2", "1" },
                new String[] { "1", "1", "2" },
                false);
        sameTree.testSolution(input);
    }

    private static void testSolution(sameTreeRecord input) {
        // Create the binary tree from the input array using BFS
        TreeNode pBinTree = sameTree.BFSCreateBinaryTree(input.p());
        TreeNode qBinTree = sameTree.BFSCreateBinaryTree(input.q());

        // Print the binary tree and the expected output
        System.out.println("Input: p:" + sameTree.BFSPrintBinaryTree(pBinTree));
        System.out.println("Input: q:" + sameTree.BFSPrintBinaryTree(qBinTree));
        System.out.println("Expected: " + String.valueOf(input.expected()));

        // Call the function to be tested
        boolean res = new sameTree().isSameTree(pBinTree, qBinTree);

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

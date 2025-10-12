package LeetCode.BinaryTreeDFS.java.invertBinaryTree;

import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.LinkedList;
import java.util.List;

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

record invertBinaryTreeRecord(String[] root, String[] expected) {
}

public class invertBinaryTree {
    public TreeNode invertTree(TreeNode root) {
        // Base case
        if (root == null) {
            return root;
        }

        // Now, lets swap the left and right child of this node
        TreeNode tmp = null;

        if (root.left != null) {
            tmp = root.left;
        }

        root.left = root.right;
        root.right = tmp;

        // After we swap the children node, let's invert the children of the left and
        // right nodes
        if (root.left != null) {
            this.invertTree(root.left);
        }
        if (root.right != null) {
            this.invertTree(root.right);
        }

        // After we invert the children node, we return the root
        return root;
    }

    public static void main(String[] args) {
        invertBinaryTreeRecord input = new invertBinaryTreeRecord(
                new String[] { "4", "2", "7", "1", "3", "6", "9" },
                new String[] { "4", "7", "2", "9", "6", "3", "1" });
        invertBinaryTree.testSolution(input);

        input = new invertBinaryTreeRecord(
                new String[] { "2", "1", "3" },
                new String[] { "2", "3", "1" });
        invertBinaryTree.testSolution(input);

        input = new invertBinaryTreeRecord(
                new String[] {},
                new String[] {});
        invertBinaryTree.testSolution(input);

        input = new invertBinaryTreeRecord(
                new String[] { "2", "null", "3" },
                new String[] { "2", "3", "null" });
        invertBinaryTree.testSolution(input);

        input = new invertBinaryTreeRecord(
                new String[] { "2", "1", "null" },
                new String[] { "2", "null", "1" });
        invertBinaryTree.testSolution(input);
    }

    private static void testSolution(invertBinaryTreeRecord input) {
        // Create the binary tree from the input array using BFS
        TreeNode binTree = invertBinaryTree.BFSCreateBinaryTree(input.root());
        TreeNode expectedTree = invertBinaryTree.BFSCreateBinaryTree(input.expected());

        // Print the binary tree and the expected output
        System.out.println("Input: " + invertBinaryTree.BFSPrintBinaryTree(binTree));
        System.out.println("Expected: " + invertBinaryTree.BFSPrintBinaryTree(expectedTree));

        // Call the function to be tested
        TreeNode res = new invertBinaryTree().invertTree(binTree);

        // Print the result
        System.out.println("Result: " + invertBinaryTree.BFSPrintBinaryTree(res));

        // Validate the result
        System.out.println(invertBinaryTree.validateResult(res, expectedTree) ? "PASS" : "FAIL");
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

    private static boolean validateResult(TreeNode res, TreeNode expectedTree) {
        List<String> resList = new ArrayList<>();
        List<String> expectedList = new ArrayList<>();

        // Use linkedList to allow addition of null object. ArrayDeque does
        Deque<TreeNode> qRes = new LinkedList<>();
        qRes.addLast(res);

        Deque<TreeNode> qExpected = new LinkedList<>();
        qExpected.addLast(expectedTree);

        while (!qRes.isEmpty()) {
            TreeNode curNode = qRes.pollFirst();

            resList.add(curNode != null ? String.valueOf(curNode.val) : "null");

            if (curNode != null) {
                qRes.addLast(curNode.left);
                qRes.addLast(curNode.right);
            }
        }

        while (!qExpected.isEmpty()) {
            TreeNode curNode = qExpected.pollFirst();

            expectedList.add(curNode != null ? String.valueOf(curNode.val) : "null");

            if (curNode != null) {
                qExpected.addLast(curNode.left);
                qExpected.addLast(curNode.right);
            }
        }

        return expectedList.equals(resList);
    }
}

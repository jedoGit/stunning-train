package LeetCode.BinaryTreeDFS.java.maxDepth;

import java.util.ArrayDeque;
import java.util.Deque;
import java.util.LinkedList;
import java.util.Stack;

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

record maxDepthRecord(String[] root, int expected) {
}

record treeNodeIntegerPair(TreeNode node, Integer val) {
}

class maxDepth {

    public int findMaxDepth(TreeNode root) {
        // Iterative DFS using Stack
        Stack<treeNodeIntegerPair> stack = new Stack<>();
        int level = 0;

        stack.add(new treeNodeIntegerPair(root, 1));

        while (!stack.isEmpty()) {
            treeNodeIntegerPair pair = stack.pop();

            if (pair.node() != null) {
                level = Math.max(level, pair.val());
                stack.add(new treeNodeIntegerPair(pair.node().left, pair.val() + 1));
                stack.add(new treeNodeIntegerPair(pair.node().right, pair.val() + 1));
            }
        }

        return level;
    }

    public static void main(String[] args) {
        maxDepthRecord input = new maxDepthRecord(
                new String[] { "3", "9", "20", "null", "null", "15", "7" },
                3);
        maxDepth.testSolution(input);

        input = new maxDepthRecord(
                new String[] { "1", "null", "2" },
                2);
        maxDepth.testSolution(input);
    }

    private static void testSolution(maxDepthRecord input) {
        // Create the binary tree from the input array using BFS
        TreeNode binTree = maxDepth.BFSCreateBinaryTree(input.root());

        // Print the binary tree and the expected output
        System.out.println("Input: " + maxDepth.BFSPrintBinaryTree(binTree));
        System.out.println("Expected: " + String.valueOf(input.expected()));

        // Call the function to be tested
        int res = new maxDepth().findMaxDepth(binTree);

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

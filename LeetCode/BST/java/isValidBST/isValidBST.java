package LeetCode.BST.java.isValidBST;

import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.LinkedList;
import java.util.List;

/**
 * Definition for a binary tree node.
 **/
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

record isValidBSTRecord(String[] root, boolean expected) {
}

class isValidBST {
    public boolean isValidBSTSolution(TreeNode root) {

        return this.DFS(root, Long.MIN_VALUE, Long.MAX_VALUE);

    }

    private boolean DFS(TreeNode node, long left, long right) {
        if (node == null) {
            return true;
        }

        if (!(node.val < right && node.val > left)) {
            return false;
        }

        return (this.DFS(node.left, left, node.val) && this.DFS(node.right, node.val, right));
    }

    public static void main(String[] args) {
        isValidBSTRecord[] records = new isValidBSTRecord[] {
                new isValidBSTRecord(
                        new String[] { "2", "1", "3" }, true),
                new isValidBSTRecord(
                        new String[] { "5", "1", "4", "null", "null", "3", "6" }, false),
                new isValidBSTRecord(new String[] { "2147483647" }, true),
                new isValidBSTRecord(new String[] { "0" }, true)
        };

        int i = 1;
        for (isValidBSTRecord record : records) {
            System.out.println("Test Case " + i++);
            isValidBST.testSolution(record);
        }
    }

    private static void testSolution(isValidBSTRecord input) {
        // Create the binary tree from the input array using BFS
        TreeNode rootBTree = isValidBST.BFSCreateBinaryTree(input.root());

        // Print the binary tree and the expected output
        System.out.println("Input: root: " + isValidBST.BFSBinaryTreeToStr(rootBTree));
        System.out.println("Expected: " + input.expected());

        // Call the function to be tested
        boolean res = new isValidBST().isValidBSTSolution(rootBTree);

        // Print the result
        System.out.println("Result: " + res);

        // Validate the result
        System.out.println(res == input.expected() ? "\u001B[32mPASS\u001B[0m" : "\u001B[31mFAIL\u001B[0m");
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

    private static String BFSBinaryTreeToStr(TreeNode root) {
        // Using BFS traversal to print tree value level by level
        if (root == null) {
            return "[]";
        }

        List<String> sb = new ArrayList<>();

        Deque<TreeNode> queue = new LinkedList<>(); // Use linkedList to allow addition of null object. ArrayDeque does
                                                    // not allow null object
        queue.addLast(root);

        while (!queue.isEmpty()) {
            TreeNode curNode = queue.removeFirst();
            sb.add(curNode != null ? String.valueOf(curNode.val) : "null");

            if (curNode != null) {
                queue.addLast(curNode.left);
                queue.addLast(curNode.right);
            }
        }

        while (!sb.isEmpty()) {
            if (sb.getLast() == "null") {
                sb.removeLast();
            } else {
                break;
            }
        }

        return sb.toString();
    }

    // private static boolean validateResult(TreeNode res, TreeNode expectedTree) {
    // List<String> resList = new ArrayList<>();
    // List<String> expectedList = new ArrayList<>();

    // // Use linkedList to allow addition of null object. ArrayDeque does
    // Deque<TreeNode> qRes = new LinkedList<>();
    // qRes.addLast(res);

    // Deque<TreeNode> qExpected = new LinkedList<>();
    // qExpected.addLast(expectedTree);

    // while (!qRes.isEmpty()) {
    // TreeNode curNode = qRes.pollFirst();

    // resList.add(curNode != null ? String.valueOf(curNode.val) : "null");

    // if (curNode != null) {
    // qRes.addLast(curNode.left);
    // qRes.addLast(curNode.right);
    // }
    // }

    // while (!qExpected.isEmpty()) {
    // TreeNode curNode = qExpected.pollFirst();

    // expectedList.add(curNode != null ? String.valueOf(curNode.val) : "null");

    // if (curNode != null) {
    // qExpected.addLast(curNode.left);
    // qExpected.addLast(curNode.right);
    // }
    // }

    // return expectedList.equals(resList);
    // }
}

package LeetCode.BST.java.getMinDifference;

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

record getMinDifferenceRecord(String[] root, int expected) {
}

class getMinDifference {
    TreeNode pre = null;
    int min = Integer.MAX_VALUE;

    public int getMinimumDifference(TreeNode root) {
        if (root == null) {
            return 0;
        }

        this.DFS(root);

        return this.min;
    }

    private void DFS(TreeNode node) {
        if (node == null) {
            return;
        }

        this.DFS(node.left);

        if (this.pre != null) {
            this.min = Math.min(this.min, Math.abs(this.pre.val - node.val));
        }

        this.pre = node;

        this.DFS(node.right);
    }

    public static void main(String[] args) {
        getMinDifferenceRecord[] records = new getMinDifferenceRecord[] {
                new getMinDifferenceRecord(
                        new String[] { "4", "2", "6", "1", "3" }, 1),
                new getMinDifferenceRecord(
                        new String[] { "1", "0", "48", "null", "null", "12", "49" }, 1),
        };

        int i = 1;
        for (getMinDifferenceRecord record : records) {
            System.out.println("Test Case " + i++);
            getMinDifference.testSolution(record);
        }
    }

    private static void testSolution(getMinDifferenceRecord input) {
        // Create the binary tree from the input array using BFS
        TreeNode rootBTree = getMinDifference.BFSCreateBinaryTree(input.root());

        // Print the binary tree and the expected output
        System.out.println("Input: root: " + getMinDifference.BFSBinaryTreeToStr(rootBTree));
        System.out.println("Expected: " + input.expected());

        // Call the function to be tested
        int res = new getMinDifference().getMinimumDifference(rootBTree);

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

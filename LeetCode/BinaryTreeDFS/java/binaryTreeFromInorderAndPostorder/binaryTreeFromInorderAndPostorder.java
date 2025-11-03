package LeetCode.BinaryTreeDFS.java.binaryTreeFromInorderAndPostorder;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Deque;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collector;
import java.util.stream.Collectors;

// Definition for a binary tree node.
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

record binaryTreeFromInorderAndPostorderRecord(int[] inorder, int[] postorder,
        List<Integer> expected) {
}

public class binaryTreeFromInorderAndPostorder {
    private int index;

    public TreeNode buildTree(int[] inorder, int[] postorder) {
        Map<Integer, Integer> inorderIdx = new HashMap<>();

        // Map {inorder[i]: i}
        for (int i = 0; i < inorder.length; i++) {
            inorderIdx.put(inorder[i], i);
        }

        // We need this to keep track of the index of the postorder array in the DFS
        // method
        this.index = postorder.length - 1;

        return this.DFS(0, inorder.length - 1, postorder, inorderIdx);
    }

    private TreeNode DFS(int left, int right, int[] postorder, Map<Integer, Integer> inorderIdx) {
        // Base case
        if (left > right) {
            return null;
        }

        // The root is always at the end of a post order tree
        TreeNode root = new TreeNode(postorder[this.index--]);

        // Let's get the index of the root from the inorder list
        int idx = inorderIdx.get(root.val);

        // Assign the children and DFS
        root.right = this.DFS(idx + 1, right, postorder, inorderIdx);
        root.left = this.DFS(left, idx - 1, postorder, inorderIdx);

        return root;
    }

    public static void main(String[] args) {

        binaryTreeFromInorderAndPostorderRecord input = new binaryTreeFromInorderAndPostorderRecord(
                new int[] { 9, 3, 15, 20, 7 },
                new int[] { 9, 15, 7, 20, 3 },
                Arrays.asList(3, 9, 20, null, null, 15, 7)); // Need to be Array as List because it contains "null"

        binaryTreeFromInorderAndPostorder.testSolution(input);

        // Next Input
        input = new binaryTreeFromInorderAndPostorderRecord(
                new int[] { -1 },
                new int[] { -1 },
                List.of(-1));

        binaryTreeFromInorderAndPostorder.testSolution(input);
    }

    private static void testSolution(binaryTreeFromInorderAndPostorderRecord input) {
        // Print the input and expected
        System.out.println("Input: inorder  : " + Arrays.toString(input.inorder()));
        System.out.println("Input: postorder: " + Arrays.toString(input.postorder()));
        System.out.println("Expected: " + input.expected().toString());
        // Call the function to be tested
        TreeNode res = new binaryTreeFromInorderAndPostorder().buildTree(input.inorder(), input.postorder());
        // Print the result
        System.out.println("Result: " + binaryTreeFromInorderAndPostorder.binaryTreeToStr(res));
        // Validate result
        System.out.println(binaryTreeFromInorderAndPostorder.validateResult(res, input.expected()) ? "PASS" : "FAIL");
        System.out.println("-".repeat(50));
    }

    private static boolean validateResult(TreeNode res, List<Integer> expected) {

        LinkedList<Integer> resList = new LinkedList<>();

        Deque<TreeNode> queue = new LinkedList<>();
        queue.addLast(res);

        while (!queue.isEmpty()) {
            TreeNode curNode = queue.removeFirst();
            resList.add(curNode == null ? null : curNode.val);

            if (curNode != null) {
                queue.addLast(curNode.left);
                queue.addLast(curNode.right);
            }
        }

        // Remove the lowest level of the tree which are nulls
        while (!resList.isEmpty()) {
            if (resList.peekLast() == null) {
                resList.removeLast();
            } else {
                break;
            }
        }

        return expected.equals(resList);
    }

    private static String binaryTreeToStr(TreeNode root) {
        // Using BFS traversal to print tree value level by level
        if (root == null) {
            return "[ ]";
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
}

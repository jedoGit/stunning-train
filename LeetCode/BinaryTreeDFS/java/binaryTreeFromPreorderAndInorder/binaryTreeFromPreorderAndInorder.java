package LeetCode.BinaryTreeDFS.java.binaryTreeFromPreorderAndInorder;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Deque;
import java.util.LinkedList;
import java.util.List;
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

record binaryTreeFromPreorderAndInorderRecord(int[] preOrder, int[] inOrder,
        List<Integer> expected) {
}

class binaryTreeFromPreorderAndInorder {
    public TreeNode buildTree(int[] preorder, int[] inorder) {
        if (preorder.length == 0 && inorder.length == 0) {
            return null;
        }

        TreeNode root = new TreeNode(preorder[0]);

        List<Integer> inorderList = Arrays.stream(inorder) // Create an IntStream
                .boxed() // Box int primitives to Integer objects
                .collect(Collectors.toList()); // Collect into a List

        int mid = inorderList.indexOf(preorder[0]);

        root.left = this.buildTree(Arrays.copyOfRange(preorder, 1, mid + 1),
                Arrays.copyOfRange(inorder, 0, mid));
        root.right = this.buildTree(Arrays.copyOfRange(preorder, mid + 1,
                preorder.length),
                Arrays.copyOfRange(inorder, mid + 1, inorder.length));

        return root;
    }

    public static void main(String[] args) {

        binaryTreeFromPreorderAndInorderRecord input = new binaryTreeFromPreorderAndInorderRecord(
                new int[] { 3, 9, 20, 15, 7 },
                new int[] { 9, 3, 15, 20, 7 },
                Arrays.asList(3, 9, 20, null, null, 15, 7)); // Need to be Array as List because it contains "null"

        binaryTreeFromPreorderAndInorder.testSolution(input);

        // Next Input

        input = new binaryTreeFromPreorderAndInorderRecord(
                new int[] { -1 },
                new int[] { -1 },
                List.of(-1));

        binaryTreeFromPreorderAndInorder.testSolution(input);
    }

    private static void testSolution(binaryTreeFromPreorderAndInorderRecord input) {
        // Print the input and expected
        System.out.println("Input: preOrder: " + Arrays.toString(input.preOrder()));
        System.out.println("Input: inOrder: " + Arrays.toString(input.inOrder()));
        System.out.println("Expected: " + input.expected().toString());
        // Call the function to be tested
        TreeNode res = new binaryTreeFromPreorderAndInorder().buildTree(input.preOrder(), input.inOrder());
        // Print the result
        System.out.println("Result: " + binaryTreeFromPreorderAndInorder.binaryTreeToStr(res));
        // Validate result
        System.out.println(binaryTreeFromPreorderAndInorder.validateResult(res, input.expected()) ? "PASS" : "FAIL");
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

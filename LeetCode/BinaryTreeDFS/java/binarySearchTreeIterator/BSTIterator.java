package LeetCode.BinaryTreeDFS.java.binarySearchTreeIterator;

import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Deque;
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

record BSTIteratorRecord(String[] operations, String[][] values, String[] expected) {
}

class BSTIterator {
    private List<TreeNode> stack;

    public BSTIterator(TreeNode root) {
        this.stack = new ArrayList<>();

        // We'll add only the root and the left child to the stack
        // This is iterative DFS until there's no more left child
        // This is due to the in-order traversal constraint
        TreeNode cur = root;
        while (cur != null) {
            this.stack.add(cur);
            cur = cur.left;
        }
    }

    public int next() {
        TreeNode res = this.stack.removeLast();

        // Once we pop the node added to the stack,
        // we'll need to check if that node has a right child
        // if it does, add the left child by iterative DFS'ing it
        TreeNode cur = res.right;
        while (cur != null) {
            this.stack.add(cur);
            cur = cur.left;
        }

        return res.val;
    }

    public boolean hasNext() {
        return !this.stack.isEmpty();
    }

    public static void main(String[] args) {
        BSTIteratorRecord input = new BSTIteratorRecord(
                new String[] { "BSTIterator", "next", "next", "hasNext", "next", "hasNext", "next", "hasNext", "next",
                        "hasNext" },
                new String[][] { { "7", "3", "15", "null", "null", "9", "20" }, {}, {}, {}, {}, {}, {}, {}, {}, {} },
                new String[] { "null", "3", "7", "true", "9", "true", "15", "true", "20", "false" });
        BSTIterator.testSolution(input);
    }

    private static void testSolution(BSTIteratorRecord input) {
        System.out.println("Input: Operations: " + String.join(", ", input.operations()) + "\n\t"
                + " values: " + Arrays.deepToString(input.values()));

        int n = input.operations().length;
        String[] output = new String[n];
        BSTIterator soln = null;

        for (int i = 0; i < n; i += 1) {
            switch (input.operations()[i].strip()) {
                case "BSTIterator" -> {
                    TreeNode rootBTree = BSTIterator.BFSCreateBinaryTree(input.values()[i]);
                    soln = new BSTIterator(rootBTree);
                    output[i] = "null";
                }
                case "next" -> output[i] = String.valueOf(soln.next());
                case "hasNext" -> output[i] = String.valueOf(soln.hasNext());
            }
        }
        // Print the expected output
        System.out.println("Expected: " + Arrays.toString(input.expected()));

        // Print the result
        System.out.println("Result: " + Arrays.toString(output));

        // Validate the result
        System.out.println(Arrays.equals(output, input.expected()) ? "PASS" : "FAIL");
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

    // private static String BFSBinaryTreeToStr(TreeNode root) {
    // // Using BFS traversal to print tree value level by level
    // if (root == null) {
    // return "[]";
    // }

    // List<String> sb = new ArrayList<>();

    // Deque<TreeNode> queue = new LinkedList<>(); // Use linkedList to allow
    // addition of null object. ArrayDeque does
    // // not allow null object
    // queue.addLast(root);

    // while (!queue.isEmpty()) {
    // TreeNode curNode = queue.removeFirst();
    // sb.add(curNode != null ? String.valueOf(curNode.val) : "null");

    // if (curNode != null) {
    // queue.addLast(curNode.left);
    // queue.addLast(curNode.right);
    // }
    // }

    // while (!sb.isEmpty()) {
    // if (sb.getLast() == "null") {
    // sb.removeLast();
    // } else {
    // break;
    // }
    // }

    // return sb.toString();
    // }

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
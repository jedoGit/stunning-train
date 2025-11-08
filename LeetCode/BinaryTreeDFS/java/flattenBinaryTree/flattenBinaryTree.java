package LeetCode.BinaryTreeDFS.java.flattenBinaryTree;

import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.LinkedList;
import java.util.List;

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

record flattenBinaryTreeRecord(String[] root, String[] expected) {
}

class flattenBinaryTree {
    public void flatten(TreeNode root) {
        this.DFS(root);
    }

    private TreeNode DFS(TreeNode root) {
        if (root == null) {
            return root;
        }

        // The order is necessary. We need to DFS on the left child first. Then DFS on
        // the right child
        TreeNode leftTail = this.DFS(root.left);
        TreeNode rightTail = this.DFS(root.right);

        // Each time we DFS, we check for the left child
        // We need to connect the right child of the root, to the left tail
        // Then, assight the left child to the right child
        // Lastly, set left child to null
        if (root.left != null) {
            leftTail.right = root.right;
            root.right = root.left;
            root.left = null;
        }

        // Use boolean and it needs to be in this order. Compiler process OR statements
        // left to right
        TreeNode last = rightTail != null ? rightTail : (leftTail != null ? leftTail : root);

        return last;
    }

    public static void main(String[] args) {
        flattenBinaryTreeRecord input = new flattenBinaryTreeRecord(
                new String[] { "1", "2", "5", "3", "4", "null", "6" },
                new String[] { "1", "null", "2", "null", "3", "null", "4", "null", "5", "null", "6" });
        flattenBinaryTree.testSolution(input);

        input = new flattenBinaryTreeRecord(
                new String[] {},
                new String[] {});
        flattenBinaryTree.testSolution(input);

        input = new flattenBinaryTreeRecord(
                new String[] { "0" },
                new String[] { "0" });
        flattenBinaryTree.testSolution(input);
    }

    private static void testSolution(flattenBinaryTreeRecord input) {
        // Create the binary tree from the input array using BFS
        TreeNode rootBTree = flattenBinaryTree.BFSCreateBinaryTree(input.root());
        TreeNode expdBTree = flattenBinaryTree.BFSCreateBinaryTree(input.expected());

        // Print the binary tree and the expected output
        System.out.println("Input: root: " + flattenBinaryTree.BFSBinaryTreeToStr(rootBTree));
        System.out.println("Expected: " + flattenBinaryTree.BFSBinaryTreeToStr(expdBTree));

        // Call the function to be tested
        new flattenBinaryTree().flatten(rootBTree);

        // Print the result
        System.out.println("Result: " + flattenBinaryTree.BFSBinaryTreeToStr(rootBTree));

        // Validate the result
        System.out.println(flattenBinaryTree.validateResult(rootBTree, expdBTree) ? "PASS" : "FAIL");
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

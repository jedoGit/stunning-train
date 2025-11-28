package LeetCode.BinaryTreeDFS.java.lowestCommonAncestor;

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

record lowestCommonAncestorRecord(String[] root, int p, int q, int expected) {
}

public class lowestCommonAncestor {
    public TreeNode lowestCommonAncestorSolution(TreeNode root, TreeNode p, TreeNode q) {
        if (root == null) {
            return root;
        }

        if (root.val == p.val || root.val == q.val) {
            return root;
        }

        // DFS on left and right subtree
        TreeNode left = this.lowestCommonAncestorSolution(root.left, p, q);
        TreeNode right = this.lowestCommonAncestorSolution(root.right, p, q);

        if (left != null && right != null) {
            return root;
        } else {
            return left != null ? left : right;
        }
    }

    public static void main(String[] args) {
        lowestCommonAncestorRecord[] records = new lowestCommonAncestorRecord[] {
                new lowestCommonAncestorRecord(
                        new String[] { "3", "5", "1", "6", "2", "0", "8", "null", "null", "7", "4" }, 5, 1, 3),
                new lowestCommonAncestorRecord(
                        new String[] { "3", "5", "1", "6", "2", "0", "8", "null", "null", "7", "4" }, 5, 4, 5),
                new lowestCommonAncestorRecord(new String[] { "1", "2" }, 1, 2, 1),
        };

        int i = 1;
        for (lowestCommonAncestorRecord record : records) {
            System.out.println("Test Case " + i++);
            lowestCommonAncestor.testSolution(record);
        }
    }

    private static void testSolution(lowestCommonAncestorRecord input) {
        // Create the binary tree from the input array using BFS
        TreeNode rootBTree = lowestCommonAncestor.BFSCreateBinaryTree(input.root());
        TreeNode pNode = new TreeNode(input.p());
        TreeNode qNode = new TreeNode(input.q());

        // Print the binary tree and the expected output
        System.out.println("Input: root: " + lowestCommonAncestor.BFSBinaryTreeToStr(rootBTree));
        System.out.println("Input: p: " + lowestCommonAncestor.BFSBinaryTreeToStr(pNode));
        System.out.println("Input: q: " + lowestCommonAncestor.BFSBinaryTreeToStr(qNode));
        System.out.println("Expected: " + input.expected());

        // Call the function to be tested
        TreeNode res = new lowestCommonAncestor().lowestCommonAncestorSolution(rootBTree, pNode, qNode);

        // Print the result
        System.out.println("Result: " + res.val);

        // Validate the result
        System.out.println(res.val == input.expected() ? "\u001B[32mPASS\u001B[0m" : "\u001B[31mFAIL\u001B[0m");
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

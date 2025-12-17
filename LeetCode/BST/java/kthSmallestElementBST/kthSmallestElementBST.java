package LeetCode.BST.java.kthSmallestElementBST;

import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.LinkedList;
import java.util.List;

/**
 * Definition for a binary tree node
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

record kthSmallestElementBSTRecord(String[] root, int k, int expected) {
}

class kthSmallestElementBST {
    public int kthSmallest(TreeNode root, int k) {
        int n = 0;
        Deque<TreeNode> stack = new ArrayDeque<>();
        TreeNode cur = root;

        while (cur != null || !stack.isEmpty()) {
            // add all the left child to the stack
            while (cur != null) {
                stack.push(cur);
                cur = cur.left;
            }
            // pop the stack and increment the n counter
            cur = stack.pop();
            n++;

            if (n == k) {
                return cur.val;
            }

            // check the right child of cur
            cur = cur.right;
        }

        return 0;
    }

    public static void main(String[] args) {
        kthSmallestElementBSTRecord[] records = new kthSmallestElementBSTRecord[] {
                new kthSmallestElementBSTRecord(
                        new String[] { "3", "1", "4", "null", "2" }, 1, 1),
                new kthSmallestElementBSTRecord(
                        new String[] { "5", "3", "6", "2", "4", "null", "null", "1" }, 3, 3),
        };

        int i = 1;
        for (kthSmallestElementBSTRecord record : records) {
            System.out.println("Test Case " + i++);
            kthSmallestElementBST.testSolution(record);
        }
    }

    private static void testSolution(kthSmallestElementBSTRecord input) {
        // Create the binary tree from the input array using BFS
        TreeNode rootBTree = kthSmallestElementBST.BFSCreateBinaryTree(input.root());

        // Print the binary tree and the expected output
        System.out.println("Input: root: " + kthSmallestElementBST.BFSBinaryTreeToStr(rootBTree));
        System.out.println("Input: k: " + input.k());
        System.out.println("Expected: " + input.expected());

        // Call the function to be tested
        int res = new kthSmallestElementBST().kthSmallest(rootBTree, input.k());

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

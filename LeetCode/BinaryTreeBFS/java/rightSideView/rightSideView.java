package LeetCode.BinaryTreeBFS.java.rightSideView;

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

record rightSideViewRecord(String[] root, List<Integer> expected) {
}

class rightSideView {
    public List<Integer> rightSideViewSolution(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        Deque<TreeNode> queue = new ArrayDeque<>();

        if (root == null) {
            return result;
        }

        queue.addLast(root);

        while (!queue.isEmpty()) {
            int qLen = queue.size();
            TreeNode node = queue.peekLast();

            result.add(node.val);

            while (qLen > 0) {
                TreeNode curNode = queue.pollFirst();
                if (curNode != null && curNode.left != null) {
                    queue.addLast(curNode.left);
                }

                if (curNode != null && curNode.right != null) {
                    queue.addLast(curNode.right);
                }

                qLen--;
            }
        }

        return result;
    }

    public static void main(String[] args) {
        rightSideViewRecord[] records = new rightSideViewRecord[] {
                new rightSideViewRecord(
                        new String[] { "1", "2", "3", "null", "5", "null", "4" }, List.of(1, 3, 4)),
                new rightSideViewRecord(
                        new String[] { "1", "2", "3", "4", "null", "null", "null", "5" }, List.of(1, 3, 4, 5)),
                new rightSideViewRecord(new String[] { "1", "null", "3" }, List.of(1, 3)),
                new rightSideViewRecord(new String[] {}, List.of()),
        };

        int i = 1;
        for (rightSideViewRecord record : records) {
            System.out.println("Test Case " + i++);
            rightSideView.testSolution(record);
        }
    }

    private static void testSolution(rightSideViewRecord input) {
        // Create the binary tree from the input array using BFS
        TreeNode rootBTree = rightSideView.BFSCreateBinaryTree(input.root());

        // Print the binary tree and the expected output
        System.out.println("Input: root: " + rightSideView.BFSBinaryTreeToStr(rootBTree));
        System.out.println("Expected: " + input.expected());

        // Call the function to be tested
        List<Integer> res = new rightSideView().rightSideViewSolution(rootBTree);

        // Print the result
        System.out.println("Result: " + res.toString());

        // Validate the result
        System.out.println(res.equals(input.expected()) ? "\u001B[32mPASS\u001B[0m" : "\u001B[31mFAIL\u001B[0m");
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

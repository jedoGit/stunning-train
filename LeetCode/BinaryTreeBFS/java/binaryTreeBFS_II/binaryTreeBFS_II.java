package LeetCode.BinaryTreeBFS.java.binaryTreeBFS_II;

import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.LinkedList;
import java.util.List;

// Definition for a Node.
class Node {
    public int val;
    public Node left;
    public Node right;
    public Node next;

    public Node() {
    }

    public Node(int _val) {
        val = _val;
    }

    public Node(int _val, Node _left, Node _right, Node _next) {
        val = _val;
        left = _left;
        right = _right;
        next = _next;
    }
};

record binaryTreeBFS_IIRecord(List<String> root, List<String> expected) {
}

public class binaryTreeBFS_II {
    public Node connect(Node root) {
        if (root == null) {
            return root;
        }

        // BFS Iterative solution
        Deque<Node> queue = new ArrayDeque<>();

        queue.addLast(root);

        while (!queue.isEmpty()) {
            Node pre = null;
            int qLen = queue.size();

            while (qLen > 0) {
                Node cur = queue.removeFirst();

                if (pre != null) {
                    pre.next = cur;
                }

                if (cur != null && cur.left != null) {
                    queue.addLast(cur.left);
                }

                if (cur != null && cur.right != null) {
                    queue.addLast(cur.right);
                }

                pre = cur;

                qLen--;
            }
        }

        return root;
    }

    public static void main(String[] args) {

        binaryTreeBFS_IIRecord input = new binaryTreeBFS_IIRecord(
                List.of("1", "2", "3", "4", "5", "null", "7"),
                List.of("1", "#", "2", "3", "#", "4", "5", "7", "#"));

        binaryTreeBFS_II.testSolution(input);

        // Next Input
        input = new binaryTreeBFS_IIRecord(
                List.of(),
                List.of());

        binaryTreeBFS_II.testSolution(input);
    }

    private static void testSolution(binaryTreeBFS_IIRecord input) {
        // Create bTree
        Node rBTree = binaryTreeBFS_II.BFSCreateBinaryTree(input.root());

        // Print the input and expected
        System.out.println("Input: root: " + binaryTreeBFS_II.binaryTreeToStr(rBTree));
        System.out.println("Expected: " + input.expected().toString());

        // Call the function to be tested
        Node res = new binaryTreeBFS_II().connect(rBTree);
        // Print the result
        System.out.println("Result: " + binaryTreeBFS_II.binaryTreeOutputToStr(res));
        // Validate result
        System.out.println(binaryTreeBFS_II.validateResult(res, input.expected()) ? "PASS" : "FAIL");
        System.out.println("-".repeat(50));
    }

    private static Node BFSCreateBinaryTree(List<String> nodeValsArray) {
        int arLen = nodeValsArray.size();

        if (arLen < 1) {
            return null;
        }

        Node root = new Node(Integer.parseInt(nodeValsArray.getFirst()));
        int i = 1;

        // Using queue (BFS) to build the tree level by level
        Deque<Node> queue = new ArrayDeque<>();
        queue.addLast(root);

        while (!queue.isEmpty() && i < arLen) {
            Node curNode = queue.removeFirst();

            if (curNode != null) {
                // left child
                if (i < arLen && nodeValsArray.get(i) != "null") {
                    curNode.left = new Node(Integer.parseInt(nodeValsArray.get(i)));
                    queue.addLast(curNode.left);
                }
                i++;

                // right child
                if (i < arLen && nodeValsArray.get(i) != "null") {
                    curNode.right = new Node(Integer.parseInt(nodeValsArray.get(i)));
                    queue.addLast(curNode.right);
                }
                i++;
            }
        }

        return root;
    }

    private static boolean validateResult(Node res, List<String> expected) {
        String resStr = binaryTreeBFS_II.binaryTreeOutputToStr(res);
        String expectedStr = expected.toString();

        return expectedStr.equals(resStr);
    }

    private static String binaryTreeOutputToStr(Node root) {
        // Using BFS traversal to print tree value level by level
        if (root == null) {
            return "[]";
        }

        List<String> sb = new ArrayList<>();

        Deque<Node> queue = new LinkedList<>(); // Use linkedList to allow addition of null object. ArrayDeque does
                                                // not allow null object
        queue.addLast(root);

        while (!queue.isEmpty()) {
            Node curNode = queue.removeFirst();

            Node curNodeLine = curNode;

            // Traverse from left to right at each level using the next pointer.
            // Check the next pointer... this is just a linkedlist traversal.
            while (curNodeLine != null) {
                sb.add(String.valueOf(curNodeLine.val));

                if (curNodeLine.next != null) {
                    curNodeLine = curNodeLine.next;
                } else {
                    // Add "#" to signify end of each level
                    sb.add("#");
                    break;
                }
            }

            // We only want to add the left child because at each level, we want to
            // travese from left to right using the next pointer.
            if (curNode != null) {
                queue.addLast(curNode.left);
            }
        }

        return sb.toString();
    }

    private static String binaryTreeToStr(Node root) {
        // Using BFS traversal to print tree value level by level
        if (root == null) {
            return "[]";
        }

        List<String> sb = new ArrayList<>();

        Deque<Node> queue = new LinkedList<>(); // Use linkedList to allow addition of null object. ArrayDeque does
                                                // not allow null object
        queue.addLast(root);

        while (!queue.isEmpty()) {
            Node curNode = queue.removeFirst();
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

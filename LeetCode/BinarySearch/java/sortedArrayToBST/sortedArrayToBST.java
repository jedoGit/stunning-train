package sortedArrayToBST;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Deque;
import java.util.LinkedList;
import java.util.List;

//   Definition for a binary tree node.
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

enum testResult {
    PASS("\u001B[32mPASS\u001B[0m"),
    FAIL("\u001B[31mFAIL\u001B[0m");

    private final String value;

    testResult(String value) {
        this.value = value;
    }

    public String getValue() {
        return this.value;
    }
}

record sortedArrayToBSTRecord(int[] nums, List<List<String>> expected) {
}

class sortedArrayToBST {
    public TreeNode sortedArrayToBSTSolution(int[] nums) {
        // Use DFS
        return this.DFS(nums, 0, nums.length - 1);
    }

    private TreeNode DFS(int[] nums, int l, int r) {
        if (l > r) {
            return null;
        }

        int mid = (r + l) / 2;

        TreeNode root = new TreeNode(nums[mid]);

        root.left = this.DFS(nums, l, mid - 1);
        root.right = this.DFS(nums, mid + 1, r);

        return root;
    }

    public static void main(String[] args) {
        sortedArrayToBSTRecord[] records = new sortedArrayToBSTRecord[] {
                new sortedArrayToBSTRecord(new int[] { -10, -3, 0, 5, 9 },
                        List.of(List.of("0", "-10", "5", "null", "-3", "null", "9"),
                                List.of("0", "-3", "9", "-10", "null", "5"))),
                new sortedArrayToBSTRecord(new int[] { 1, 3 }, List.of(List.of("1", "null", "3"), List.of("3", "1")))
        };

        int i = 1;
        for (sortedArrayToBSTRecord record : records) {
            System.out.println("# Test case " + i++);
            sortedArrayToBST.testSolution(record);
            System.out.println("-".repeat(50));
        }
    }

    private static void testSolution(sortedArrayToBSTRecord record) {
        System.out.println("input: nums: " + Arrays.toString(record.nums()));
        System.out.println("expected: " + record.expected());

        TreeNode res = new sortedArrayToBST().sortedArrayToBSTSolution(record.nums());
        List<String> resList = sortedArrayToBST.bstToStrList(res);

        System.out.println("result: " + resList);
        System.out.println(sortedArrayToBST.validateResult(resList, record.expected()) ? testResult.PASS.getValue()
                : testResult.FAIL.getValue());

    }

    private static boolean validateResult(List<String> resList, List<List<String>> expected) {
        if (expected.contains(resList)) {
            return true;
        }
        return false;
    }

    private static List<String> bstToStrList(TreeNode node) {
        // Use BFS
        if (node == null) {
            return List.of();
        }

        Deque<TreeNode> q = new LinkedList<>(); // Use Linked list because this will allow null values
        q.add(node);

        List<String> res = new ArrayList<>();

        while (!q.isEmpty()) {
            TreeNode curNode = q.removeFirst();
            String tmp = curNode != null ? String.valueOf(curNode.val) : "null";
            res.add(tmp);

            if (curNode != null) {
                q.addLast(curNode.left);
                q.addLast(curNode.right);
            }
        }

        while (!res.isEmpty()) {
            if (!res.getLast().equals("null")) {
                break;
            }

            res.removeLast();
        }

        return res;
    }
}

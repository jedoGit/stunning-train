package quadTree;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Deque;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;

// Definition for a QuadTree node.
class Node {
    public boolean val;
    public boolean isLeaf;
    public Node topLeft;
    public Node topRight;
    public Node bottomLeft;
    public Node bottomRight;

    public Node() {
        this.val = false;
        this.isLeaf = false;
        this.topLeft = null;
        this.topRight = null;
        this.bottomLeft = null;
        this.bottomRight = null;
    }

    public Node(boolean val, boolean isLeaf) {
        this.val = val;
        this.isLeaf = isLeaf;
        this.topLeft = null;
        this.topRight = null;
        this.bottomLeft = null;
        this.bottomRight = null;
    }

    public Node(boolean val, boolean isLeaf, Node topLeft, Node topRight, Node bottomLeft, Node bottomRight) {
        this.val = val;
        this.isLeaf = isLeaf;
        this.topLeft = topLeft;
        this.topRight = topRight;
        this.bottomLeft = bottomLeft;
        this.bottomRight = bottomRight;
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

record quadTreeRecord(int[][] grid, Integer[][] expected) {
    // we'll use Integer[][] so we can have a null
}

class quadTree {
    public Node construct(int[][] grid) {

        // return new Node(true, false, new Node(true, true), new Node(true, false, new
        // Node(false, true),
        // new Node(false, true), new Node(true, true), new Node(true, true)), new
        // Node(true, true),
        // new Node(false, true));
        return this.DFS(grid.length, 0, 0, grid);
    }

    private Node DFS(int n, int r, int c, int[][] grid) {
        boolean allSame = true;

        // Check this quadrant if all cells have the same value
        // If not, set the boolean to false
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[r][c] != grid[r + i][c + j]) {
                    allSame = false;
                    break;
                }
            }
        }

        // This quadrant have the same value each cells. So this is a leaf node
        if (allSame) {
            return new Node(grid[r][c] == 1 ? true : false, true);
        }

        // At this point, we know that some cells in the quadrant don't have the same
        // value
        // So, we DFS the 4 sub quadrants of this quadrant
        int n_ = n / 2;

        Node topLeft = this.DFS(n_, r, c, grid);
        Node topRight = this.DFS(n_, r, c + n_, grid);
        Node bottomLeft = this.DFS(n_, r + n_, c, grid);
        Node bottomRight = this.DFS(n_, r + n_, c + n_, grid);

        // We know that this quadrant is not a leaf node, so we return a new leafnode
        // and attach the 4 subquadrant children.
        // Per the requirement, if this is not a leaf node, we set val to any value
        return new Node(false, false, topLeft, topRight, bottomLeft, bottomRight);
    }

    public static void main(String[] args) {
        quadTreeRecord[] records = new quadTreeRecord[] {
                new quadTreeRecord(
                        new int[][] { { 0, 1 }, { 1, 0 } },
                        new Integer[][] { { 0, 1 }, { 1, 0 }, { 1, 1 }, { 1, 1 }, { 1, 0 } }),
                new quadTreeRecord(
                        new int[][] {
                                { 1, 1, 1, 1, 0, 0, 0, 0 },
                                { 1, 1, 1, 1, 0, 0, 0, 0 },
                                { 1, 1, 1, 1, 1, 1, 1, 1 },
                                { 1, 1, 1, 1, 1, 1, 1, 1 },
                                { 1, 1, 1, 1, 0, 0, 0, 0 },
                                { 1, 1, 1, 1, 0, 0, 0, 0 },
                                { 1, 1, 1, 1, 0, 0, 0, 0 },
                                { 1, 1, 1, 1, 0, 0, 0, 0 }
                        },
                        new Integer[][] { { 0, 1 }, { 1, 1 }, { 0, 1 }, { 1, 1 }, { 1, 0 },
                                null, null, null, null, { 1, 0 }, { 1, 0 }, { 1, 1 }, { 1, 1 } }),
        };

        int i = 1;
        for (quadTreeRecord record : records) {
            System.out.println("# Test case " + i++);
            quadTree.testSolution(record);
            System.out.println("-".repeat(50));
        }
    }

    private static void testSolution(quadTreeRecord record) {
        System.out.println("input: grid: " + Arrays.deepToString(record.grid()));
        System.out.println("expected: " + Arrays.deepToString(record.expected()));

        Node resNode = new quadTree().construct(record.grid());
        Integer[][] resArr = quadTree.quadTreeToIntegerArr2D(resNode);

        System.out.println("result: " + Arrays.deepToString(resArr));
        System.out.println(quadTree.validateResult(resArr, record.expected()) ? testResult.PASS.getValue()
                : testResult.FAIL.getValue());
    }

    private static boolean validateResult(Integer[][] resArr, Integer[][] expected) {
        if (resArr.length != expected.length) {
            return false;
        }

        // Result is a list[x, y], where x is the isLeaf boolean and y is the val.
        // We want to compare the isLeaf boolean if the same because if isLeaf is 0 or
        // false, the val portion can be any value 0 and 1.
        // If isLeaf is true, val should be the same as expected.
        for (int i = 0; i < resArr.length; i++) {
            if (resArr[i] == null) {
                continue;
            }

            if (resArr[i][0] != expected[i][0]) {
                return false;
            }

            if (resArr[i][0] == 1 && resArr[i][1] != expected[i][1]) {
                return false;
            }

            // if isLeaf is false or 0, the value can either be 0 or 1 (true, false)
            if (resArr[i][0] == 0 && !Set.of(0, 1).contains(resArr[i][1])) {
                return false;
            }
        }

        return true;
    }

    private static Integer[][] quadTreeToIntegerArr2D(Node root) {
        // Using BFS
        List<List<Integer>> resList = new ArrayList<>();
        Deque<Node> queue = new LinkedList<>(); // we want to use linked list so we can assign null
        queue.addLast(root);

        while (!queue.isEmpty()) {
            Node curNode = queue.removeFirst();

            if (curNode != null) {
                resList.add(List.of(curNode.isLeaf ? 1 : 0, curNode.val ? 1 : 0));
            } else {
                resList.add(null);
            }

            if (curNode != null) {
                queue.addLast(curNode.topLeft);
                queue.addLast(curNode.topRight);
                queue.addLast(curNode.bottomLeft);
                queue.addLast(curNode.bottomRight);
            }
        }

        while (!resList.isEmpty()) {
            if (resList.getLast() != null) {
                break;
            }
            resList.removeLast();
        }

        return resList.stream()
                .map(innerList -> innerList == null ? null : innerList.toArray(new Integer[0]))
                .toArray(Integer[][]::new);
    }
}

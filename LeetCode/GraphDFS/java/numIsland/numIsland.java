package LeetCode.GraphDFS.java.numIsland;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

record numIslandRecord(char[][] grid, int expected) {
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

class numIsland {
    private int m = 0;
    private int n = 0;
    private Set<Map<Integer, Integer>> visited = new HashSet<>();
    private final int[][] dirs = { { 1, 0 }, { -1, 0 }, { 0, 1 }, { 0, -1 } };

    public int numIslands(char[][] grid) {
        this.m = grid.length;
        this.n = grid[0].length;

        int count = 0;

        // visit each cell in the grid and check if it's an island ('1') and if the cell
        // is not visited.
        // if so, count it as an island and perform a dfs on that cell.
        for (int i = 0; i < this.m; i++) {
            for (int j = 0; j < this.n; j++) {
                if (grid[i][j] == '1' && !this.visited.contains(Map.of(i, j))) {
                    count++;
                    this.DFS(i, j, grid);
                }
            }
        }

        return count;
    }

    private void DFS(int r, int c, final char[][] grid) {
        // DFS the surrounding cell of the current cell.
        // check first if the coordinate (r,c) is not out of bound, if out of bound,
        // return.
        // then, check if the coordinate (r,c) is a water ('0') or if we've visited it
        // before. if so, return.

        // Base case: check if we're out of bounds
        if (r < 0 || r > this.m - 1 || c < 0 || c > this.n - 1) {
            return;
        }
        // check if this is a water ("0") or if this is a land we visited, if so, return
        if (grid[r][c] == '0' || this.visited.contains(Map.of(r, c))) {
            return;
        }

        // At this point, this is an island ('1') and we have not visited it in the
        // past.
        // so let's add it to our visited set.
        this.visited.add(Map.of(r, c));

        // let's visit the 4 adjacent cells.
        // this.DFS(r + 1, c, grid);
        // this.DFS(r - 1, c, grid);
        // this.DFS(r, c + 1, grid);
        // this.DFS(r, c - 1, grid);

        for (final int[] dir : this.dirs) {
            this.DFS(r + dir[0], c + dir[1], grid);
        }
    }

    public static void main(String[] args) {
        numIslandRecord[] records = new numIslandRecord[] {
                new numIslandRecord(new char[][] { { '1', '1', '1', '1', '0' }, { '1', '1', '0', '1', '0' },
                        { '1', '1', '0', '0', '0' }, { '0', '0', '0', '0', '0' } }, 1),
                new numIslandRecord(new char[][] { { '1', '1', '0', '0', '0' }, { '1', '1', '0', '0', '0' },
                        { '0', '0', '1', '0', '0' }, { '0', '0', '0', '1', '1' } }, 3),
        };

        int i = 1;
        for (numIslandRecord record : records) {
            System.out.println("Test case " + i++);
            numIsland.testSolution(record);
            System.out.println("-".repeat(50));
        }

    }

    private static void testSolution(numIslandRecord record) {
        System.out.println("Input: Grid: " + Arrays.deepToString(record.grid()));
        System.out.println("Expected: " + record.expected());
        int res = new numIsland().numIslands(record.grid());
        System.out.println("Result: " + res);
        System.out.println(res == record.expected() ? testResult.PASS.getValue() : testResult.FAIL.getValue());
    }
}

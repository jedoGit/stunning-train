package LeetCode.GraphBFS.java.numIsland;

import java.util.Arrays;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.Map;
import java.util.Queue;
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
    private int rows = 0;
    private int cols = 0;
    private Set<Map<Integer, Integer>> visited = new HashSet<>();
    private final int[][] directions = { { 1, 0 }, { -1, 0 }, { 0, 1 }, { 0, -1 } };

    public int numIslands(char[][] grid) {
        this.rows = grid.length;
        this.cols = grid[0].length;

        int count = 0;

        // visit each cell in the grid and check if it's an island ('1') and if the cell
        // is not visited.
        // if so, count it as an island and perform a dfs on that cell.
        for (int i = 0; i < this.rows; i++) {
            for (int j = 0; j < this.cols; j++) {
                if (grid[i][j] == '1' && !this.visited.contains(Map.of(i, j))) {
                    count++;
                    this.BFS(i, j, grid);
                }
            }
        }

        return count;
    }

    private void BFS(int r, int c, final char[][] grid) {
        Queue<int[]> q = new LinkedList<>();
        // Add r,c to visited
        visited.add(Map.of(r, c));

        // Using queue for BFS
        // add, the pair r,c to our queue
        q.add(new int[] { r, c });

        // process the entries in the queue
        while (!q.isEmpty()) {
            // remove the value from the left (head) of the queue.
            int[] coordinate = q.poll();

            // set the row and col to be processed
            int row = coordinate[0];
            int col = coordinate[1];

            // Process the cells around the current cell
            // check if those cells are not out of bounds, not visited and is an island
            // ('1'), if so, add the coordinate of that cell to the queue and set it as
            // visited.
            for (int[] dir : this.directions) {
                // get the coordinate of the surrounding cell
                int nr = row + dir[0];
                int nc = col + dir[1];

                // Check if this cell is valid
                if (nr >= 0 && nr < this.rows && nc >= 0 && nc < this.cols && grid[nr][nc] == '1'
                        && !visited.contains(Map.of(nr, nc))) {

                    // Add it to the queue and mark as visited
                    q.add(new int[] { nr, nc });
                    visited.add(Map.of(nr, nc));
                }
            }
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

package LeetCode.DPMultiDimension.java;

import java.util.Arrays;
import java.util.stream.IntStream;

record InputRecord(int[][] grid) {

    @Override
    public String toString() {
        if (grid == null) {
            return "null";
        }

        StringBuilder sb = new StringBuilder();
        sb.append("[");
        for (int i = 0; i < grid.length; i++) {
            sb.append(Arrays.toString(grid[i]));
            if (i < grid.length - 1) {
                sb.append(", ");
            }
        }
        sb.append("]");
        return sb.toString();
    }
}

public class minPathSum {
    public int computeMinPathSum(int[][] grid) {
        int ROWS = grid.length;
        int COLS = grid[0].length;

        int[][] res = new int[ROWS + 1][COLS + 1];

        // for (int[] row : res) {
        // for (int num : row) {
        // System.out.println(num);
        // }
        // }

        for (int i = 0; i < res.length; i += 1) {
            Arrays.fill(res[i], Integer.MAX_VALUE);
        }
        res[ROWS][COLS - 1] = 0;

        // for (int i = 0; i < res.length; i += 1) {
        // for (int j = 0; j < res[0].length; j += 1) {
        // System.out.print(res[i][j] + " ");
        // }
        // System.out.println();
        // }

        for (int i = ROWS - 1; i > -1; i -= 1) {
            for (int j = COLS - 1; j > -1; j -= 1) {
                res[i][j] = grid[i][j] + Math.min(res[i + 1][j], res[i][j + 1]);
            }
        }

        return res[0][0];
    }

    public static void main(String[] args) {
        minPathSum soln = new minPathSum();

        InputRecord input1 = new InputRecord(new int[][] { { 1, 3, 1 }, { 1, 5, 1 }, { 4, 2, 1 } });
        int result1 = soln.computeMinPathSum(input1.grid());
        int expected1 = 7;

        System.out.println("Input: " + input1);
        System.out.println("Result: " + result1);
        System.out.println("Expected: " + expected1);
        System.out.println("-".repeat(50));

        InputRecord input2 = new InputRecord(new int[][] { { 1, 2, 3 }, { 4, 5, 6 } });
        int result2 = soln.computeMinPathSum(input2.grid());
        int expected2 = 12;

        System.out.println("Input: " + input2);
        System.out.println("Result: " + result2);
        System.out.println("Expected: " + expected2);
        System.out.println("-".repeat(50));
    }

}

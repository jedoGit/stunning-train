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

public class uniquePathsII {
    public int uniquePathsWithObstacles(int[][] obstacleGrid) {
        int M = obstacleGrid.length;
        int N = obstacleGrid[0].length;

        int[] dp = new int[N];
        Arrays.fill(dp, 0);

        dp[N - 1] = 1;

        // Bottoms up DP
        for (int r : IntStream.range(0, M).map(i -> M - 1 - i).toArray()) {
            // System.out.println(r);
            for (int c : IntStream.range(0, N).map(i -> N - 1 - i).toArray()) {
                // System.out.println(c);
                if (obstacleGrid[r][c] == 1) {
                    dp[c] = 0;
                } else if (c + 1 < N) { // here, we're checking if we're not out of bounds
                    dp[c] = dp[c] + dp[c + 1];
                }
            }
        }

        return dp[0];
    }

    public static void main(String[] args) {
        uniquePathsII soln = new uniquePathsII();

        InputRecord input1 = new InputRecord(new int[][] { { 0, 0, 0 }, { 0, 1, 0 }, { 0, 0, 0 } });
        int result1 = soln.uniquePathsWithObstacles(input1.grid());
        int expected1 = 2;

        System.out.println("Input: " + input1);
        System.out.println("Result: " + result1);
        System.out.println("Expected: " + expected1);
        System.out.println("-".repeat(50));

        InputRecord input2 = new InputRecord(new int[][] { { 0, 1 }, { 0, 0 } });
        int result2 = soln.uniquePathsWithObstacles(input2.grid());
        int expected2 = 1;

        System.out.println("Input: " + input2);
        System.out.println("Result: " + result2);
        System.out.println("Expected: " + expected2);
        System.out.println("-".repeat(50));
    }
}

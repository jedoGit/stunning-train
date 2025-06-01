package LeetCode.DPMultiDimension.java;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

record maximalSquareDTO(char[][] matrix, int expected) {
}

public class maximalSquare {
    private record Pair(int r, int c) {
    }

    public int solveMaximalSquareRecursive(char[][] matrix) {
        int rows = matrix.length;
        int cols = matrix[0].length;

        Map<Pair, Integer> cache = new HashMap<>();

        helper(0, 0, cache, matrix, rows, cols);

        Integer max = cache.values().stream()
                .max(Integer::compare)
                .orElse(0);
        // Optional<Integer> max = cache.values().stream().max((a, b) ->
        // Integer.compare(a, b));

        return (int) Math.pow(max, 2.0);
    }

    private int helper(int r, int c, Map<Pair, Integer> cache, char[][] matrix, int rows, int cols) {
        if (r >= rows || c >= cols) {
            return 0;
        }

        Pair p = new Pair(r, c);
        if (!cache.containsKey(p)) {
            int down = helper(r + 1, c, cache, matrix, rows, cols);
            int right = helper(r, c + 1, cache, matrix, rows, cols);
            int diag = helper(r + 1, c + 1, cache, matrix, rows, cols);

            cache.put(p, 0);
            if (matrix[r][c] == '1') {
                int tmp = 1 + Math.min(down, Math.min(right, diag));
                cache.replace(p, tmp);
            }
        }

        return cache.getOrDefault(p, 0);
    }

    public int solveMaximalSquare(char[][] matrix) {
        if (matrix == null || matrix.length == 0) {
            System.out.println("Matrix is empty or null");
            return 0;
        }

        int rows = matrix.length;
        int cols = matrix[0].length;

        int[][] dp = new int[rows + 1][cols + 1];
        for (int[] row : dp) {
            Arrays.fill(row, 0);
        }

        int max_side = 0;
        for (int i = 1; i < rows + 1; i += 1) {
            for (int j = 1; j < cols + 1; j += 1) {
                if (matrix[i - 1][j - 1] == '1') {
                    dp[i][j] = 1 + Math.min(
                            dp[i - 1][j],
                            Math.min(dp[i][j - 1], dp[i - 1][j - 1]));
                    max_side = Math.max(max_side, dp[i][j]);
                }
            }
        }

        return max_side * max_side;
    }

    public static void main(String[] args) {
        maximalSquare soln = new maximalSquare();

        maximalSquareDTO input1 = new maximalSquareDTO(new char[][] { { '1', '0', '1', '0', '0' },
                { '1', '0', '1', '1', '1' }, { '1', '1', '1', '1', '1' }, { '1', '0', '0', '1', '0' } }, 4);
        System.out.println("Input: " + Arrays.deepToString(input1.matrix()));
        System.out.println("Expected: " + input1.expected());
        System.out.println("Result: " + soln.solveMaximalSquareRecursive(input1.matrix()));
        System.out.println("-".repeat(50));

        maximalSquareDTO input2 = new maximalSquareDTO(new char[][] { { '0', '1' }, { '1', '0' } }, 1);
        System.out.println("Input: " + Arrays.deepToString(input2.matrix()));
        System.out.println("Expected: " + input2.expected());
        System.out.println("Result: " + soln.solveMaximalSquareRecursive(input2.matrix()));
        System.out.println("-".repeat(50));

        maximalSquareDTO input3 = new maximalSquareDTO(new char[][] { { '0' }, }, 0);
        System.out.println("Input: " + Arrays.deepToString(input3.matrix()));
        System.out.println("Expected: " + input3.expected());
        System.out.println("Result: " + soln.solveMaximalSquareRecursive(input3.matrix()));
        System.out.println("-".repeat(50));
    }
}

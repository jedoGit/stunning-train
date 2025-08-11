package LeetCode.Matrix.java;

import java.util.Arrays;

record setMatrixZeroesRecord(int[][] matrix, int[][] expected) {
}

public class setMatrixZeroes {
    public void setZeroes(int[][] matrix) {
        final int numRows = matrix.length;
        final int numCols = matrix[0].length;
        boolean rowZero = false;

        // Determine which rows/cols need to be zeroed
        for (int r = 0; r < numRows; r++) {
            for (int c = 0; c < numCols; c++) {
                if (matrix[r][c] == 0) {
                    matrix[0][c] = 0;

                    if (r > 0) {
                        matrix[r][0] = 0;
                    } else {
                        rowZero = true;
                    }
                }
            }
        }

        for (int r = 1; r < numRows; r++) {
            for (int c = 1; c < numCols; c++) {
                if (matrix[0][c] == 0 || matrix[r][0] == 0) {
                    matrix[r][c] = 0;
                }
            }
        }

        if (matrix[0][0] == 0) {
            for (int r = 0; r < numRows; r++) {
                matrix[r][0] = 0;
            }
        }

        if (rowZero) {
            for (int c = 0; c < numCols; c++) {
                matrix[0][c] = 0;
            }
        }
    }

    public static void main(String[] args) {
        setMatrixZeroesRecord input = new setMatrixZeroesRecord(
                new int[][] { { 1, 1, 1 }, { 1, 0, 1 }, { 1, 1, 1 } },
                new int[][] { { 1, 0, 1 }, { 0, 0, 0 }, { 1, 0, 1 } });
        setMatrixZeroes.testSolution(input);

        input = new setMatrixZeroesRecord(
                new int[][] { { 0, 1, 2, 0 }, { 3, 4, 5, 2 }, { 1, 3, 1, 5 } },
                new int[][] { { 0, 0, 0, 0 }, { 0, 4, 5, 0 }, { 0, 3, 1, 0 } });
        setMatrixZeroes.testSolution(input);
    }

    private static void testSolution(setMatrixZeroesRecord input) {
        System.out.println("Input: matrix: " + Arrays.deepToString(input.matrix()));
        System.out.println("Expected: " + Arrays.deepToString(input.expected()));
        new setMatrixZeroes().setZeroes(input.matrix());
        System.out.println("Result: " + Arrays.deepToString(input.matrix()));
        System.out.println(areMatricesEqual(input.expected(), input.matrix()) ? "PASS" : "FAIL");
        System.out.println("-".repeat(50));
    }

    public static boolean areMatricesEqual(int[][] matrix1, int[][] matrix2) {
        // Check if dimensions are the same
        if (matrix1.length != matrix2.length || matrix1[0].length != matrix2[0].length) {
            return false;
        }

        // Compare corresponding elements
        for (int i = 0; i < matrix1.length; i++) {
            for (int j = 0; j < matrix1[0].length; j++) {
                if (matrix1[i][j] != matrix2[i][j]) {
                    return false; // Found a differing element
                }
            }
        }
        return true; // All elements are equal
    }
}

package LeetCode.Matrix.java;

import java.util.Arrays;

record rotateImageRecord(int[][] matrix, int[][] expected) {
}

public class rotateImage {
    public void rotate(int[][] matrix) {
        int numRows = matrix.length;

        // transpose
        for (int i = 0; i < numRows; i += 1) {
            for (int j = i + 1; j < numRows; j += 1) {
                int tmp = matrix[i][j];
                matrix[i][j] = matrix[j][i];
                matrix[j][i] = tmp;
            }
        }

        // Reverse rows in place
        for (int i = 0; i < numRows; i += 1) { // Iterate through each row
            int left = 0;
            int right = matrix[i].length - 1;

            while (left < right) {
                // Swap elements
                int temp = matrix[i][left];
                matrix[i][left] = matrix[i][right];
                matrix[i][right] = temp;

                // Move pointers
                left++;
                right--;
            }
        }
    }

    public static void main(String[] args) {
        rotateImageRecord input = new rotateImageRecord(
                new int[][] { { 1, 2, 3 }, { 4, 5, 6 }, { 7, 8, 9 } },
                new int[][] { { 7, 4, 1 }, { 8, 5, 2 }, { 9, 6, 3 } });
        rotateImage.testSolution(input);

        input = new rotateImageRecord(
                new int[][] { { 5, 1, 9, 11 }, { 2, 4, 8, 10 }, { 13, 3, 6, 7 }, { 15, 14, 12, 16 } },
                new int[][] { { 15, 13, 2, 5 }, { 14, 3, 4, 1 }, { 12, 6, 8, 9 }, { 16, 7, 10, 11 } });

        rotateImage.testSolution(input);
    }

    private static void testSolution(rotateImageRecord input) {
        System.out.println("Input: matrix: " + Arrays.deepToString(input.matrix()));
        System.out.println("Expected: " + Arrays.deepToString(input.expected()));
        new rotateImage().rotate(input.matrix());
        System.out.println("Result: " + Arrays.deepToString(input.matrix()));
        System.out.println((areMatricesEqual(input.expected(), input.matrix()) ? "PASS" : "FAIL"));
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

package LeetCode.Matrix.java;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

record spiralMatrixRecord(int[][] matrix, List<Integer> expected) {
}

public class spiralMatrix {
    public List<Integer> spiralOrder(int[][] matrix) {
        List<Integer> res = new ArrayList<>();

        int left = 0;
        int right = matrix[0].length;
        int top = 0;
        int bottom = matrix.length;

        while (left < right && top < bottom) {
            for (int i = left; i < right; i++) {
                res.add(matrix[top][i]);
            }
            top += 1;

            for (int i = top; i < bottom; i++) {
                res.add(matrix[i][right - 1]);
            }
            right -= 1;

            if (!(left < right && top < bottom)) {
                break;
            }

            for (int i = right - 1; i > left - 1; i--) {
                res.add(matrix[bottom - 1][i]);
            }
            bottom -= 1;

            for (int i = bottom - 1; i > top - 1; i--) {
                res.add(matrix[i][left]);
            }
            left += 1;
        }

        return res;
    }

    public static void main(String[] args) {
        spiralMatrixRecord input = new spiralMatrixRecord(new int[][] {
                { 1, 2, 3 },
                { 4, 5, 6 },
                { 7, 8, 9 } },
                List.of(1, 2, 3, 6, 9, 8, 7, 4, 5));
        spiralMatrix.testSolution(input);

        input = new spiralMatrixRecord(new int[][] {
                { 1, 2, 3, 4 },
                { 5, 6, 7, 8 },
                { 9, 10, 11, 12 } },
                List.of(1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7));
        spiralMatrix.testSolution(input);
    }

    private static void testSolution(spiralMatrixRecord input) {
        System.out.println("Input: matrix: " + Arrays.deepToString(input.matrix()));
        System.out.println("Expected: " + input.expected());
        List<Integer> val = new spiralMatrix().spiralOrder(input.matrix());
        System.out.println("Result: " + val);
        System.out.println((input.expected().equals(val)) ? "PASS" : "FAIL");
        System.out.println("-".repeat(50));
    }
}

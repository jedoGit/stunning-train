package searchMatrix;

import java.util.Arrays;

// You are given an m x n integer matrix matrix with the following two properties:

// Each row is sorted in non-decreasing order.
// The first integer of each row is greater than the last integer of the previous row.
// Given an integer target, return true if target is in matrix or false otherwise.

// You must write a solution in O(log(m * n)) time complexity.

// Example 1:

// Input: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3
// Output: true
// Example 2:

// Input: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13
// Output: false

// Constraints:

// m == matrix.length
// n == matrix[i].length
// 1 <= m, n <= 100
// -104 <= matrix[i][j], target <= 104

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

record searchMatrixRecord(int[][] matrix, int target, boolean expected) {
}

class Solution {
    public boolean searchMatrix(int[][] matrix, int target) {

        int rows = matrix.length;
        int cols = matrix[0].length;
        int row = 0;
        int col = cols - 1;

        while (row < rows && col > -1) {
            int cur = matrix[row][col];
            if (cur == target) {
                return true;
            }
            if (target > cur) {
                row++;
            } else {
                col--;
            }
        }

        return false;
    }

    public static void main(String[] args) {
        searchMatrixRecord[] records = new searchMatrixRecord[] {
                new searchMatrixRecord(new int[][] { { 1, 3, 5, 7 }, { 10, 11, 16, 20 }, { 23, 30, 34, 60 } }, 3, true),
                new searchMatrixRecord(new int[][] { { 1, 3, 5, 7 }, { 10, 11, 16, 20 }, { 23, 30, 34, 60 } }, 13,
                        false),
        };

        int i = 1;
        for (searchMatrixRecord record : records) {
            System.out.println("# Test case " + i++);
            Solution.testSolution(record);
            System.out.println("-".repeat(50));
        }
    }

    private static void testSolution(searchMatrixRecord record) {
        System.out.println("input:\tmatrix: " + Arrays.deepToString(record.matrix()));
        System.out.println("\ttarget: " + record.target());
        System.out.println("expected: " + record.expected());

        boolean res = new Solution().searchMatrix(record.matrix(), record.target());

        System.out.println("result: " + res);
        System.out.println(res == record.expected() ? testResult.PASS.getValue() : testResult.FAIL.getValue());
    }
}
package searchMatrix;
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

class Solution {
    public boolean searchMatrix(int[][] matrix, int target) {

        List<List<Integer>> mat = new ArrayList<>();

        // Convert int[][] to List<List<Integer>>
        for (int[] row : matrix) {
            List<Integer> el = new ArrayList<>();
            for (int e : row) {
                el.add(e);
            }
            mat.add(el);
        }

        // System.out.println(mat);

        Integer rows = mat.size();
        Integer cols = mat.get(0).size();
        Integer row = 0;
        Integer col = cols - 1;

        while (row < rows && col > -1) {
            Integer cur = mat.get(row).get(col);
            if (cur == target) {
                return true;
            }
            if (cur < target) {
                row++;
            } else {
                col--;
            }
        }

        return false;

        // int rows = matrix.length;
        // int cols = matrix[0].length;
        // int row = 0;
        // int col = cols - 1;

        // while ( row < rows && col > -1 ) {
        // int cur = matrix[row][col];
        // if ( cur == target ){
        // return true;
        // }
        // if( target > cur) {
        // row++;
        // }
        // else {
        // col--;
        // }
        // }
        // return false;
    }
}
package LeetCode.Matrix.java;

import java.util.Arrays;

record gameOfLifeRecord(int[][] board, int[][] expected) {
}

public class gameOfLife {
    public void gameOfLifeSolution(int[][] board) {
        // This is our state table... we'll represent our state changes like this
        // Old | New | State
        // 0 | 0 | 0
        // 1 | 0 | 1
        // 0 | 1 | 2
        // 1 | 1 | 3

        // This is the number of rows and cols of the matrix
        int rows = board.length;
        int cols = board[0].length;

        // Here, we visit each elements of the matrix and check its neighbors
        // we use our state diagram above to assign values based on its neighbors
        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                // First, get the neighbor count of the current cell
                final int nei = countNeighbors(board, r, c, rows, cols);
                // If the current cell is not zero
                // we check if it has 2 or 3 neighbors
                if (board[r][c] > 0) {
                    // If it has 2 or 3 neighbors, we change the value of the current cell to 3
                    // based on the state diagram
                    if (nei == 2 || nei == 3) {
                        board[r][c] = 3;
                    }
                } else if (board[r][c] == 0 && nei == 3) { // here, the current element is zero and it has 3 neighbors
                    // We assign a value of 2
                    board[r][c] = 2;
                }
            }
        }

        // At this point, we're done assigning values to each cells based on the state
        // diagram
        // now, we're ready to update each cells if they're dead or not... 0 or 1
        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                // If the cell was assigned a 1, we set it to zero
                if (board[r][c] == 1) {
                    board[r][c] = 0;
                } else if (board[r][c] == 2 || board[r][c] == 3) { // if a cell is assigned a 2 or a 3, we set it to 1
                    board[r][c] = 1;
                }
            }
        }
    }

    // This is our helper function to check the neighbor counts of the cell
    private int countNeighbors(int[][] board, int r, int c, int rows, int cols) {
        int nei = 0;

        // Check each elements of the matrix
        for (int i = r - 1; i < r + 2; i++) {
            for (int j = c - 1; j < c + 2; j++) {
                // Continue if:
                // 1. i,j is r,c
                // 2. i or j is out of bounds, ie negative
                // 3. i or j is out of bounds, ie greater than the matrix length
                if ((i == r && j == c) || i < 0 || j < 0 || i == rows || j == cols) {
                    continue;
                }
                // Check if the matrix elements is equal to 1 or 3, if so,
                // increment nei by 1. This is the neighbor count of the current cell
                if (board[i][j] == 1 || board[i][j] == 3) {
                    nei += 1;
                }
            }
        }

        return nei;
    }

    public static void main(String[] args) {
        gameOfLifeRecord input = new gameOfLifeRecord(
                new int[][] { { 0, 1, 0 }, { 0, 0, 1 }, { 1, 1, 1 }, { 0, 0, 0 } },
                new int[][] { { 0, 0, 0 }, { 1, 0, 1 }, { 0, 1, 1 }, { 0, 1, 0 } });
        gameOfLife.testSolution(input);

        input = new gameOfLifeRecord(
                new int[][] { { 1, 1 }, { 1, 0 } },
                new int[][] { { 1, 1 }, { 1, 1 } });
        gameOfLife.testSolution(input);
    }

    private static void testSolution(gameOfLifeRecord input) {
        System.out.println("Input: board: " + Arrays.deepToString(input.board()));
        System.out.println("Expected: " + Arrays.deepToString(input.expected()));
        new gameOfLife().gameOfLifeSolution(input.board());
        System.out.println("Result: " + Arrays.deepToString(input.board()));
        System.out.println(areMatricesEqual(input.board(), input.expected()) ? "PASS" : "FAIL");
        System.out.println("-".repeat(50));
    }

    private static boolean areMatricesEqual(int[][] mat1, int[][] mat2) {
        // Check if dimensions are the same
        if (mat1.length != mat2.length || mat1[0].length != mat2[0].length) {
            return false;
        }

        // Compare corresponding elements
        for (int r = 0; r < mat1.length; r++) {
            for (int c = 0; c < mat1[0].length; c++) {
                if (mat1[r][c] != mat2[r][c]) {
                    return false;
                }
            }
        }

        return true;
    }
}

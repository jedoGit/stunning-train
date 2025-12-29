package LeetCode.GraphDFS.java.surroundedRegions;

import java.util.Arrays;

record surroundedRegionsRecord(char[][] board, char[][] expected) {
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

public class surroundedRegions {
    int[][] dirs = new int[][] { { 1, 0 }, { -1, 0 }, { 0, 1 }, { 0, -1 } };
    int rows = 0;
    int cols = 0;
    char[][] board_ = null;

    public void solve(char[][] board) {
        this.rows = board.length;
        this.cols = board[0].length;
        this.board_ = board;

        // 1. convert "O" on the perimeter of the board to "T" by calling the DFS
        // function,
        // It's in the perimiter if (0, j) or (row-1, j) or (i, 0) or (i, cols-1)
        for (int i = 0; i < this.rows; i++) {
            for (int j = 0; j < this.cols; j++) {
                if (i == 0 || i == this.rows - 1 || j == 0 || j == this.cols - 1) {
                    // if (List.of(0, this.rows - 1).contains(i) || List.of(0, this.cols -
                    // 1).contains(j)) {
                    if (this.board_[i][j] == 'O') {
                        this.DFS(i, j);
                    }
                }
            }
        }

        // 2. convert all "O" to "X".. These are the "O" that are not in the perimeter
        // of the board
        for (int i = 0; i < this.rows; i++) {
            for (int j = 0; j < this.cols; j++) {
                if (this.board_[i][j] == 'O') {
                    this.board_[i][j] = 'X';
                }
            }
        }

        // 3. convert all "T" to "O".. These are the "O" that were in the perimeter of
        // the board that we changed to "T". let's change it back to "O"
        for (int i = 0; i < this.rows; i++) {
            for (int j = 0; j < this.cols; j++) {
                if (this.board_[i][j] == 'T') {
                    this.board_[i][j] = 'O';
                }
            }
        }
    }

    // helper function that converts all "O" to "T" on the perimeter of the board
    private void DFS(int r, int c) {
        // return if r, c is out of bounds or board is not an "O"
        if (r < 0 || r > this.rows - 1 || c < 0 || c > this.cols - 1 || this.board_[r][c] != 'O') {
            return;
        }

        // at this point, board[r][c] is "O", so we change it to "T"
        this.board_[r][c] = 'T';

        // We then dfs to all dirs
        for (int[] dir : dirs) {
            this.DFS(r + dir[0], c + dir[1]);
        }
    }

    public static void main(String[] args) {
        surroundedRegionsRecord[] testInputRecords = new surroundedRegionsRecord[] {
                new surroundedRegionsRecord(
                        new char[][] { { 'X', 'X', 'X', 'X' }, { 'X', 'O', 'O', 'X' }, { 'X', 'X', 'O', 'X' },
                                { 'X', 'O', 'X', 'X' } },
                        new char[][] { { 'X', 'X', 'X', 'X' }, { 'X', 'X', 'X', 'X' }, { 'X', 'X', 'X', 'X' },
                                { 'X', 'O', 'X', 'X' } }),
                new surroundedRegionsRecord(
                        new char[][] { { 'X' } },
                        new char[][] { { 'X' } })
        };

        int i = 1;
        for (surroundedRegionsRecord record : testInputRecords) {
            System.out.println("Test case " + i++);
            surroundedRegions.testSolution(record);
            System.out.println("-".repeat(50));
        }
    }

    public static void testSolution(surroundedRegionsRecord input) {
        System.out.println("Input Board: ");
        surroundedRegions.printBoard(input.board());

        new surroundedRegions().solve(input.board());

        System.out.println("Expected Board: ");
        surroundedRegions.printBoard(input.expected());

        System.out.println("Result Board: ");
        surroundedRegions.printBoard(input.board());

        System.out.println(Arrays.deepEquals(input.board(), input.expected())
                ? testResult.PASS.getValue()
                : testResult.FAIL.getValue());
    }

    public static void printBoard(char[][] board) {

        for (int i = 0; i < board.length; i++) {
            System.out.print("[ ");
            for (int j = 0; j < board[0].length; j++) {
                System.out.print(board[i][j] + " ");
            }
            System.out.print("]");
            System.out.println();
        }
    }
}

package LeetCode.GraphBFS.java.snakesAndLadder;

import java.util.ArrayDeque;
import java.util.Deque;
import java.util.HashSet;
import java.util.Set;

enum testResult {
    PASS("\u001B[32mPASS\u001B[0m"),
    FAIL("\u001B[31mFAIL\u001B[0m");

    private final String value;

    testResult(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}

record snakesAndLadderRecord(int[][] board, int expected) {
}

record rowColPair(int row, int col) {
}

record cellNumNumMovesPair(int cellNum, int numMoves) {
}

public class snakesAndLadder {
    private int length = 0;

    public int snakesAndLaddersSolution(int[][] board) {

        this.length = board.length;
        // We need to reverse the board. If you look at the snakes and ladder board,
        // cell 1 is in position [5, 0]. Also, in each row, every odd row, the positions
        // are flipped. We have to account for that.
        // Reversing the rows now will move cell 1 to position [0,0] and cell 36 to
        // position [5,0]. This will make the coding easier.
        snakesAndLadder.reverse2DArrayRows(board);

        // snakesAndLadder.printBoard(board);

        // BFS
        Deque<cellNumNumMovesPair> queue = new ArrayDeque<>();
        queue.add(new cellNumNumMovesPair(1, 0));

        // We need to keep track of the cell we've visited and we want to visit it only
        // once.
        Set<Integer> visited = new HashSet<>();

        while (!queue.isEmpty()) {
            cellNumNumMovesPair cm = queue.pollFirst();

            for (int i = 1; i < 7; i++) {
                // We'll try all cells and find which one will take less moves
                int nextCell = cm.cellNum() + i;

                // The value in the cell represents the number of cell we need to jump to.
                // This helper function will return the position of the grid where we need to
                // jump to
                rowColPair rc = this.intToPos(nextCell);

                // Jump to the next cell if the cell we landed is not -1
                if (board[rc.row()][rc.col()] != -1) {
                    nextCell = board[rc.row()][rc.col()];
                }

                // this is the case were we reached the cell last cell and we're done!
                if (nextCell == (this.length * this.length)) {
                    return cm.numMoves() + 1;
                }

                // Check if we've have not visited this cell. Add it to the visited and BFS to
                // the next cell
                if (!visited.contains(nextCell)) {
                    visited.add(nextCell);
                    queue.add(new cellNumNumMovesPair(nextCell, cm.numMoves() + 1));
                }
            }
        }

        return -1;
    }

    private rowColPair intToPos(int cell) {
        // Convert the cell number to a row, column position of the grid
        int r = (cell - 1) / this.length;
        int c = (cell - 1) % this.length;

        // For every even row, we need to inverse the column value
        if (r % 2 != 0) {
            c = this.length - 1 - c;
        }

        return new rowColPair(r, c);
    }

    // Reverse 2D Array rows in place
    public static void reverse2DArrayRows(int[][] arr) {
        int start = 0;
        int end = arr.length - 1;

        while (start < end) {
            // Swap the rows
            int[] tmp = arr[start];
            arr[start] = arr[end];
            arr[end] = tmp;

            // Move the pointers inward
            start++;
            end--;
        }
    }

    public static void main(String[] args) {
        snakesAndLadderRecord[] records = new snakesAndLadderRecord[] {
                new snakesAndLadderRecord(new int[][] { { -1, -1, -1, -1, -1, -1 }, { -1, -1, -1, -1, -1, -1 },
                        { -1, -1, -1, -1, -1, -1 }, { -1, 35, -1, -1, 13, -1 }, { -1, -1, -1, -1, -1, -1 },
                        { -1, 15, -1, -1, -1, -1 } }, 4),
                new snakesAndLadderRecord(new int[][] { { -1, -1 }, { -1, 3 } }, 1)
        };

        int i = 0;
        for (snakesAndLadderRecord record : records) {
            System.out.println("Test case " + ++i);
            snakesAndLadder.testSolution(record);
            System.out.println("-".repeat(50));
        }

    }

    private static void testSolution(snakesAndLadderRecord record) {
        System.out.println("Input: board:");
        snakesAndLadder.printBoard(record.board());
        System.out.println("expected: " + record.expected());

        int res = new snakesAndLadder().snakesAndLaddersSolution(record.board());

        System.out.println("result: " + res);
        System.out.println(res == record.expected() ? testResult.PASS.getValue() : testResult.FAIL.getValue());
    }

    public static void printBoard(int[][] board) {

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

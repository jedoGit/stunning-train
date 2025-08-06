package LeetCode.Matrix.java;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

record validSudokuRecord(char[][] board, boolean expected) {

    @Override
    public String toString() {
        if (board == null || board.length == 0) {
            return "[]"; // Handle empty or null array
        }

        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < board.length; i++) {
            sb.append("[ ");
            for (int j = 0; j < board[i].length; j++) {
                sb.append(board[i][j]);
                if (j < board[i].length - 1) {
                    sb.append(" "); // Add space between characters in a row
                }
            }
            if (i < board.length - 1) {
                sb.append(" ]\n"); // Add newline after each row (except the last)
            }
        }
        sb.append(" ]");
        return sb.toString();
    }
}

public class validSudoku {
    public boolean isValidSudoku(char[][] board) {
        // Using hash map to check if there are duplicates in each rows, columns and
        // cells
        Map<Character, Set<Character>> cols = new HashMap<>();
        Map<Character, Set<Character>> rows = new HashMap<>();
        Map<String, Set<Character>> squares = new HashMap<>();

        // Let's go through each rows and cols, it's a 9x9 matrix
        // A cell is a 3x3 matrix
        for (char r = 0; r < 9; r += 1) {
            for (char c = 0; c < 9; c += 1) {
                // Let's compute which cell the current row and col belong to
                // It works out by using integer division by 3 and we can address each cell
                // For example, r = 0 and c = 0 is cell (0,0); r = 8 and c = 8 is cell (2,2)
                // r = 7, c = 3 is cell (2, 1)
                int r_ = r / 3;
                int c_ = c / 3;
                String rcPair = r_ + "" + c_;

                // If board[r][c] is a dot, it means it's empty, so we continue
                if (board[r][c] == '.') {
                    continue;
                }

                // Here we create the key and value is initialized as an empty set.
                // if (!cols.containsKey(c)) {
                // cols.put(c, new HashSet<>());
                // }
                cols.put(c, cols.getOrDefault(c, new HashSet<>()));

                // if (!rows.containsKey(r)) {
                // rows.put(r, new HashSet<>());
                // }
                rows.put(r, rows.getOrDefault(r, new HashSet<>()));

                // if (!squares.containsKey(rcPair)) {
                // squares.put(rcPair, new HashSet<>());
                // }
                squares.put(rcPair, squares.getOrDefault(rcPair, new HashSet<>()));

                // We get the value for each keys and check if the current r,c pair has
                // duplicates
                // If so, we return false
                if (rows.get(r).contains(board[r][c]) || cols.get(c).contains(board[r][c])
                        || squares.get(rcPair).contains(board[r][c])) {
                    return false;
                }

                // Now we add each non "." values to our sets, this is to see if we have
                // duplicates
                cols.get(c).add(board[r][c]);
                rows.get(r).add(board[r][c]);
                squares.get(rcPair).add(board[r][c]);
            }
        }

        return true;
    }

    public static void main(String[] args) {
        validSudokuRecord input = new validSudokuRecord(
                new char[][] {
                        { '5', '3', '.', '.', '7', '.', '.', '.', '.' },
                        { '6', '.', '.', '1', '9', '5', '.', '.', '.' },
                        { '.', '9', '8', '.', '.', '.', '.', '6', '.' },
                        { '8', '.', '.', '.', '6', '.', '.', '.', '3' },
                        { '4', '.', '.', '8', '.', '3', '.', '.', '1' },
                        { '7', '.', '.', '.', '2', '.', '.', '.', '6' },
                        { '.', '6', '.', '.', '.', '.', '2', '8', '.' },
                        { '.', '.', '.', '4', '1', '9', '.', '.', '5' },
                        { '.', '.', '.', '.', '8', '.', '.', '7', '9' } },
                true);
        validSudoku.testSolution(input);

        input = new validSudokuRecord(
                new char[][] {
                        { '8', '3', '.', '.', '7', '.', '.', '.', '.' },
                        { '6', '.', '.', '1', '9', '5', '.', '.', '.' },
                        { '.', '9', '8', '.', '.', '.', '.', '6', '.' },
                        { '8', '.', '.', '.', '6', '.', '.', '.', '3' },
                        { '4', '.', '.', '8', '.', '3', '.', '.', '1' },
                        { '7', '.', '.', '.', '2', '.', '.', '.', '6' },
                        { '.', '6', '.', '.', '.', '.', '2', '8', '.' },
                        { '.', '.', '.', '4', '1', '9', '.', '.', '5' },
                        { '.', '.', '.', '.', '8', '.', '.', '7', '9' } },
                false);
        validSudoku.testSolution(input);
    }

    private static void testSolution(validSudokuRecord input) {
        System.out.println("Input: board: \n" + input.toString());
        System.out.println("Expected: " + input.expected());
        boolean val = new validSudoku().isValidSudoku(input.board());
        System.out.println("Result: " + val);
        System.out.println((input.expected() == val ? "PASS" : "FAIL"));
        System.out.println("-".repeat(50));
    }
}

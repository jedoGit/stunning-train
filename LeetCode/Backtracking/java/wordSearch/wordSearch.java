package LeetCode.Backtracking.java.wordSearch;

import java.util.Arrays;
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
        return this.value;
    }
}

record wordSearchRecord(char[][] board, String word, boolean expected) {
}

record rcPair(int r, int c) {
}

class wordSearch {
    int numRows = 0;
    int numCols = 0;
    Set<rcPair> path = new HashSet<>();

    public boolean exist(char[][] board, String word) {
        this.numRows = board.length;
        this.numCols = board[0].length;

        for (int r = 0; r < this.numRows; r++) {
            for (int c = 0; c < this.numCols; c++) {
                if (this.backtrack(r, c, 0, board, word)) {
                    return true;
                }
            }
        }

        return false;
    }

    private boolean backtrack(int r, int c, int i, char[][] board, String word) {
        if (i == word.length()) {
            return true;
        }

        if (r < 0 || c < 0 || r >= this.numRows || c >= this.numCols) {
            return false;
        }

        if (word.charAt(i) != board[r][c]) {
            return false;
        }

        rcPair rc = new rcPair(r, c);
        if (this.path.contains(rc)) {
            return false;
        }

        this.path.add(rc);

        boolean res = this.backtrack(r + 1, c, i + 1, board, word) ||
                this.backtrack(r - 1, c, i + 1, board, word) ||
                this.backtrack(r, c + 1, i + 1, board, word) ||
                this.backtrack(r, c - 1, i + 1, board, word);

        this.path.remove(rc);

        return res;
    }

    public static void main(String[] args) {
        wordSearchRecord[] records = new wordSearchRecord[] {
                new wordSearchRecord(
                        new char[][] { { 'A', 'B', 'C', 'E' }, { 'S', 'F', 'C', 'S' }, { 'A', 'D', 'E', 'E' } },
                        "ABCCED", true),
                new wordSearchRecord(
                        new char[][] { { 'A', 'B', 'C', 'E' }, { 'S', 'F', 'C', 'S' }, { 'A', 'D', 'E', 'E' } },
                        "SEE", true),
                new wordSearchRecord(
                        new char[][] { { 'A', 'B', 'C', 'E' }, { 'S', 'F', 'C', 'S' }, { 'A', 'D', 'E', 'E' } },
                        "ABCB", false),
        };

        int i = 1;
        for (wordSearchRecord record : records) {
            System.out.println("# Test case " + i++);
            wordSearch.testSolution(record);
            System.out.println("-".repeat(50));
        }

    }

    private static void testSolution(wordSearchRecord record) {
        System.out.println("input:\tboard: " + Arrays.deepToString(record.board()));
        System.out.println("\tword: " + record.word());
        System.out.println("expected: " + record.expected());
        boolean res = new wordSearch().exist(record.board(), record.word());
        System.out.println("result: " + res);
        System.out.println(res == record.expected() ? testResult.PASS.getValue() : testResult.FAIL.getValue());
    }
}

// The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other.

// Given an integer n, return the number of distinct solutions to the n-queens puzzle.

// Example 1:

// Input: n = 4
// Output: 2
// Explanation: There are two distinct solutions to the 4-queens puzzle as shown.
// Example 2:

// Input: n = 1
// Output: 1

// Constraints:

// 1 <= n <= 9

// TC:
// SC:

class Solution {
    private Set<Integer> col;
    private Set<Integer> posDiag;
    private Set<Integer> negDiag;
    private Integer res;

    private void backtrack(int r, int n) {
        if ( r == n ) {
            res += 1;
            return;
        }

        for ( int c = 0 ; c < n ; c += 1 ) {
            if (col.contains(c) || posDiag.contains(r+c) || negDiag.contains(r-c)) {
                continue;
            }

            col.add(c);
            posDiag.add(r+c);
            negDiag.add(r-c);

            backtrack(r+1, n);

            col.remove(c);
            posDiag.remove(r+c);
            negDiag.remove(r-c);
        }

        return;
    }

    public Solution() {
        col = new HashSet<>();
        posDiag = new HashSet<>();
        negDiag = new HashSet<>();
        res = 0;
    }

    public int totalNQueens(int n) {
        backtrack(0, n);

        return res;
    }
}
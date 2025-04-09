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

class Solution
{
private:
    // unordered_set use hashtable to store the values
    unordered_set<int> col;
    unordered_set<int> posDiag;
    unordered_set<int> negDiag;

    int res;

    void backtrack(int r, int &n)
    {
        if (r == n)
        {
            res += 1;
            return;
        }

        for (int c = 0; c < n; c += 1)
        {
            // Check if the values are in the set. If so, continue.
            if (col.find(c) != col.end() || posDiag.find(r + c) != posDiag.end() || negDiag.find(r - c) != negDiag.end())
            {
                continue;
            }

            col.insert(c);
            posDiag.insert(r + c);
            negDiag.insert(r - c);

            backtrack(r + 1, n);

            col.erase(c);
            posDiag.erase(r + c);
            negDiag.erase(r - c);
        }

        return;
    }

public:
    int totalNQueens(int n)
    {

        backtrack(0, n);

        return res;
    }
};
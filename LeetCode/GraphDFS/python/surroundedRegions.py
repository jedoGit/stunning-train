# You are given an m x n matrix board containing letters 'X' and 'O', capture regions that are surrounded:

# Connect: A cell is connected to adjacent cells horizontally or vertically.
# Region: To form a region connect every 'O' cell.
# Surround: The region is surrounded with 'X' cells if you can connect the region with 'X' cells and none of the region cells are on the edge of the board.
# To capture a surrounded region, replace all 'O's with 'X's in-place within the original board. You do not need to return anything.

# Example 1:

# Input: board = [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]]

# Output: [["X","X","X","X"],["X","X","X","X"],["X","X","X","X"],["X","O","X","X"]]

# Explanation:

# In the above diagram, the bottom region is not captured because it is on the edge of the board and cannot be surrounded.

# Example 2:

# Input: board = [["X"]]

# Output: [["X"]]

# Constraints:

# m == board.length
# n == board[i].length
# 1 <= m, n <= 200
# board[i][j] is 'X' or 'O'.

# TC: O(m*n)
# SC: O(2(m+n)), which is the number of cells on the border of the board

from enum import Enum
from typing import Dict, List

class Result(Enum):
    PASS = "\033[92mPASS\033[00m"
    FAIL = "\033[91mFAIL\033[00m"

class Solution:
    def __init__(self):
        self.dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]]
        self.rows = 0
        self.cols = 0
        self.board = None

    def solve(self, board: List[List[str]]) -> None:
        """
        Do not return anything, modify board in-place instead.
        """
        self.rows = len(board)
        self.cols = len(board[0])
        self.board = board

        # 1. convert "O" on the perimeter of the board to "T"
        for i in range(self.rows):
            for j in range(self.cols):
                if i in [0, self.rows - 1] or j in [0, self.cols - 1]:
                    if board[i][j] == "O":
                        self.DFS(i,j)

        # 2. convert all "O" to "X".. These are the "O" that are not in the perimeter of the board
        for i in range(self.rows):
            for j in range(self.cols):
                if board[i][j] == "O":
                    board[i][j] = "X"

        # 3. convert all "T" to "O".. These are the "O" that were in the perimeter of the board that we changed to "T". let's change it back to "O"
        for i in range(self.rows):
            for j in range(self.cols):
                if board[i][j] == "T":
                    board[i][j] = "O"

    # helper function that converts all "O" to "T" on the perimeter of the board
    def DFS(self, r: int, c: int) -> None:
        # return if r, c is out of bounds or board is not an "O"
        if r not in range(self.rows) or c not in range(self.cols) or self.board[r][c] != "O":
            return
           
        # at this point, board[r][c] is "O", so we change it to "T"
        self.board[r][c] = "T"

        # We then dfs to all dirs
        for dir in self.dirs:
            self.DFS(r + dir[0], c + dir[1])

    @staticmethod
    def testSolution(input: Dict[str, List[List[str]]]) -> None:
        print("Input Board:")
        Solution.printBoard(input.get("board"))
        print("Expected Board:")
        Solution.printBoard(input.get("expected"))
        Solution().solve(input.get("board"))
        print("Result Board:")
        Solution.printBoard(input.get("board"))
        print(Result.PASS.value if input.get("board") == input.get("expected") else Result.FAIL.value)

    @staticmethod
    def printBoard(board: List[List[str]]) -> None:
        for i in range(len(board)):
            print("[ ", end="")
            for j in range(len(board[0])):
                print(board[i][j] + " ", end="")
            print("]")
    
if __name__ == "__main__":

    testCases = [
        {"board": [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]], "expected": [["X","X","X","X"],["X","X","X","X"],["X","X","X","X"],["X","O","X","X"]]},
         {"board": [["X"]], "expected":[["X"]]}
         ]

    for i, testCase in enumerate(testCases):
        print(f"Test case {i+1} " )
        Solution.testSolution(testCase)
        print(f"{'-' * 50}" )
    
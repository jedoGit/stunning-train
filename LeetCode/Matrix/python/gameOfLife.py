from typing import List


class Solution:
    def gameOfLife(self, board: List[List[int]]) -> None:
        """
        Do not return anything, modify board in-place instead.
        """
        # This is our state table... we'll represent our state changes like this
        # Old | New | State
        # 0 | 0 | 0
        # 1 | 0 | 1
        # 0 | 1 | 2
        # 1 | 1 | 3

        # This is the number of rows and cols of the matrix
        numRows = len(board)
        numCols = len(board[0])

        # Here, we visit each elements of the matrix and check its neighbors
        # we use our state diagram above to assign values based on its neighbors
        for r in range(numRows):
            for c in range(numCols):
                # First, get the neighbor count of the current cell
                nei = self.countNeighbors(board, r, c, numRows, numCols)
                # If the current cell is not zero
                # we check if it has 2 or 3 neighbors
                if board[r][c] > 0:
                    # If it has 2 or 3 neighbors, we change the value of the current cell to 3
                    # based on the state diagram
                    if nei == 2 or nei == 3:
                        board[r][c] = 3
                elif board[r][c] == 0 and nei == 3: # here, the current element is zero and it has 3 neighbors
                    # We assign a value of 2
                    board[r][c] = 2

        # At this point, we're done assigning values to each cells based on the state
        # diagram
        # now, we're ready to update each cells if they're dead or not... 0 or 1
        for r in range(numRows):
            for c in range(numCols):
                # If the cell was assigned a 1, we set it to zero
                if board[r][c] == 1:
                    board[r][c] = 0
                elif board[r][c] == 2 or board[r][c] == 3: # if a cell is assigned a 2 or a 3, we set it to 1
                    board[r][c] = 1

    # This is our helper function to check the neighbor counts of the cell
    def countNeighbors(self, board, r, c, rows, cols) -> int:
        nei = 0

        # Check each elements of the matrix
        for i in range(r - 1, r + 2):
            for j in range(c - 1, c + 2):
                # Continue if:
                # 1. i,j is r,c
                # 2. i or j is out of bounds, ie negative
                # 3. i or j is out of bounds, ie greater than the matrix length
                if (i == r and j == c) or i < 0 or j < 0 or i == rows or j == cols:
                    continue

                # Check if the matrix elements is equal to 1 or 3, if so,
                # increment nei by 1. This is the neighbor count of the current cell
                if board[i][j] == 1 or board[i][j] == 3:
                    nei += 1
        
        return nei

    @staticmethod
    def testSolution(input) -> None:
        print("Input: board: " + str(input["board"]))
        print("Expected: " + str(input["expected"]))
        Solution().gameOfLife(input["board"])
        print("Result: " + str(input["board"]))
        print("PASS" if input["expected"] == input["board"] else "FAIL")
        print("-" * 50)

if __name__ == "__main__":
    input = {"board": [[0,1,0],[0,0,1],[1,1,1],[0,0,0]], "expected": [[0,0,0],[1,0,1],[0,1,1],[0,1,0]]}
    Solution.testSolution(input)

    input = {"board": [[1,1],[1,0]], "expected": [[1,1],[1,1]]}
    Solution.testSolution(input)
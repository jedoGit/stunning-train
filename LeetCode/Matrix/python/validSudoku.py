from collections import defaultdict
from pprint import pprint
from typing import List


class Solution:
    def isValidSudoku(self, board: List[List[str]]) -> bool:
        # Using hash map to check if there are duplicates in each rows, columns and cells
        cols = defaultdict(set)
        rows = defaultdict(set)
        squares = defaultdict(set)

        # Let's go through each rows and cols, it's a 9x9 matrix
        # A cell is a 3x3 matrix
        for r in range(9):
            for c in range(9):
                # Let's compute which cell the current row and col belong to
                # It works out by using integer division by 3 and we can address each cell
                # For example, r = 0 and c = 0 is cell (0,0); r = 8 and c = 8 is cell (2,2)
                r_ = r//3
                c_ = c//3
                rcPair = (r_, c_)  # make this a tuple

                # If board[r][c] is a dot, it means it's empty, so we continue
                if board[r][c] == '.':
                    continue

                # Here we create the key and value is initialized as an empty set.
                # example: cols[1] = {1,2}, row[3] = {3}, squares[(1,3)] = {1,2,3}
                # We don't need this if we initialize it the defaultdict with set()
                # cols[c] = cols.get(c, set())
                # rows[r] = rows.get(r, set())
                # squares[rcPair] = squares.get(rcPair, set())

                # We get the value for each keys and check if the current r,c pair has duplicates If so, we return false
                if board[r][c] in rows[r] or board[r][c] in cols[c] or board[r][c] in squares[rcPair]:
                    return False
                
                # Now we add each non "." values to our sets, this is to see if we have duplicates
                cols[c].add(board[r][c])
                rows[r].add(board[r][c])
                squares[rcPair].add(board[r][c])

        return True

    @staticmethod
    def testSolution(input) -> None:
        print("Input: board: ")
        pprint(input["board"])
        print("Expected: ", input["expected"])
        val = Solution().isValidSudoku(input["board"])
        print("Result: ", val)
        print("PASS" if val == input["expected"] else "FAIL")
        print("-" * 50)
    
if __name__ == "__main__":
    input = {"board": [["5","3",".",".","7",".",".",".","."],
                       ["6",".",".","1","9","5",".",".","."],
                       [".","9","8",".",".",".",".","6","."],
                       ["8",".",".",".","6",".",".",".","3"],
                       ["4",".",".","8",".","3",".",".","1"],
                       ["7",".",".",".","2",".",".",".","6"],
                       [".","6",".",".",".",".","2","8","."],
                       [".",".",".","4","1","9",".",".","5"],
                       [".",".",".",".","8",".",".","7","9"]], 
            "expected": True}
    Solution.testSolution(input)

    input = {"board": [["8","3",".",".","7",".",".",".","."],
                       ["6",".",".","1","9","5",".",".","."],
                       [".","9","8",".",".",".",".","6","."],
                       ["8",".",".",".","6",".",".",".","3"],
                       ["4",".",".","8",".","3",".",".","1"],
                       ["7",".",".",".","2",".",".",".","6"],
                       [".","6",".",".",".",".","2","8","."],
                       [".",".",".","4","1","9",".",".","5"],
                       [".",".",".",".","8",".",".","7","9"]], 
            "expected": False}
    Solution.testSolution(input)

    input = {"board": [[".",".",".",".","5",".",".","1","."],
                       [".","4",".","3",".",".",".",".","."],
                       [".",".",".",".",".","3",".",".","1"],
                       ["8",".",".",".",".",".",".","2","."],
                       [".",".","2",".","7",".",".",".","."],
                       [".","1","5",".",".",".",".",".","."],
                       [".",".",".",".",".","2",".",".","."],
                       [".","2",".","9",".",".",".",".","."],
                       [".",".","4",".",".",".",".",".","."]], 
            "expected": False}
    Solution.testSolution(input)
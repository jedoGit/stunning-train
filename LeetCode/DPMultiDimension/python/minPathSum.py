from typing import List


class minPathSum:
    def computeMinPathSum(self, grid: List[List[int]]) -> int:
        ROWS = len(grid)
        COLS = len(grid[0])

        res = [[float("inf")] * (COLS + 1) for r in range(ROWS + 1)]
        res[ROWS][COLS-1] = 0

        for r in range(ROWS-1,-1,-1):
            for c in range(COLS-1, -1, -1):
                res[r][c] = grid[r][c] + min(res[r+1][c], res[r][c+1])

        return res[0][0]
    
if __name__ == "__main__":
    obj = minPathSum()

    input1 = [[1,3,1],[1,5,1],[4,2,1]]
    expected1 = 7
    result1 = obj.computeMinPathSum(input1)
    print("Input: {}".format(input1))
    print("Result: {}".format(result1))
    print("Expected: {}".format(expected1))
    print("-" * 50)
    
    
    input2 = [[1,2,3],[4,5,6]]
    expected2 = 12
    result2 = obj.computeMinPathSum(input2)
    print("Input: {}".format(input2))
    print("Result: {}".format(result2))
    print("Expected: {}".format(expected2))
    print("-" * 50)
    
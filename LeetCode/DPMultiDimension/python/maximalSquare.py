from typing import List


class Solution:
    def maximalSquare(self, matrix: List[List[str]]) -> int:

        ROWS = len(matrix)
        COLS = len(matrix[0])
        cache = {} # map each(r,c) -> maxLength of square

        def helper(r,c):
            if r >= ROWS or c >= COLS:
                return 0
            
            if (r,c) not in cache:
                down = helper(r + 1, c)
                right = helper(r, c + 1)
                diag = helper(r + 1, c + 1)

                cache[(r,c)] = 0
                if matrix[r][c]  == "1":
                    cache[(r,c)] = 1 + min(down, right, diag)
            
            return cache[(r,c)]
        
        helper(0,0)
        return max(cache.values()) ** 2
    
    def maximalSquareDP(self, matrix: List[List[str]]) -> int:
        if not matrix:
            return 0
        rows, cols = len(matrix), len(matrix[0])
        dp = [[0] * (cols + 1) for _ in range(rows + 1)] 
        max_side = 0
        for i in range(1, rows + 1):
            for j in range(1, cols + 1):
                if matrix[i - 1][j - 1] == '1':
                    dp[i][j] = min(dp[i - 1][j], dp[i][j - 1],dp[i - 1][j - 1]) + 1
                    max_side = max(max_side, dp[i][j])

        return max_side * max_side

if __name__ == "__main__":
    obj = Solution()

    input1 = {"matrix": [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]}
    expected1 = 4
    result1 = obj.maximalSquareDP(input1["matrix"])
    print("Input: Matrix: {}".format(input1["matrix"]))
    print("Expected: {}".format(expected1))
    print("Result: {}".format(result1))

    input2 = {"matrix": [["0","1"],["1","0"]]}
    expected2 = 1
    result2 = obj.maximalSquareDP(input2["matrix"])
    print("Input: Matrix: {}".format(input2["matrix"]))
    print("Expected: {}".format(expected2))
    print("Result: {}".format(result2))

    input3 = {"matrix": [["0"]]}
    expected3 = 0
    result3 = obj.maximalSquareDP(input3["matrix"])
    print("Input: Matrix: {}".format(input3["matrix"]))
    print("Expected: {}".format(expected3))
    print("Result: {}".format(result3))
from typing import List


class uniquePathsII:
    def uniquePathsWithObstacles(self, obstacleGrid: List[List[int]]) -> int:
        M = len(obstacleGrid)
        N = len(obstacleGrid[0])

        dp = [0] * N
        dp[N-1] = 1

        # Bottoms up DP
        for r in reversed(range(M)):
            for c in reversed(range(N)):
                if obstacleGrid[r][c] == 1:
                    dp[c] = 0
                elif c+1 < N: # here, we're checking if we're not out of bounds
                    dp[c] = dp[c] + dp[c + 1]

        return dp[0]
    
if __name__ == "__main__":
    obj = uniquePathsII()

    input1 = [[0,0,0],[0,1,0],[0,0,0]]
    expected1 = 2
    result1 = obj.uniquePathsWithObstacles(input1)
    print("Input: {}".format(input1))
    print("Result: {}".format(result1))
    print("Expected: {}".format(expected1))
    print("-" * 50)
    
    
    input2 = [[0,1],[0,0]]
    expected2 = 1
    result2 = obj.uniquePathsWithObstacles(input2)
    print("Input: {}".format(input2))
    print("Result: {}".format(result2))
    print("Expected: {}".format(expected2))
    print("-" * 50)
    

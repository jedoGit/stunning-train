# Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.

# An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.

 

# Example 1:

# Input: grid = [
#   ["1","1","1","1","0"],
#   ["1","1","0","1","0"],
#   ["1","1","0","0","0"],
#   ["0","0","0","0","0"]
# ]
# Output: 1
# Example 2:

# Input: grid = [
#   ["1","1","0","0","0"],
#   ["1","1","0","0","0"],
#   ["0","0","1","0","0"],
#   ["0","0","0","1","1"]
# ]
# Output: 3
 

# Constraints:

# m == grid.length
# n == grid[i].length
# 1 <= m, n <= 300
# grid[i][j] is '0' or '1'.

# TC: O(m*n)
# SC: O(m*n)

class Solution:
    def numIslands(self, grid: List[List[str]]) -> int:
        dir = [[-1,0],[1,0],[0,1],[0,-1]]
        m = len(grid)
        n = len(grid[0])
        visited = set()
        count = 0

        def dfs(r,c):
            # base cases
            # if r, c are out of bounds or grid[r][c] is a water, or r,c is a land we visited, we return
            if r not in range(m) or c not in range(n) or grid[r][c] == "0" or (r,c) in visited: return

            # this is a new land so we add r,c to visited as a tuple
            visited.add((r,c))

            # dfs in all directions
            for dr, dc in dir:
                dfs(r + dr, c + dc)        

        for i in range(m):
            for j in range(n):
                # check if it's a land (1) and we've not visited the land
                if grid[i][j] == "1" and (i,j) not in visited:
                    count += 1
                    dfs(i,j)

        return count

        
    # class Solution:
    # def numIslands(self, grid: List[List[str]]) -> int:
    #     dir = [[-1,0],[1,0],[0,1],[0,-1]]
    #     m = len(grid)
    #     n = len(grid[0])
    #     count = 0

    #     def dfs(r,c):
    #         # base cases
    #         # if r, c are out of bounds or if it's a water (0), we return
    #         if r < 0 or r >= m or c < 0 or c >= n or grid[r][c] != "1": 
    #             return
    #         else: 
    #             # this is a land (1) and in in bound. set land (1) to water then dfs on all directions
    #             grid[r][c] = "0"

    #             # dfs in all directions
    #             for dr, dc in dir:
    #                 dfs(r + dr, c + dc)
        

    #     for i in range(m):
    #         for j in range(n):
    #             # check if it's a land (1)
    #             if grid[i][j] == "1":
    #                 count += 1
    #                 dfs(i,j)
                    
    #     return count
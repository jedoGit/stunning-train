from typing import List


class Solution:
    def setZeroes(self, matrix: List[List[int]]) -> None:
        """
        Do not return anything, modify matrix in-place instead.
        """
        numRows = len(matrix)
        numCols = len(matrix[0])
        rowZero = False

        for r in range(numRows):
            for c in range(numCols):
                if matrix[r][c] == 0:
                    matrix[0][c] = 0
                
                    if r > 0:
                        matrix[r][0] = 0
                    else:
                        rowZero = True
        
        for r in range(1, numRows):
            for c in range(1, numCols):
                if matrix[0][c] == 0 or matrix[r][0] == 0:
                    matrix[r][c] = 0
        
        if matrix[0][0] == 0:
            for r in range(numRows):
                matrix[r][0] = 0

        if rowZero:
            for c in range(numCols):
                matrix[0][c] = 0
    
    @staticmethod
    def testSolution(input) -> None:
        print("Input: matrix: {}".format(input["matrix"]))
        print("Expected: {}".format(input["expected"]))
        Solution().setZeroes(input["matrix"])
        print("Result: {}".format(input["matrix"]))
        print(("PASS" if input["expected"] == input["matrix"] else "FAIL"))
        print("-" * 50)

if __name__ == "__main__":
    input = {"matrix": [[1,1,1],[1,0,1],[1,1,1]] , "expected": [[1,0,1],[0,0,0],[1,0,1]]}
    Solution.testSolution(input)

    input = {"matrix": [[0,1,2,0],[3,4,5,2],[1,3,1,5]] , "expected": [[0,0,0,0],[0,4,5,0],[0,3,1,0]]}
    Solution.testSolution(input)
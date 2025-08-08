from typing import List


class Solution:
    def rotate(self, matrix: List[List[int]]) -> None:
        """
        Do not return anything, modify matrix in-place instead.
        """
        cols = len(matrix[0]) 
        rows = len(matrix)

        # First, transpose the matrix, rows become columns and columns become rows
        # We need to transpose in place
        self.transpose(matrix, rows)
        
        # print(matrix)

        # Next, reverse the element in place
        self.reverse(matrix)


    def reverse(self, matrix: List[List[int]]) -> None:
        for row in matrix:
            row.reverse()

    def transpose(self, matrix: List[List[int]], numRows: int) -> None:
        for i in range(numRows):
            for j in range(i + 1, numRows):
                # Using tuple unpacking for direct assignment
                matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]
                
    @staticmethod
    def testSolution(input) -> None:
        print("Input: matrix: ", input["matrix"])
        print("Expected: ", input["expected"])
        Solution().rotate(input["matrix"])
        print("Result: ", input["matrix"])
        print("PASS" if input["matrix"] == input["expected"] else "FAIL")
        print("-" * 50)


if __name__ == "__main__":
    input = {"matrix": [[1,2,3],[4,5,6],[7,8,9]], "expected": [[7,4,1],[8,5,2],[9,6,3]]}
    Solution.testSolution(input)

    input = {"matrix": [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]], "expected": [[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]}
    Solution.testSolution(input)
        
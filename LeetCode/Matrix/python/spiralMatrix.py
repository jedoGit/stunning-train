from typing import List

class Solution:
    def spiralOrder(self, matrix: List[List[int]]) -> List[int]:
        res = []
        left = 0
        right = len(matrix[0])
        top = 0
        bottom = len(matrix)
        
        while left < right and top < bottom:
            # Get every i in the top row
            for i in range(left, right):
                res.append(matrix[top][i])
            top += 1

            # Get every i in the right col
            for i in range(top, bottom):
                res.append(matrix[i][right-1])
            right -= 1
        
            if not (left < right and top < bottom):
                break

            # Get every i in the bottom row
            for i in range(right - 1, left - 1, -1):
                res.append(matrix[bottom-1][i])
            bottom -= 1

            # Get every i in the left col
            for i in range(bottom - 1, top - 1, -1):
                res.append(matrix[i][left])
            left += 1
        
        return res

    @staticmethod
    def testSolution(input) -> None:
        print("Input: Matrix: ")
        print(input["matrix"])
        print("Expected: ")
        print(input["expected"])
        retVal = Solution().spiralOrder(input["matrix"])
        print("Result: ")
        print(retVal)
        print("PASS" if retVal == input["expected"] else "FAIL")
        print("-" * 50)

if __name__ == "__main__":
    input = {"matrix": [[1,2,3],
                        [4,5,6],
                        [7,8,9]],
            "expected": [1,2,3,6,9,8,7,4,5]}
    Solution.testSolution(input)

    input = {"matrix": [[1,2,3,4],
                        [5,6,7,8],
                        [9,10,11,12]], 
            "expected": [1,2,3,4,8,12,11,10,9,5,6,7]}
    Solution.testSolution(input)

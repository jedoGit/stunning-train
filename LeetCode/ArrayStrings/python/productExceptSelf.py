from typing import List


class Solution:
    def productExceptSelf(self, nums: List[int]) -> List[int]:
        n = len(nums)
        left = [1] * n
        right = [1] * n

        for i in range(1,n):
            left[i] = left[i-1] * nums[i-1]
        
        for i in range(n-2, -1, -1):
            right[i] = right[i+1] * nums[i+1]

        retval = [0] * n

        for i in range(0, n):
            retval[i] = left[i] * right[i]

        return retval

    @staticmethod
    def testSolution(input) -> None:
        print("Input: nums: {}".format(input["nums"]))
        print("Expected: {}".format(input["expected"]))
        print("Result: {}".format(Solution().productExceptSelf(input["nums"])))
        print("-" * 50)


if __name__ == "__main__":
    input = {"nums": [1,2,3,4], "expected": [24,12,8,6]}
    Solution.testSolution(input)
    input = {"nums": [-1,1,0,-3,3], "expected": [0,0,9,0,0]}
    Solution.testSolution(input)
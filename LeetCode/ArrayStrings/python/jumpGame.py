from typing import List


class Solution:
    def canJump(self, nums: List[int]) -> bool:
        n = len(nums)
        goal = n - 1

        for i in range(n-1, -1, -1 ):
            if i + nums[i] >= goal:
                goal = i

        return True if goal == 0 else False
    
    @staticmethod
    def testSolution(input) -> None:
        print("Input: {}".format(input["nums"]))
        print("Expected: {}".format(input["expected"]))
        print("Result: {}".format(Solution().canJump(input["nums"])))
        print("-" * 50)


if __name__ == "__main__":
    input = { "nums" : [3,2,1,0,4], "expected" : False}
    Solution.testSolution(input)
    input = { "nums" : [2,3,1,1,4], "expected" : True}
    Solution.testSolution(input)

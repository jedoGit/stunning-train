from typing import List


class Solution:
    def jump(self, nums: List[int]) -> int:
        n = len(nums)
        res = 0
        l = 0
        r = 0

        while r < n-1:
            farthest = 0

            for i in range(l, r + 1):
                farthest = max(farthest, i + nums[i])
            
            l = r + 1
            r = farthest

            res += 1

        return res
    
    @staticmethod
    def testSolution(input):
        print("Input: nums: {}".format(input["nums"]))
        print("Expected: {}".format(input["expected"]))
        print("Result: {}".format(Solution().jump(input["nums"])))
        print("-" * 50)


if __name__ == "__main__":
    input = {"nums" : [2,3,1,1,4], "expected" : 2}
    Solution.testSolution(input)
    
    input = {"nums" : [2,3,0,1,4], "expected" : 2}
    Solution.testSolution(input)
from typing import List


class Solution:
    def threeSum(self, nums: List[int]) -> List[List[int]]:
        res = []
        n = len(nums)
        nums.sort()

        for i in range(0, n):
            a = nums[i]

            if i > 0 and a == nums[i - 1]:
                continue
        
            l = i + 1
            r = n - 1

            while l < r:
                threeSum = a + nums[l] + nums[r]

                if threeSum > 0:
                    r -= 1
                elif threeSum < 0:
                    l += 1
                else:
                    res.append([a, nums[l], nums[r]])
                    l += 1
                    while nums[l] == nums[l - 1] and l < r:
                        l += 1

        return res

    @staticmethod
    def testSolution(input) -> None:
        print("Input: nums: {}".format(input["nums"]))
        print("Expected: {}".format(input["expected"]))
        val = Solution().threeSum(input["nums"])
        print("Result: {}".format(val))
        print("{}".format("PASS" if val == input["expected"] else "FAIL"))
        print("-" * 50)

if __name__ == "__main__":
    input = {"nums": [-1,0,1,2,-1,-4], "expected": [[-1,-1,2],[-1,0,1]]}
    Solution.testSolution(input)

    input = {"nums": [0,1,1], "expected": []}
    Solution.testSolution(input)

    input = {"nums": [0,0,0], "expected": [[0,0,0]]}
    Solution.testSolution(input)

    input = {"nums": [2,-3,0,-2,-5,-5,-4,1,2,-2,2,0,2,-4,5,5,-10], "expected": [[-10,5,5],[-5,0,5],[-4,2,2],[-3,-2,5],[-3,1,2],[-2,0,2]]}
    Solution.testSolution(input)
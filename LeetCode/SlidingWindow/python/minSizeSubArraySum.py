from typing import List


class Solution:
    def minSubArrayLen(self, target: int, nums: List[int]) -> int:
        if len(nums) == 0:
            return 0

        l = 0
        totalSum = 0
        res = float('inf')
        n = len(nums)

        # We'll move the right pointer and each time we move the right pointer,
        # we need to add to the sum
        for r in range(0, n):
            totalSum += nums[r]

            # We need to check if the sum we have in our window is >= target
            while totalSum >= target:
                # For each iterations, we need to update the res
                res = min(r - l + 1, res)

                # We need to shrink our window and move l pointer to the right
                # Each time we move l pointer, we need to remove num[l] from the totalSum
                totalSum -= nums[l]
                l += 1

        return 0 if res == float('inf') else res

    @staticmethod
    def testSolution(input) -> None:
        print("Input: target: {}".format(input["target"]))
        print("Input: nums: {}".format(input["nums"]))
        print("Input: expected: {}".format(input["expected"]))
        val = Solution().minSubArrayLen(input["target"], input["nums"])
        print("Result: {}".format(val))
        print(("PASS" if val == input["expected"] else "FAIL"))
        print("-" * 50)

if __name__ == "__main__":
    input = {"target": 7, "nums": [2,3,1,2,4,3], "expected": 2}
    Solution.testSolution(input)

    input = {"target": 4, "nums": [1,4,4], "expected": 1}
    Solution.testSolution(input)
    
    input = {"target": 11, "nums": [1,1,1,1,1,1,1,1], "expected": 0}
    Solution.testSolution(input)
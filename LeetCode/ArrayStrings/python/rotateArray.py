from typing import List


class Solution:
    def rotate(self, nums: List[int], k: int) -> None:
        """
        Do not return anything, modify nums in-place instead.
        """
        k %= len(nums)

        self.reverse(nums, 0, len(nums) - 1)
        self.reverse(nums, 0, k - 1)
        self.reverse(nums, k, len(nums) - 1)

    def reverse(self, nums: List[int], start: int, end: int) -> None:
        while start < end:
            tmp = nums[start]
            nums[start] = nums[end]
            nums[end] = tmp
            start += 1
            end -= 1
    
    def testSolution(self, nums: List[int], k: int, expected: List[int]) -> None:
        print("Input: nums: {}, k: {}".format(nums, k))
        print("Expected: {}".format(expected))
        self.rotate(nums, k)
        print("Result: {}".format(nums))
        print("-" * 50)

if __name__ == "__main__":
    obj = Solution()

    input = {"nums": [1,2,3,4,5,6,7], "k": 3, "expected": [5,6,7,1,2,3,4]}
    obj.testSolution(input["nums"], input["k"], input["expected"])

    input = {"nums": [-1,-100,3,99], "k": 2, "expected": [3,99,-1,-100]}
    obj.testSolution(input["nums"], input["k"], input["expected"])
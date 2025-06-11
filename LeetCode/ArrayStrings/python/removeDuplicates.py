from typing import List


class Solution:
    def removeDuplicates(self, nums: List[int]) -> int:
        l = 0
        r = 0
        n = len(nums)

        while r < n:
            count = 1

            while (r + 1 < n) and (nums[r] == nums[r + 1]):
                r += 1 
                count += 1

            for i in range(min(1, count)):
                nums[l] = nums[r]
                l += 1
            
            r += 1

        return l

if __name__ == "__main__":
    obj = Solution()

    input = {"nums" : [1,1,2], "expected" : [1,2]}
    print("Input: nums: {}".format(input["nums"]))
    print("Expected: {}".format(input["expected"]))
    k = obj.removeDuplicates(input["nums"])
    print("Result: {}".format(input["nums"][0:k]))
    print("-" * 50)

    input = {"nums" : [0,0,1,1,1,2,2,3,3,4], "expected" : [0,1,2,3,4]}
    print("Input: nums: {}".format(input["nums"]))
    print("Expected: {}".format(input["expected"]))
    k = obj.removeDuplicates(input["nums"])
    print("Result: {}".format(input["nums"][0:k]))
    print("-" * 50)
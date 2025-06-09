from typing import List


class Solution:
    def removeElement(self, nums: List[int], val: int) -> int:
        iCnt = 0

        for num in nums:
            if num != val:
                nums[iCnt] = num
                iCnt += 1

        return iCnt



if __name__ == "__main__":
    obj = Solution()
    input = {"nums":[3,2,2,3], "val":3, "expected":[2,2]}

    print("Input: nums: {}, val: {}".format(input["nums"], input["val"]))
    print("Expected: {}".format(input["expected"]))
    k = obj.removeElement(input["nums"], input["val"])
    print("Result: {}".format(input["nums"][0:k]))
    print("-" * 50)

    input = {"nums":[0,1,2,2,3,0,4,2], "val":2, "expected":[0,1,4,0,3]}
    print("Input: nums: {}, val: {}".format(input["nums"], input["val"]))
    print("Expected: {}".format(input["expected"]))
    k = obj.removeElement(input["nums"], input["val"])
    print("Result: {}".format(input["nums"][0:k]))
    print("-" * 50)



from typing import List


class Solution:
    def majorityElement(self, nums: List[int]) -> int:
        res = 0
        count = 0
        
        for num in nums:
            if count == 0:
                res = num
            count += (1 if num == res else -1)

        return res


if __name__ == "__main__":
    obj = Solution()
    input = {"nums": [3,2,3], "expected": 3}

    print("Input: nums: {}".format(input["nums"]))
    print("Expected: {}".format(input["expected"]))
    print("Result: {}".format(obj.majorityElement(input["nums"])))
    print("-" * 50)

    input = {"nums": [2,2,1,1,1,2,2], "expected": 2}
    print("Input: nums: {}".format(input["nums"]))
    print("Expected: {}".format(input["expected"]))
    print("Result: {}".format(obj.majorityElement(input["nums"])))
    print("-" * 50)



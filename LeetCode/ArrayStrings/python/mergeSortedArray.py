from typing import List


class Solution:
    def merge(self, nums1: List[int], m: int, nums2: List[int], n: int) -> None:
        """
        Do not return anything, modify nums1 in-place instead.
        """

        i = m
        for j in range(n):
            nums1[i] = nums2[j]
            i +=1
        
        nums1.sort()



if __name__ == "__main__":
    obj = Solution()

    input = {"nums1": [1,2,3,0,0,0], "m": 3, "nums2": [2,5,6], "n": 3, "expected": [1,2,2,3,5,6]}
    print("Input: nums1: {}, m: {}, nums2: {}, n: {}".format(input["nums1"], input["m"], input["nums2"], input["n"]))
    print("Expected: {}".format(input["expected"]))
    obj.merge(input["nums1"], input["m"], input["nums2"], input["n"])
    print("Result: {}".format(input["nums1"]))
    print("-" * 50)

    input = {"nums1": [1], "m": 1, "nums2": [], "n": 0, "expected": [1]}
    print("Input: nums1: {}, m: {}, nums2: {}, n: {}".format(input["nums1"], input["m"], input["nums2"], input["n"]))
    print("Expected: {}".format(input["expected"]))
    obj.merge(input["nums1"], input["m"], input["nums2"], input["n"])
    print("Result: {}".format(input["nums1"]))
    print("-" * 50)

    input = {"nums1": [0], "m": 0, "nums2": [1], "n": 1, "expected": [1]}
    print("Input: nums1: {}, m: {}, nums2: {}, n: {}".format(input["nums1"], input["m"], input["nums2"], input["n"]))
    print("Expected: {}".format(input["expected"]))
    obj.merge(input["nums1"], input["m"], input["nums2"], input["n"])
    print("Result: {}".format(input["nums1"]))
    print("-" * 50)

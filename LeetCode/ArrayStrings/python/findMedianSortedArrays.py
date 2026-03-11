from dataclasses import dataclass
from enum import Enum
from typing import List

class Result(Enum):
    PASS = "\033[92mPASS\033[00m"
    FAIL = "\033[91mFAIL\033[00m"

@dataclass
class findMedianSortedArraysRecord:
    nums1: List[int]
    nums2: List[int]
    expected: float

class Solution:
    def findMedianSortedArrays(self, nums1: List[int], nums2: List[int]) -> float:
        # Use A for the smaller array to ensure O(log(min(m, n)))
        A, B = nums1, nums2
        if len(B) < len(A):
            A, B = B, A

        total = len(A) + len(B)
        half = total // 2
        
        # Change: Use 0 to len(A) to handle boundaries better
        l, r = 0, len(A)

        while l <= r:
            # mid is the number of elements we take from A
            # (i.e., the split point index)
            i = (l + r) // 2 
            j = half - i - (1 if total % 2 else 0) # Adjust for odd/even if needed, 
                                                   # but your 'half - i - 2' logic was close.
                                                   # Let's use a cleaner index mapping:
            
            # Re-calculating j based on the split point i
            j = half - i 

            # Boundary values
            # i is the index of the first element in the RIGHT part of A
            Aleft = A[i - 1] if i > 0 else float("-inf")
            Aright = A[i] if i < len(A) else float("inf")
            Bleft = B[j - 1] if j > 0 else float("-inf")
            Bright = B[j] if j < len(B) else float("inf")

            # Check if partition is correct
            if Aleft <= Bright and Bleft <= Aright:
                # Odd
                if total % 2:
                    return min(Aright, Bright)
                # Even
                return (max(Aleft, Bleft) + min(Aright, Bright)) / 2.0
            
            elif Aleft > Bright:
                r = i - 1
            else:
                l = i + 1

    @staticmethod
    def testSolution(record: findMedianSortedArraysRecord) -> None: 
        print(f"input:\tnums1: {record.nums1}")
        print(f"\tnums2: {record.nums2}")
        print(f"expected: {record.expected: .5f}")
        
        res: float = Solution().findMedianSortedArrays(record.nums1, record.nums2)
        print(f"result: {res: .5f}")
        print(Result.PASS.value if res == record.expected else Result.FAIL.value)

if __name__ == "__main__":
    records: List[findMedianSortedArraysRecord] = [
        findMedianSortedArraysRecord([1,3], [2], 2.00000),
        findMedianSortedArraysRecord([1,2], [3,4], 2.50000)
    ]

    for i, record in enumerate(records):
        print(f"# Test case {i + 1}")
        Solution.testSolution(record)
        print("-" * 50)
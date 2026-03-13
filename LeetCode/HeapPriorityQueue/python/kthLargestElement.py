from dataclasses import dataclass
from enum import Enum
import heapq
from typing import List

class Result(Enum):
    PASS = "\033[92mPASS\033[00m"
    FAIL = "\033[91mFAIL\033[00m"

@dataclass
class findKthLargestRecord:
    nums: List[int]
    k: int
    expected: float

class Solution:
    def findKthLargest(self, nums: List[int], k: int) -> int:
        h_min: heapq = heapq
        heap: List[int] = []

        for el in nums[0:k]:
            h_min.heappush(heap, el)

        for el in nums[k:]:
            if el > heap[0]:
                h_min.heappop(heap)
                h_min.heappush(heap, el)

        return heap[0]

    @staticmethod
    def testSolution(record: findKthLargestRecord) -> None:
        print(f"input:\tnums: {record.nums}")
        print(f"\tk: {record.k}")
        print(f"expected: {record.expected}")

        res: int = Solution().findKthLargest(record.nums, record.k)

        print(f"result: {res}")
        print(Result.PASS.value if res == record.expected else Result.FAIL.value)

if __name__ == "__main__":
    records: findKthLargestRecord = [
        findKthLargestRecord([3,2,1,5,6,4], 2, 5 ),
        findKthLargestRecord([3,2,3,1,2,4,5,5,6], 4, 4)
    ]

    for i, record in enumerate(records):
        print(f"# Test case {i + 1}")
        Solution.testSolution(record)
        print("-" * 50)
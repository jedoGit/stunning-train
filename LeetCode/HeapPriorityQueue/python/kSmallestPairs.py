from dataclasses import dataclass, field
from enum import Enum
import heapq
from typing import List, Set, Tuple

class Result(Enum):
    PASS = "\033[92mPASS\033[00m"
    FAIL = "\033[91mFAIL\033[00m"

@dataclass
class kSmallestPairsRecord:
    nums1: List[int]
    nums2: List[int]
    k: int
    expected: List[List[int]]

# order=True automatically generates comparison methods based on field order
@dataclass(order=True)
class recordPair:
    sumVal: int # This field will be use for comparison (priority) because it's first in the order
    i: int = field(compare=False) # field will be ignored in comparison
    j: int = field(compare=False) # field will be ignored in comparison

class Solution:
    def kSmallestPairs(self, nums1: List[int], nums2: List[int], k: int) -> List[List[int]]:
        res: List[List[int]] = []

        if len(nums1) == 0 or len(nums2) == 0 or k == 0:
            return res
        
        # push to heap: [sum(nums1[0], nums2[0]), 0, 0] => [s, i, j] => we're using s as the index for comparison in the heap
        # Since we define our record pair with order=True, it automatically creates comparison methods. For min heap, we don't 
        # need to override the LT method. heapq library will automatically use sumVal field which is first field in the dataclass
        # for comparison to determin priority of the record pair.
        h_min: heapq = heapq 
        heap: List[recordPair] = []
        visited: Set[Tuple[int]] = set()

        h_min.heappush(heap, recordPair(nums1[0] + nums2[0], 0, 0))
        visited.add((0, 0))

        while k > 0 and len(heap) > 0:
            record: recordPair = h_min.heappop(heap)

            i: int = record.i
            j: int = record.j

            res.append([nums1[i], nums2[j]])

            if i + 1 < len(nums1) and (i + 1, j) not in visited:
                h_min.heappush(heap, recordPair(nums1[i + 1] + nums2[j], i + 1, j))
                visited.add((i + 1, j))

            if j + 1 < len(nums2) and (i, j + 1) not in visited:
                h_min.heappush(heap, recordPair(nums1[i] + nums2[j + 1], i, j + 1))
                visited.add((i, j + 1))

            k -= 1

        return res

    @staticmethod
    def testSolution(record: kSmallestPairsRecord) -> None:
        print(f"input:\tnums1: {record.nums1}")
        print(f"\tnums2: {record.nums2}")
        print(f"\tk: {record.k}")
        print(f"expected: {record.expected}")

        res: List[List[int]] = Solution().kSmallestPairs(record.nums1, record.nums2, record.k)
        print(f"result: {res}")
        print(Result.PASS.value if res == record.expected else Result.FAIL.value)

if __name__ == "__main__":
    records: List[kSmallestPairsRecord] = [
        kSmallestPairsRecord([1,7,11], [2,4,6], 3, [[1,2],[1,4],[1,6]]),
        kSmallestPairsRecord([1,1,2], [1,2,3], 2, [[1,1],[1,1]])
    ]

    for i, record in enumerate(records):
        print(f"# Test case {i + 1}")
        Solution.testSolution(record)
        print("-" * 50)

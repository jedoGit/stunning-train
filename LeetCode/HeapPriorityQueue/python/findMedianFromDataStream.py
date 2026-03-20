from dataclasses import dataclass
from enum import Enum
import heapq
from typing import List


class Result(Enum):
    PASS = "\033[92mPASS\033[00m"
    FAIL = "\033[91mFAIL\033[00m"

@dataclass
class medianFinderRecord:
    operation: List[str]
    value: List[List[int]]
    expected: List[str]

class MedianFinder:

    def __init__(self):
        self.my_heapq = heapq # priority queue library
        self.heap_max: List[int] = [] # will be used to store the max priority queue
        self.heap_min: List[int] = [] # will be used to store the min priority queue

    def addNum(self, num: int) -> None:
        self.my_heapq.heappush(self.heap_min, num)

        min_val: int = self.my_heapq.heappop(self.heap_min)
        self.my_heapq.heappush_max(self.heap_max, min_val)

        if len(self.heap_min) < len(self.heap_max):
            maxVal: int = self.my_heapq.heappop_max(self.heap_max)
            self.my_heapq.heappush(self.heap_min, maxVal)

    def findMedian(self) -> float:
        if len(self.heap_min) > len(self.heap_max):
            return self.heap_min[0]
        else:
            mean: float = (self.heap_min[0] + self.heap_max[0]) / 2.0
            return mean

    @staticmethod
    def testSolution(record: medianFinderRecord) -> None:
        print(f"input:\toperations: {record.operation}")
        print(f"\tvalues: {record.value}")
        print(f"expected: {record.expected}")

        obj: MedianFinder = None
        res: List[str] = []

        for i, operation in enumerate(record.operation):
            if operation == "MedianFinder":
                obj = MedianFinder()
                res.append("null")
            elif operation == "addNum":
                obj.addNum(record.value[i][0])
                res.append("null")
            elif operation == "findMedian":
                tmp: float = obj.findMedian()
                formattedVal = f"{tmp:.5f}"
                res.append(formattedVal)
        
        print(f"result: {res}")
        print(Result.PASS.value if res == record.expected else Result.FAIL.value)

# Your MedianFinder object will be instantiated and called as such:
# obj = MedianFinder()
# obj.addNum(num)
# param_2 = obj.findMedian()

if __name__ == "__main__":
    records: List[medianFinderRecord] = [
        medianFinderRecord(
            ["MedianFinder","addNum","addNum","findMedian","addNum","findMedian"],
            [[],[1],[2],[],[3],[]],
            ["null","null","null","1.50000","null","2.00000"]
        )
    ]

    for i, record in enumerate(records):
        print(f"# Test case {i + 1}")
        MedianFinder.testSolution(record)
        print("-" * 50)
from dataclasses import dataclass
from enum import Enum
import heapq
from typing import List

class Result(Enum):
    PASS = "\033[92mPASS\033[00m"
    FAIL = "\033[91mFAIL\033[00m"

@dataclass
class findMaximizedCapitalRecord:
    k: int
    w: int
    profits: List[int]
    capital: List[int]
    expected: int

@dataclass
class projectsRecord:
    capital: int
    profits: int

class Solution:
    def findMaximizedCapital(self, k: int, w: int, profits: List[int], capital: List[int]) -> int:
        n: int = len(profits)
        projects: List[projectsRecord] = []

        for i in range(n):
            projects.append(projectsRecord(capital[i], profits[i]))
        
        projects.sort(key=lambda r: r.capital, reverse=False) # Sort in place by capital in ascending order

        h_max: heapq = heapq
        heap: List[int] = []

        i: int = 0

        while k > 0:
            while i < n and projects[i].capital <= w:
                h_max.heappush_max(heap, projects[i].profits) # max heap
                i += 1
            
            if len(heap) < 1:
                return w
            
            w += h_max.heappop_max(heap)
            k -= 1
        
        return w

    @staticmethod
    def testSolution(record: findMaximizedCapitalRecord) -> None:
        print(f"input:\tk: {record.k}")
        print(f"\tw: {record.w}")
        print(f"\tprofits: {record.profits}")
        print(f"\tcapital: {record.capital}")

        res: int = Solution().findMaximizedCapital(record.k, record.w, record.profits, record.capital)
        print(f"result: {res}")

        print(Result.PASS.value if res == record.expected else Result.FAIL.value)

if __name__ == "__main__":
    records: List[findMaximizedCapitalRecord] = [
        findMaximizedCapitalRecord(2, 0, [1,2,3], [0,1,1], 4),
        findMaximizedCapitalRecord(3, 0, [1,2,3], [0,1,2], 6),
    ]

    for i, record in enumerate(records):
        print(f"# Test case {i + 1}")
        Solution.testSolution(record)
        print("-" * 50)
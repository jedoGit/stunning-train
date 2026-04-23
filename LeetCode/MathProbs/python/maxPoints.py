# Given an array of points where points[i] = [xi, yi] represents a point on the X-Y plane, return the maximum number of points that lie on the same straight line.

 

# Example 1:


# Input: points = [[1,1],[2,2],[3,3]]
# Output: 3
# Example 2:


# Input: points = [[1,1],[3,2],[5,3],[4,1],[2,3],[1,4]]
# Output: 4
 

# Constraints:

# 1 <= points.length <= 300
# points[i].length == 2
# -104 <= xi, yi <= 104
# All the points are unique.



import collections
from dataclasses import dataclass
from enum import Enum
from typing import List, Tuple

class Result(Enum):
    PASS = "\033[92mPASS\033[00m"
    FAIL = "\033[91mFAIL\033[00m"

@dataclass
class MaxPointInLineRecord:
    points: List[List[int]]
    expected: int

class MaxPointInLine:
    def maxPoints(self, points: List[List[int]]) -> int:
        res = 1 
        for i in range(len(points)):
            p1 = points[i]
            count = collections.defaultdict(int)
            for j in range(i+1, len(points)):
                p2 = points[j]
                if p2[0] == p1[0]:
                    slope = float("inf")
                else:
                    slope = (p2[1] - p1[1]) / (p2[0] - p1[0])
                
                count[slope] += 1
                res = max(res, count[slope] + 1)
        return res
    
    @staticmethod
    def testSolution(record: MaxPointInLineRecord) -> None:
        print(f"input: points: {record.points}")
        print(f"expected: {record.expected}")

        res: int = MaxPointInLine().maxPoints(record.points)

        print(f"result: {res}")
        print(Result.PASS.value if res == record.expected else Result.FAIL.value)
            
if __name__ == "__main__":

    records: Tuple[MaxPointInLineRecord] = (
        MaxPointInLineRecord([[1,1],[2,2],[3,3]], 3),
        MaxPointInLineRecord([[1,1],[3,2],[5,3],[4,1],[2,3],[1,4]], 4)
    )

    for i, record in enumerate(records):
        print(f"# Test case {i + 1}")
        MaxPointInLine.testSolution(record)
        print("-" * 50)

    
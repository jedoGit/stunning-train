from typing import Dict, List


class Solution:
    def findMinArrowShots(self, points: List[List[int]]) -> int:
        start = 0
        end = 1

        points.sort(key=lambda x: x[0])
        res = len(points)

        prev = points[0]

        for i in range(1, len(points)):
            cur = points[i]

            if cur[start] <= prev[end]:
                res -= 1
                prev = [cur[start], min(cur[end], prev[end])]
            else:
                prev = cur

        return res
    
    @staticmethod
    def testSolution(input: Dict[str, List[List[int]] | int]) -> None:
        print("Input: points: " + str(input["points"]))
        print("Expected: " + str(input["expected"]))
        res = Solution().findMinArrowShots(input["points"])
        print("Result: " + str(res))
        print("PASS" if res == input["expected"] else "FAIL")
        print("-" * 50)
    
if __name__ == "__main__":
    input = {"points": [[10,16],[2,8],[1,6],[7,12]], "expected": 2}
    Solution.testSolution(input)

    input = {"points": [[1,2],[3,4],[5,6],[7,8]], "expected": 4}
    Solution.testSolution(input)

    input = {"points": [[1,2],[2,3],[3,4],[4,5]], "expected": 2}
    Solution.testSolution(input)
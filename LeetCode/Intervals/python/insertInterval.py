from typing import Dict, List


class Solution:
    def insert(self, intervals: List[List[int]], newInterval: List[int]) -> List[List[int]]:
        res = []
        start = 0
        end = 1

        for i in range(len(intervals)):
            if newInterval[end] < intervals[i][start]:
                res.append(newInterval)
                # print("list comprehension")
                # print("Res:" + str(res))
                # print("intervals[i:]: " + str(intervals[i:]))
                return [el for el in res] + intervals[i:] # using list comprehension
            elif newInterval[start] > intervals[i][end]:
                res.append(intervals[i])
            else:
                newInterval = [min(newInterval[start], intervals[i][start]), max(newInterval[end], intervals[i][end])]

        res.append(newInterval)

        return res
    
    @staticmethod
    def testSolution(input: Dict[str, List[List[int]]] | List[int]) -> None:
        print("Input: intervals: " + str(input["intervals"]))
        print("newInterval: " + str(input["newInterval"]))
        print("Expected: " + str(input["expected"]))
        res = Solution().insert(input["intervals"], input["newInterval"])
        print("Result: " + str(res))
        print("PASS" if res == input["expected"] else "FAIL")
        print("-" * 50)
    
if __name__ == "__main__":
    input = {"intervals": [[1,3],[6,9]], "newInterval": [2,5], "expected": [[1,5],[6,9]]}
    Solution.testSolution(input)

    input = {"intervals": [[1,2],[3,5],[6,7],[8,10],[12,16]], "newInterval": [4,8], "expected": [[1,2],[3,10],[12,16]]}
    Solution.testSolution(input)
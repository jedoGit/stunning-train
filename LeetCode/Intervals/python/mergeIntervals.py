from typing import Dict, List


class Solution:
    def merge(self, intervals: List[List[int]]) -> List[List[int]]:
        # print(intervals)
        intervals.sort(key=lambda x: x[0]) # sort by element zero of the internal list
        # print(intervals)
        merged = []
        # Initialize the output array with the first element in the sorted intervals array
        prev = intervals[0]

        for interval in intervals[1:]:
            if interval[0] <= prev[1]:
                prev[1] = max(prev[1], interval[1])
            else:
                merged.append(prev)
                prev = interval

        merged.append(prev)
        
        return merged
    
    @staticmethod
    def testSolution(input: Dict[str, List[List[int]]]) -> None:
        print("Input: nums: " + str(input["intervals"]) )
        print("Expected: " + str(input["expected"]))
        res = Solution().merge(input["intervals"])
        print("Result: " + str(res))
        print("PASS" if res == input["expected"] else "FAIL")
        print("-" * 50)
    

if __name__ == "__main__":
    input = {"intervals": [[1,3],[2,6],[8,10],[15,18]], "expected": [[1,6],[8,10],[15,18]]}
    Solution.testSolution(input)

    input = {"intervals": [[1,4],[4,5]], "expected": [[1,5]]}
    Solution.testSolution(input)
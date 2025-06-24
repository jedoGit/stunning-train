from typing import List


class Solution:
    def hIndex(self, citations: List[int]) -> int:
        n = len(citations)
        paper_counts = [0] * (n+1)
        
        for c in citations:
            paper_counts[min(n,c)] = paper_counts[min(n,c)] + 1

        h = n
        papers = paper_counts[n]

        while papers < h:
            h -= 1
            papers += paper_counts[h]

        return h

    @staticmethod
    def testSolution(input) -> None:
        print("Input: citations: {}".format(input["citations"]))
        print("Expected: {}".format(input["expected"]))
        print("Result: {}".format(Solution().hIndex(input["citations"])))

    
if __name__ == "__main__":
    input = {"citations": [3,0,6,1,5], "expected": 3}
    Solution.testSolution(input)
    input = {"citations": [1,3,1], "expected": 1}
    Solution.testSolution(input)
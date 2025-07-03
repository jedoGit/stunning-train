from typing import List


class Solution:
    def candy(self, ratings: List[int]) -> int:
        n = len(ratings)
        candies = [1] * n

        for i in range(1, n):
            if ratings[i-1] < ratings[i]:
                candies[i] = candies[i-1] + 1
        
        for i in range(n-2, -1, -1):
            if ratings[i] > ratings[i+1]:
                candies[i] = max(candies[i], candies[i+1] + 1)

        return sum(candies)
    
    @staticmethod
    def testSolution(input) -> None:
        print("Input: ratings {}".format(input["ratings"]))
        print("Expected: {}".format(input["expected"]))
        print("Result: {}".format(Solution().candy(input["ratings"])))
        print("-" * 50)

if __name__ == "__main__":
    input = {"ratings": [1,0,2], "expected": 5}
    Solution.testSolution(input)
    input = {"ratings": [1,2,2], "expected": 4}
    Solution.testSolution(input)
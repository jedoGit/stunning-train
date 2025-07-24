from typing import List


class Solution:
    def maxArea(self, height: List[int]) -> int:
        lp = 0
        rp = len(height) - 1
        max_area = 0

        while lp < rp:
            h = min(height[lp], height[rp])
            w = rp - lp
            current_area = h * w
            max_area = max(max_area, current_area)

            if height[lp] < height[rp]:
                lp += 1
            else:
                rp -= 1

        return max_area

    @staticmethod
    def testSolution(input) -> None:
        print("Input: {}".format(input["height"]))
        print("Expected: {}".format(input["expected"]))
        val = Solution().maxArea(input["height"])
        print("Result: {}, {}".format(val, ("Correct" if  val == input["expected"] else "Wrong")))
        print("-" * 50)

if __name__ == "__main__":
    input = {"height": [1,8,6,2,5,4,8,3,7], "expected": 49}
    Solution.testSolution(input)

    input = {"height": [1,1], "expected": 1}
    Solution.testSolution(input)
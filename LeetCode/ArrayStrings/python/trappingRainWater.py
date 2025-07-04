from typing import List


class Solution:
    def trap(self, height: List[int]) -> int:

        if not len(height):
            return 0
        
        n = len(height)
        l = 0
        r = n-1
        lMax = height[l]
        rMax = height[r]
        res = 0

        while (l < r):
            if (lMax < rMax):
                l += 1
                lMax = max(lMax, height[l])
                res += lMax - height[l]
            else:
                r -= 1
                rMax = max(rMax, height[r])
                res += rMax - height[r]

        return res

    @staticmethod
    def testSolution(input) -> None:
        print("Input; height: {}".format(input["height"]))
        print("Expected: {}".format(input["expected"]))        
        print("Result: {}".format(Solution().trap(input["height"])))
        print("-" * 50)



if __name__ == "__main__":
    input = {"height": [0,1,0,2,1,0,1,3,2,1,2,1], "expected": 6}
    Solution.testSolution(input)

    input = {"height": [4,2,0,3,2,5], "expected": 9}
    Solution.testSolution(input)
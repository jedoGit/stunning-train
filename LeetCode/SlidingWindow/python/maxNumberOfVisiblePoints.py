import math
from typing import List


class Solution:
    def visiblePoints(self, points: List[List[int]], angle: int, location: List[int]) -> int:
        candidateAngles = []
        
        for (x,y) in points:
            if not (x == location[0] and y == location[1]):
                a = math.atan2((y-location[1]),(x-location[0])) * 180 / math.pi
                candidateAngles.append(a)
                
        candidateAngles.sort()
        # print(candidateAngles)

        onCenterCount = len(points) - len(candidateAngles)
        # print(onCenterCount)
        
        for a in candidateAngles:
            if a < 0:
                candidateAngles.append(a + 360)

        # print(candidateAngles)

        r = 0
        l = 0
        res = 0

        while ( r < len(candidateAngles) ):
            while( candidateAngles[r] - candidateAngles[l] > float(angle) ):
                l += 1
            res = max(res, r-l+1)
            r += 1
        
        return res + onCenterCount
    
    @staticmethod
    def testSolution(input) -> None:
        print("Input: points: {}".format(input["points"]))
        print("Input: angle: {}".format(input["angle"]))        
        print("Input: location: {}".format(input["location"]))
        print("Expected: {}".format(input["expected"]))
        val = Solution().visiblePoints(input["points"], input["angle"], input["location"])
        print("Result: {}".format(val) )
        print( "PASS" if val == input["expected"] else "FAIL")
        print("-" * 50)
    

if __name__ == "__main__":
    input = {"points": [[2,1],[2,2],[3,3]], "angle": 90, "location": [1,1], "expected": 3}
    Solution.testSolution(input)

    input = {"points": [[2,1],[2,2],[3,4],[1,1]], "angle": 90, "location": [1,1], "expected": 4}
    Solution.testSolution(input)

    input = {"points": [[1,0],[2,1]], "angle": 13, "location": [1,1], "expected": 1}
    Solution.testSolution(input)

    
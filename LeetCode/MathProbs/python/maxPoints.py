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
from typing import List

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
            
if __name__ == "__main__":
    obj = MaxPointInLine()
    
    input = {"points":[[1,1],[2,2],[3,3]], "expected":3}
    result = obj.maxPoints(input["points"])
    print("Input: points: {}".format(input["points"]))
    print("Expected: {}".format(input["expected"]))
    print("Result: {}".format(result))

    print("-" * 50)

    input = {"points":[[1,1],[3,2],[5,3],[4,1],[2,3],[1,4]], "expected":4}
    result = obj.maxPoints(input["points"])
    print("Input: points: {}".format(input["points"]))
    print("Expected: {}".format(input["expected"]))
    print("Result: {}".format(result))

    print("-" * 50)


    
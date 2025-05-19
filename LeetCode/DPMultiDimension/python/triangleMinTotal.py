from typing import List


class triangleMinTotal:
    def minimumTotal(self, triangle: List[List[int]]) -> int:
        dp = [0] * (len(triangle) + 1)

        for row in triangle[::-1]:
            for i, n in enumerate(row):
                dp[i] = n + min(dp[i], dp[i+1])

        return dp[0]
    

if __name__ == "__main__":
    obj = triangleMinTotal()

    input1 = [[2],[3,4],[6,5,7],[4,1,8,3]]
    expected1 = 11
    result1 = obj.minimumTotal(input1)
    print("Input: {}".format(input1))
    print("Result: {}".format(result1))
    print("Expected: {}".format(expected1))
    print("-" * 50)
    
    
    input2 = [[-10]]
    expected2 = -10
    result2 = obj.minimumTotal(input2)
    print("Input: {}".format(input2))
    print("Result: {}".format(result2))
    print("Expected: {}".format(expected2))
    print("-" * 50)
    
    input3 = [[-1], [2, 3], [1, -1, -1]]
    expected3 = 0
    result3 = obj.minimumTotal(input3)
    print("Input: {}".format(input3))
    print("Result: {}".format(result3))
    print("Expected: {}".format(expected3))
    print("-" * 50)



#    [-1], 
#   [2, 3], 
# [1, -1, -1]
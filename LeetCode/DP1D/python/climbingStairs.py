# You are climbing a staircase. It takes n steps to reach the top.

# Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

 

# Example 1:

# Input: n = 2
# Output: 2
# Explanation: There are two ways to climb to the top.
# 1. 1 step + 1 step
# 2. 2 steps
# Example 2:

# Input: n = 3
# Output: 3
# Explanation: There are three ways to climb to the top.
# 1. 1 step + 1 step + 1 step
# 2. 1 step + 2 steps
# 3. 2 steps + 1 step

class Solution:
    def climbStairs(self, n: int) -> int:
        one = 1
        two = 1

        for _ in range(n-1):
            temp = one
            one = one + two
            two = temp
        
        return one


if __name__ == "__main__":
    obj = Solution()

    input = 2
    expected = 2
    result = obj.climbStairs(input)
    print("Input: ", input)
    print("Result: ", result)
    print("Expected: ", expected)

    input = 3
    expected = 3
    result = obj.climbStairs(input)
    print("Input: ", input)
    print("Result: ", result)
    print("Expected: ", expected)
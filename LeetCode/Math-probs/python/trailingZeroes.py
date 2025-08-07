# Given an integer n, return the number of trailing zeroes in n!.

# Note that n! = n * (n - 1) * (n - 2) * ... * 3 * 2 * 1.

 

# Example 1:

# Input: n = 3
# Output: 0
# Explanation: 3! = 6, no trailing zero.
# Example 2:

# Input: n = 5
# Output: 1
# Explanation: 5! = 120, one trailing zero.
# Example 3:

# Input: n = 0
# Output: 0
 

# Constraints:

# 0 <= n <= 104
 

# Follow up: Could you write a solution that works in logarithmic time complexity?

class Solution:
    def trailingZeroes(self, n: int) -> int:
        # number of 5's in the divisor

        count = 0
        # count the number of 5's
        while n > 0:
            count += n // 5
            n //= 5

        return count
    
if __name__ == "__main__":
    obj = Solution()
    
    input = {"n": 3}
    expected = 0
    result = obj.trailingZeroes(input["n"])
    print("Input: ", input)
    print("Result: ", result)
    print("Expected: ", expected)

    print("-" * 50)

    input = {"n": 5}
    expected = 1
    result = obj.trailingZeroes(input["n"])
    print("Input: ", input)
    print("Result: ", result)
    print("Expected: ", expected)

    print("-" * 50)

    input = {"n": 0}
    expected = 0
    result = obj.trailingZeroes(input["n"])
    print("Input: ", input)
    print("Result: ", result)
    print("Expected: ", expected)
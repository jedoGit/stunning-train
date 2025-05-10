from typing import List

class Solution:
    def plusOne(self, digits: List[int]) -> List[int]:

        for i in range(len(digits) - 1, -1, -1):

            if digits[i] + 1 != 10:
                digits[i] += 1
                return digits
            
            digits[i] = 0

            if i == 0:
                return [1] + digits
            
if __name__ == "__main__":
    obj = Solution()
    
    input = [4,3,2,1]
    expected = [4,3,2,2]
    result = obj.plusOne(input)
    print("Input: ", input)
    print("Result: ", result)
    print("Expected: ", expected)

    print("-" * 50)

    input = [9]
    expected = [1,0]
    result = obj.plusOne(input)
    print("Input: ", input)
    print("Result: ", result)
    print("Expected: ", expected)

    print("-" * 50)

    input = [1,2,3]
    expected = [1,2,4]
    result = obj.plusOne(input)
    print("Input: ", input)
    print("Result: ", result)
    print("Expected: ", expected)
    
    
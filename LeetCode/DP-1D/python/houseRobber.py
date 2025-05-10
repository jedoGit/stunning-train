from typing import List


class Solution:
    def rob(self, nums: List[int]) -> int:
    # Visually, it will look like this: [rob1, rob2, 2, 7, 9, 3, 1]
    #                                                   0     1            2     3  4  5  6
    # We are trying to see which is more profitable: [ rob1, rob2 , rob2=rob1+2, 7, 9, 3, 1]
    # If you start at 0, it means you'll skip 1. If you start 1, it means you'll skip 0 and 2.
    # From this, rob2 will always be the current loot plus the previous loot, which is rob1.
    # As you move house, rob1 will become the rob2.

        rob1 = 0
        rob2 = 0

        for num in nums:
            temp = max(rob1 + num , rob2)
            rob1 = rob2
            rob2 = temp

        return rob2
        

if __name__ == "__main__":
    obj = Solution()


    input = [1,2,3,1]
    result =  obj.rob(input)
    expected = 4

    print("Input: ", input)
    print("Result: ", result)
    print("Expected: ", expected)

    print("-" * 50)


    input = [2,7,9,3,1]
    result =  obj.rob(input)
    expected = 12

    print("Input: ", input)
    print("Result: ", result)
    print("Expected: ", expected)

    print("-" * 50)




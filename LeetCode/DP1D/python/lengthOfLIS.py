from typing import List


class lengthOfLIS:
    def computeLengthOfLIS(self, nums: List[int]) -> int:
        LIS = [1] * len(nums)
        
        for i in range(len(nums)-1 , -1, -1) :
            for j in range(i+1, len(nums)) :
                if nums[i] < nums[j] :
                    LIS[i] = max(LIS[i], 1 + LIS[j])
        
        return max(LIS)
    

if __name__ == "__main__":
    obj = lengthOfLIS()

    input1 = { "nums": [10, 9, 2, 5, 3, 7, 101, 18]}
    expected1 = 4
    result1 = obj.computeLengthOfLIS(input1["nums"])
    print("Input: {}".format(input1))
    print("Result: {}".format(result1))
    print("Expected: {}".format(expected1))
    print("-" * 50)
    
    
    input2 = { "nums": [0, 1, 0, 3, 2, 3]}
    expected2 = 4
    result2 = obj.computeLengthOfLIS(input2["nums"])
    print("Input: {}".format(input2))
    print("Result: {}".format(result2))
    print("Expected: {}".format(expected2))
    print("-" * 50)
    
    input3 = { "nums" : [7, 7, 7, 7, 7, 7, 7]}
    expected3 = 1
    result3 = obj.computeLengthOfLIS(input3["nums"])
    print("Input: {}".format(input3))
    print("Result: {}".format(result3))
    print("Expected: {}".format(expected3))
    print("-" * 50)





from typing import Dict, List


class Solution:
    def longestConsecutive(self, nums: List[int]) -> int:
        select = 1
        if select == 1:
            print("longestConsecutive1()")
            return self.longestConsecutive1(nums)
        else:
            print("longestConsecutive2()")
            return self.longestConsecutive2(nums)
        
    def longestConsecutive1(self, nums: List[int]) -> int:
        longest = 0
        numSet = set(list(nums))

        for n in numSet:
            # Check if n is start of a sequence...
            # It's a start of a sequence if n-1 does not exist in the set.
            if (n - 1) not in numSet:
                length = 0
                # Check if the value n + length exist in the set
                # If exist, we keep increment the var length
                while (n + length) in numSet:
                    length += 1
                # We exited the while loop, so we update the var longest
                longest = max(length, longest)

        return longest
    
    def longestConsecutive2(self, nums: List[int]) -> int:
        # return 0 if nums list is empty
        if len(nums) < 1 or nums == None:
            return 0
        
        numSet = set(list(nums))
        longest = 0

        for n in numSet:
            # Check if n is start of the sequence.
            # It's start of a sequence if n - 1 does not exist.
            # If not start of a sequence, continue
            if (n - 1) in numSet:
                continue
            
            curNum = n
            curMax = 1

            # Check if current number is in the set
            # If so, increment current number and current max
            while (curNum + 1) in numSet:
                curNum += 1
                curMax += 1

            # We exited the while loop, so we need to update our longest variable.
            longest = max(longest, curMax)

        return longest

    @staticmethod
    def testSolution(input: Dict[str, List[int] | int]) -> None:
        print("Input: nums: " + str(input["nums"]) )
        print("Expected: " + str(input["expected"]))
        res = Solution().longestConsecutive(input["nums"])
        print("Result: " + str(res))
        print("PASS" if res == input["expected"] else "FAIL")
        print("-" * 50)
    

if __name__ == "__main__":
    input = {"nums": [100,4,200,1,3,2], "expected": 4}
    Solution.testSolution(input)

    input = {"nums": [0,3,7,2,5,8,4,6,0,1] , "expected": 9}
    Solution.testSolution(input)

    input = {"nums": [1,0,1,2], "expected": 3}
    Solution.testSolution(input)
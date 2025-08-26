from typing import Dict, List


class Solution:
    def summaryRanges(self, nums: List[int]) -> List[str]:
        res = []
        i = 0

        while i < len(nums):
            start = nums[i]

            while i < len(nums) - 1 and nums[i] + 1 == nums[i + 1]:
                i += 1

            # print("here")
            
            if start != nums[i]:
                res.append(str(start) + "->" + str(nums[i]))
            else:
                res.append(str(start))

            i += 1
            
        return res
    
    @staticmethod
    def testSolution(input: Dict[str, List[int] | List[str]]) -> None:
        print("Input: nums: " + str(input["nums"]) )
        print("Expected: " + str(input["expected"]))
        res = Solution().summaryRanges(input["nums"])
        print("Result: " + str(res))
        print("PASS" if res == input["expected"] else "FAIL")
        print("-" * 50)
    

if __name__ == "__main__":
    input = {"nums": [0,1,2,4,5,7], "expected": ["0->2","4->5","7"]}
    Solution.testSolution(input)

    input = {"nums": [0,2,3,4,6,8,9], "expected": ["0","2->4","6","8->9"]}
    Solution.testSolution(input)
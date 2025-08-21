from typing import Dict, List


class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        numMap = {}

        for (i, val) in enumerate(nums):
            complement = target - val

            if complement in numMap:
                return [numMap.get(complement), i]

            numMap[val] = i
        return []
    
    @staticmethod
    def testSolution(input: Dict[str, List[int] | int ]) -> None:
        print("Input: nums: " + str(input["nums"]))
        print("\ttarget: " + str(input["target"]))
        print("Expected: " + str(input["expected"]))
        res = Solution().twoSum(input["nums"], input["target"])
        print("Result: " + str(res))
        print("PASS" if res == input["expected"] else "FAIL")
        print("-" * 50)


if __name__ == "__main__":
    input = {"nums": [2,7,11,15], "target": 9, "expected": [0,1]}
    Solution.testSolution(input)

    input = {"nums": [3,2,4], "target": 6, "expected": [1,2]}
    Solution.testSolution(input)

    input = {"nums": [3,3], "target": 6, "expected": [0,1]}
    Solution.testSolution(input)
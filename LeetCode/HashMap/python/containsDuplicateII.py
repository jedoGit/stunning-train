from typing import Dict, List


class Solution:
    def containsNearbyDuplicate(self, nums: List[int], k: int) -> bool:
        window = set()
        l = 0

        for r in range(len(nums)):
            if r - l > k:
                window.remove(nums[l])
                l += 1 
            
            if nums[r] in window:
                return True

            window.add(nums[r])

        return False

    @staticmethod
    def testSolution(input: Dict[str, List[int] | int | bool]) -> None:
        print("Input: nums: " + str(input["nums"]) )
        print("\tk: " + str(input["k"]) )
        print("Expected: " + str(input["expected"]))
        res = Solution().containsNearbyDuplicate(input["nums"], input["k"])
        print("Result: " + str(res))
        print("PASS" if res == input["expected"] else "FAIL")
        print("-" * 50)


if __name__ == "__main__":

    input = {"nums": [1,2,3,1], "k": 3, "expected": True}
    Solution.testSolution(input)

    input = {"nums": [1,0,1,1], "k": 1, "expected": True}
    Solution.testSolution(input)

    input = {"nums": [1,2,3,1,2,3], "k": 2, "expected": False}
    Solution.testSolution(input)

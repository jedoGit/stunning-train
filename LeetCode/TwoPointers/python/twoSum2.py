from typing import List


class Solution:
    def twoSum(self, numbers: List[int], target: int) -> List[int]:
        l = 0
        r = len(numbers) - 1
        res = []

        while l < r:
            sum = numbers[l] + numbers[r]

            if sum > target:
                r -= 1
            elif sum < target:
                l += 1
            else:
                res.append(l + 1)
                res.append(r + 1)
                break

        return res

    @staticmethod
    def testSolution(input) -> None:
        print("Input: numbers: {}".format(input["numbers"]))
        print("Input: target: {}".format(input["target"]))
        print("Expected: {}".format(input["expected"]))
        val = Solution().twoSum(input["numbers"], input["target"])
        print("Result: {}, {}".format(val, ("Correct" if val == input["expected"] else "Wrong")))
        print("-" * 50)

if __name__ == "__main__":

    input = {"numbers":[2,7,11,15], "target":9, "expected":[1,2]}
    Solution.testSolution(input)

    input = {"numbers":[2,3,4], "target":6, "expected":[1,3]}
    Solution.testSolution(input)    

    input = {"numbers":[-1,0], "target":-1, "expected":[1,2]}
    Solution.testSolution(input)    
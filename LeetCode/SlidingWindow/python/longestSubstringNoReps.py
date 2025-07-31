
class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        mySet = set()
        maxLen = 0
        n = len(s)
        l = 0

        # Check each chars of s using r pointer
        for r in range(n):
            
            # Check if there are duplicates in our set and update our set
            # Here we're shrinking our window by moving the left pointer
            # and removing the duplicate from our set
            while s[r] in mySet:
                mySet.remove(s[l])
                l += 1
            
            # at this point, our set have no duplicates, so add the char to our set
            mySet.add(s[r])

            # at every iteration, update our max length
            maxLen = max(maxLen, r - l + 1)

        return maxLen
        
    @staticmethod
    def testSolution(input) -> None:
        print("Input: s: {}".format(input["s"]))
        print("Expected: {}".format(input["expected"]))
        val = Solution().lengthOfLongestSubstring(input["s"])
        print("Result: {}".format(val))
        print(("PASS" if val == input["expected"] else "FAIL"))
        print("-" * 50)


if __name__ == "__main__":
    input = {"s": "abcabcbb", "expected": 3}
    Solution.testSolution(input)

    input = {"s": "bbbbb", "expected": 1}
    Solution.testSolution(input)

    input = {"s": "pwwkew", "expected": 3}
    Solution.testSolution(input)
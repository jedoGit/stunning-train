class Solution:
    def isPalindrome(self, s: str) -> bool:
        l = 0
        r = len(s) - 1

        while l < r:
            while l < r and not s[l].isalnum():
                l += 1

            while r > l and not s[r].isalnum():
                r -= 1

            if s[l].lower() != s[r].lower():
                return False
            
            l += 1
            r -= 1

        return True
    
    @staticmethod
    def testSolution(input) -> None:
        print("Input: s: {}".format(input["s"]))
        print("Expected: {}".format(input["expected"]))
        val = Solution().isPalindrome(input["s"])
        print("Result: {} , {}".format(val, ("Correct" if val == input["expected"] else "Wrong")))
        print("-" * 50)

if __name__ == "__main__":
    input = {"s":"A man, a plan, a canal: Panama", "expected":True}
    Solution.testSolution(input)

    input = {"s":"race a car", "expected":False}
    Solution.testSolution(input)

    input = {"s":" ", "expected":True}
    Solution.testSolution(input)


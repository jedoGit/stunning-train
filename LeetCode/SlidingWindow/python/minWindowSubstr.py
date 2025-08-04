from collections import defaultdict


class Solution:
    def minWindow(self, s: str, t: str) -> str:
        if t == "":
            return ""
        
        countT = defaultdict() # This represents the chars we need to have
        window = defaultdict() # This represent the chars we currently have on the window. We update it as we slide our window.

        #  Get a count of each chars of t. This represents the chars we need for the substring
        for c in t:
            countT[c] = countT.get(c, 0) + 1

        have = 0 # We update it every time we see chars that we need
        need = len(countT.keys()) # This represent the number of chars that we need for the substring. The countT map holds the count of the chars we need. Because this is an object, we'll get the length using Object.keys(obj1).length
        res = [-1, -1] #Initialized with default
        resLen = float('inf') # Initialize with large value
        l = 0 # This is our l pointer

        #  We'll use sliding window to move through chars in s
        #  We'll move the r pointer first until we find all the chars in t
        #  Then, we'll the l pointer until we find a substr that is minimum in length
        for r in range(len(s)):
            c = s[r]

            #  Check our window map if we have the current char and update it
            window[c] = window.get(c, 0) + 1

            #  Check if this satisfy the condition?
            #  Check if c is in our countT map and
            #  Check if the count of c is equal, then update our have count
            if c in countT and window.get(c) == countT.get(c):
                have += 1

            #  Let's move the l pointers and update our result
            while have == need:
                if (r - l + 1) < resLen:
                    res = [l, r]
                    resLen = (r -l + 1)
                
                # We shrink the window by moving the l pointer
                # Make sure we remove chars from the window map and update our have count
                window[s[l]] -= 1

                # If count if s[l] is less in window than in countT map,
                # we need to decrement our have variable
                if s[l] in countT and window.get(s[l]) < countT.get(s[l]):
                    have -= 1

                # Lastly, we increment our l pointer
                l += 1

        #  We need to return the minimun substring, we get the index from the res array
        (lp, rp) = res

        #  Check if resLen was updated, if so, we return the s starting from index l to r + 1, else and empty string
        return s[lp : rp + 1] if resLen != float('inf') else ""

    @staticmethod
    def testSolution(input) -> None:
        print("Input: s: {}".format(input["s"]))
        print("Input: t: {}".format(input["t"]))
        print("Expected: {}".format(input["expected"]))
        val = Solution().minWindow(input["s"], input["t"])
        print("Result: {}".format(val))
        print("PASS" if val == input["expected"] else "FAIL")
        print("-" * 50)

if __name__ == "__main__":
    input = {"s": "ADOBECODEBANC", "t": "ABC", "expected": "BANC"}
    Solution.testSolution(input)

    input = {"s": "a", "t": "a", "expected": "a"}
    Solution.testSolution(input)

    input = {"s": "a", "t": "aa", "expected": ""}
    Solution.testSolution(input)    
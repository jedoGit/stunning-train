from typing import List


class Solution(object):
    def wordBreak(self, s: str, wordDict: List[str]) -> bool:
        dp = [False] * (len(s) + 1)
        dp[len(s)] = True

        for i in range(len(s)-1, -1, -1):
            for w in wordDict:
                if (i+ len(w)) <= len(s) and s[i:i+len(w)] == w:
                    dp[i] = dp[i + len(w)]
                if dp[i]:
                    break

        return dp[0]



if __name__ == "__main__":
    obj = Solution()

    input = {"s":"leetcode", "wordDict":["leet","code"]}
    expected = True
    print("Input: {}".format( input ))
    print("Result: {}".format(obj.wordBreak(input["s"], input["wordDict"])))
    print("Expected: {}".format(expected))
    print("-" * 50)

    input = {"s":"applepenapple", "wordDict":["apple","pen"]}
    expected = True
    print("Input: {}".format( input ))
    print("Result: {}".format(obj.wordBreak(input["s"], input["wordDict"])))
    print("Expected: {}".format(expected))
    print("-" * 50)

    input = {"s":"catsandog", "wordDict":["cats","dog","sand","and","cat"]}
    expected = False
    print("Input: {}".format( input ))
    print("Result: {}".format(obj.wordBreak(input["s"], input["wordDict"])))
    print("Expected: {}".format(expected))
    print("-" * 50)
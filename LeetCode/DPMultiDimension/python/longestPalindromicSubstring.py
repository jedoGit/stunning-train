class longestPalindrome:
    def solveLongestPalindrome(self, s: str) -> str:
        n = len(s)
        maxLen = 0
        ansLeft = 0

        if n == 0:
            return ""

        dp = [[False] * n for r in range(n)]

        for i in range(n-1,-1,-1):
            # print(i)
            for j in range(i,n):
                # print(j)
                if i == j:
                    dp[i][j] = True
                else:
                    if j == i + 1:
                        dp[i][j] = (s[i] == s[j])
                    else:
                        dp[i][j] = (s[i] == s[j] and dp[i + 1][j - 1])
                
                if dp[i][j] and j - i + 1 > maxLen:
                    maxLen = j - i + 1
                    ansLeft = i
        
        # print(dp)
        # print(ansLeft)
        # print(maxLen)

        return s[ansLeft:ansLeft+maxLen]
    

if __name__ == "__main__":
    obj = longestPalindrome()

    input1 = "babad"
    expected1 = "bab or aba"
    result1 = obj.solveLongestPalindrome(input1)
    print("Input: {}".format(input1))
    print("Result: {}".format(result1))
    print("Expected: {}".format(expected1))
    print("-" * 50)
    
    
    input2 = "cbbd"
    expected2 = "bb"
    result2 = obj.solveLongestPalindrome(input2)
    print("Input: {}".format(input2))
    print("Result: {}".format(result2))
    print("Expected: {}".format(expected2))
    print("-" * 50)
    
class Solution:
    def minDistance(self, word1: str, word2: str) -> int:
        n = len(word1)
        m = len(word2)

        dp = [ [float("inf")] * (m + 1) for r in range(n + 1) ]

        # Fill the right most column and bottom row with our base cases
        # If W1 is empty and W2 is not, it will take W2.length of operations to convert W1 to W2
        # If W1 is not empty and W2 is empty, it will take W1.length of operations to convert W1 to W2
        # Fill the rightmost column
        for i in range(n+1) :
            dp[i][m] = n-i
        
        # Fill the bottom row
        for j in range(m+1):
            dp[n][j] = m-j
        

        # If W1 == W2, there's no operation, just take the value from the lower diagonal [i+1][j+1]
        # If W1 != W2, first, we'll find the min from the 3 operations and add 1:
        # Delete:  [i+1][j], a delete is equivalent to moving the i pointer of W1 in terms of operations required
        # Insert:  [i][j+1], an insert is equivalent to moving the j pointer of W2 in terms of operations required
        # Replace: [i+1][j+1], a replace is equivalent to doing a delete and insert
        
        # We'll do bottoms up approach of 2D DP.
        for i in range(n-1, -1, -1):
            for j in range(m-1, -1, -1):
                if word1[i] == word2[j]:
                    dp[i][j] = dp[i+1][j+1] 
                else:
                    dp[i][j] = 1 + min(dp[i+1][j], dp[i][j+1], dp[i+1][j+1])


        return dp[0][0]
    

if __name__ == "__main__":
    obj = Solution()

    input1 = { "word1": "horse", "word2": "ros" }
    expected1 = 3
    result1 = obj.minDistance(input1["word1"], input1["word2"])
    print("Input: word1: " + input1["word1"] + ", word2: " + input1["word2"])
    print("Expected: {}".format(expected1))
    print("Result: {}".format(result1))
    print("-" * (50))

    input2 = { "word1": "intention", "word2": "execution" }
    expected2 = 5
    result2 = obj.minDistance(input2["word1"], input2["word2"])
    print("Input: word1: " + input2["word1"] + ", word2: " + input2["word2"])
    print("Expected: {}".format(expected2))
    print("Result: {}".format(result2))
    print("-" * (50))
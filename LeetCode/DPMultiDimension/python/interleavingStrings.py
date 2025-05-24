class interleavingString:
    def isInterleave(self, s1: str, s2: str, s3: str) -> bool:
        if len(s1) + len(s2) != len(s3):
            return False
        
        dp = [[False] * (len(s2) + 1) for i in range(len(s1) + 1)]
        dp[len(s1)][len(s2)] = True

        # print(dp)
        for i in range(len(s1), -1, -1):
            for j in range(len(s2), -1, -1):
                if i < len(s1) and s1[i] == s3[i+j] and dp[i+1][j]:
                    dp[i][j] = True
                if j < len(s2) and s2[j] == s3[i+j] and dp[i][j+1]:
                    dp[i][j] = True

        return dp[0][0]
    
    def isInterleaveMemoize(self, s1: str, s2: str, s3: str) -> bool:
        if len(s1) + len(s2) != len(s3):
            return False
        
        dp = {}
        def dfs(i,j):
            if i == len(s1) and j == len(s2):
                return True
            if (i,j) in dp:
                return dp[(i,j)]
            
            if i < len(s1) and s1[i] == s3[i+j] and dfs(i+1, j):
                return True
            if j < len(s2) and s2[j] == s3[i+j] and dfs(i, j+1):
                return True            

            dp[(i,j)] = False

            return False
        return dfs(0,0)
    
if __name__ == "__main__":
    obj = interleavingString()

    input1 = {"s1":"aabcc", "s2":"dbbca", "s3":"aadbbcbcac"}
    expected1 = "True"
    result1 = obj.isInterleaveMemoize(input1["s1"], input1["s2"], input1["s3"])
    print("Input: {}".format(input1))
    print("Result: {}".format(result1))
    print("Expected: {}".format(expected1))
    print("-" * 50)
    
    
    input2 = {"s1":"aabcc", "s2":"dbbca", "s3":"aadbbbaccc"}
    expected2 = "False"
    result2 = obj.isInterleaveMemoize(input2["s1"], input2["s2"], input2["s3"])
    print("Input: {}".format(input2))
    print("Result: {}".format(result2))
    print("Expected: {}".format(expected2))
    print("-" * 50)

    input3 = {"s1":"", "s2":"", "s3":""}
    expected3 = "True"
    result3 = obj.isInterleaveMemoize(input3["s1"], input3["s2"], input3["s3"])
    print("Input: {}".format(input3))
    print("Result: {}".format(result3))
    print("Expected: {}".format(expected3))
    print("-" * 50)
    
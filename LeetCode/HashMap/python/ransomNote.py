from collections import defaultdict


class Solution:
    def canConstruct(self, ransomNote: str, magazine: str) -> bool:
        count = defaultdict(int)

        # Let's build a count of each chars in the magazine
        for c in magazine:
            count[c] = count.get(c, 0) + 1

        # Here, we check each chars in ransomNote if it exists in our count dictionary
        # If it exist, we decrement the count in the count dictionary... if it it's the
        # last one, we'll remove the entry from out count dictionary
        for c in ransomNote:
            charCheck = count.get(c, 0)

            if charCheck < 1:
                return False
            else:
                count[c] = charCheck - 1
                if count.get(c, 0) < 1:
                    del count[c]
        
        return True

    @staticmethod
    def testSolution(input) -> None:
        print("Input: ransomNote: " + input["ransomNote"])
        print("\tmagazine: " + input["magazine"])
        print("Expected: " + str(input["expected"]))
        res = Solution().canConstruct(input["ransomNote"], input["magazine"])
        print("PASS" if res == input["expected"] else "FAIL")
        print("-" * 50)
        

if __name__ == "__main__":
    input = {"ransomNote": "a", "magazine": "b", "expected": False}
    Solution.testSolution(input)

    input = {"ransomNote": "aa", "magazine": "ab", "expected": False}
    Solution.testSolution(input)

    input = {"ransomNote": "aa", "magazine": "aab", "expected": True}
    Solution.testSolution(input)
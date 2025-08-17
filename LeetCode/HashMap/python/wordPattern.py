class Solution:
    def wordPattern(self, pattern: str, s: str) -> bool:
        words = s.split(" ")
        
        if len(words) != len(pattern):
            return False

        charToWord = {}
        wordToChar = {}

        for i in range(len(pattern)):
            c = pattern[i]
            w = words[i]

            if c in charToWord and charToWord[c] != w:
                return False
            
            if w in wordToChar and wordToChar[w] != c:
                return False
            
            charToWord[c] = w
            wordToChar[w] = c

        return True

    @staticmethod
    def testSolution(input) -> None:
        print("Input: pattern: " + input["pattern"])
        print("\ts: " + input["s"])
        print("Expected: " + str(input["expected"]))
        res = Solution().wordPattern(input["pattern"], input["s"])
        print("Result: " + str(res))
        print("PASS" if res == input["expected"] else "FAIL")
        print("-" * 50)

if __name__ == "__main__":
    input = {"pattern": "abba", "s": "dog cat cat dog", "expected": True}
    Solution.testSolution(input)

    input = {"pattern": "abba", "s": "dog cat cat fish", "expected": False}
    Solution.testSolution(input)

    input = {"pattern": "aaaa", "s": "dog cat cat dog", "expected": False}
    Solution.testSolution(input)
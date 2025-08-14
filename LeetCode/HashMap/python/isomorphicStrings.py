
class Solution:
    def isIsomorphic(self, s: str, t: str) -> bool:
        mapST = {}
        mapTS = {}

        for i in range(len(s)):
            c1 = s[i]
            c2 = t[i]

            if c1 in mapST and mapST.get(c1) != c2 or c2 in mapTS and mapTS.get(c2) != c1:
                return False
            
            mapST[c1] = c2
            mapTS[c2] = c1

        return True

    @staticmethod
    def testSolution(input) -> None:
        print("Input: s: " + input["s"])
        print("\tt: " + input["t"])
        print("Expected: " + str(input["expected"]))
        res = Solution().isIsomorphic(input["s"], input["t"])
        print("Result: " + str(res))
        print("PASS" if res == input["expected"] else "FAIL")
        print("-" * 50)

if __name__ == "__main__":
    input = {"s": "egg", "t": "add", "expected": True}
    Solution.testSolution(input)

    input = {"s": "foo", "t": "bar", "expected": False}
    Solution.testSolution(input)

    input = {"s": "paper", "t": "title", "expected": True}
    Solution.testSolution(input)
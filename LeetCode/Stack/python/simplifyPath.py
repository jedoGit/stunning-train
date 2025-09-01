from typing import Dict


class Solution:
    def simplifyPath(self, path: str) -> str:
        stack = []
        cur = ""

        for c in path + "/":
            if c == "/":
                if cur == "..":
                    (len(stack) > 0) and stack.pop()
                elif cur != "" and cur != ".":
                    stack.append(cur)
                
                cur = ""
            else:
                cur += c

        return "/" + "/".join(stack)
    
    @staticmethod
    def testSolution(input: Dict[str, str]) -> None:
        print("Input: path: " + input["path"])
        print("Expected: " + str(input["expected"]))
        res = Solution().simplifyPath(input["path"])
        print("Result: " + str(res))
        print("PASS" if res == input["expected"] else "FAIL")
        print("-" * 50)
    

if __name__ == "__main__":
    input = {"path": "/home/", "expected": "/home"}
    Solution.testSolution(input)

    input = {"path": "/home//foo/", "expected": "/home/foo"}
    Solution.testSolution(input)

    input = {"path": "/home/user/Documents/../Pictures", "expected": "/home/user/Pictures"}
    Solution.testSolution(input)
    
    input = {"path": "/../", "expected": "/"}
    Solution.testSolution(input)

    input = {"path": "/.../a/../b/c/../d/./", "expected": "/.../b/d"}
    Solution.testSolution(input)


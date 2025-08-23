from typing import Dict


class Solution:
    def isHappy(self, n: int) -> bool:
        visited = set()

        while n not in visited:
            # print ("before" + str(visited))
            visited.add(n)
            # print ("after" + str(visited))            

            # Compute the new n
            n = self.computeN(n)

            if n == 1:
                return True

        return False
    
    # This goes through all the digit of n and accumulate the square of all the digits
    def computeN(self, n: int) -> int:
        res = 0

        while n > 0 :
            temp = n % 10 # Get the most significant digit (MSD)
            res += (temp**2) # Compute the square of the MSD and accumulate to the res variable
            n = (n//10) # Get the next digit of n
        
        return res

    @staticmethod
    def testSolution(input: Dict[str, int | bool]) -> None:
        print("Input: n: " + str(input["n"]))
        print("Expected: " + str(input["expected"]))
        res = Solution().isHappy(input["n"])
        print("Result: " + str(res))
        print("PASS" if res == input["expected"] else "FAIL")
        print("-" * 50)
        

if __name__ == "__main__":
    input = {"n": 19, "expected": True}
    Solution.testSolution(input)

    input = {"n": 2, "expected": False}
    Solution.testSolution(input)
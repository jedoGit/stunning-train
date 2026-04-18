from dataclasses import dataclass
from enum import Enum
import math
from typing import Tuple

class Result(Enum):
    PASS = "\033[92mPASS\033[00m"
    FAIL = "\033[91mFAIL\033[00m"

@dataclass
class PowerXNRecord:
    x: float
    n: int
    expected: float

class PowerXN:
    def myPow(self, x: float, n: int) -> float:
        def helper(x, n):
            if x == 0: return 0
            if n == 0: return 1

            res = helper(x, n//2)
            res = res * res
            return x * res if n % 2 else res
        
        res = helper(x, abs(n))
        return res if n>=0 else 1/res

    @staticmethod
    def testSolution(record: PowerXNRecord) -> None:
        print(f"input:\tx: {record.x:.5f}")
        print(f"\tn: {record.n}")
        print(f"expected: {record.expected:.5f}")

        res: float = PowerXN().myPow(record.x, record.n)

        print(f"result: {res:.5f}")

        print(Result.PASS.value if math.isclose(res, record.expected, abs_tol=1e-5) else Result.FAIL.value)
    
if __name__ == "__main__":
    records: Tuple[PowerXNRecord] = (
        PowerXNRecord(2.00000, 10, 1024.00000),
        PowerXNRecord(2.10000, 3, 9.26100),
        PowerXNRecord(2.00000, -2, 0.25000)
    )

    for i, record, in enumerate(records):
        print(f"# Test case {i + 1}")
        PowerXN.testSolution(record)
        print("-" * 50)    

# if __name__ == "__main__":
#     obj = PowerXN()

#     input = {"x":2.00000, "n":10,"expected":1024.00000}
#     result = obj.myPow(input["x"], input["n"])
#     print("Input: x: {:.5f}, n: {}".format(input["x"], input["n"]))
#     print("Expected: {:.5f}".format(input["expected"]))
#     print("Result: {:.5f}".format(result))

#     print("-" * 50)

#     input = {"x":2.10000, "n":3,"expected":9.26100}
#     result = obj.myPow(input["x"], input["n"])
#     print("Input: x: {:.5f}, n: {}".format(input["x"], input["n"]))
#     print("Expected: {:.5f}".format(input["expected"]))
#     print("Result: {:.5f}".format(result))

#     print("-" * 50)

#     input = {"x":2.00000, "n":-2,"expected":0.25000}
#     result = obj.myPow(input["x"], input["n"])
#     print("Input: x: {:.5f}, n: {}".format(input["x"], input["n"]))
#     print("Expected: {:.5f}".format(input["expected"]))
#     print("Result: {:.5f}".format(result))

#     print("-" * 50)

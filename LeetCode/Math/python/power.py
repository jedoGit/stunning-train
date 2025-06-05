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
    

if __name__ == "__main__":
    obj = PowerXN()

    input = {"x":2.00000, "n":10,"expected":1024.00000}
    result = obj.myPow(input["x"], input["n"])
    print("Input: x: {:.5f}, n: {}".format(input["x"], input["n"]))
    print("Expected: {:.5f}".format(input["expected"]))
    print("Result: {:.5f}".format(result))

    print("-" * 50)

    input = {"x":2.10000, "n":3,"expected":9.26100}
    result = obj.myPow(input["x"], input["n"])
    print("Input: x: {:.5f}, n: {}".format(input["x"], input["n"]))
    print("Expected: {:.5f}".format(input["expected"]))
    print("Result: {:.5f}".format(result))

    print("-" * 50)

    input = {"x":2.00000, "n":-2,"expected":0.25000}
    result = obj.myPow(input["x"], input["n"])
    print("Input: x: {:.5f}, n: {}".format(input["x"], input["n"]))
    print("Expected: {:.5f}".format(input["expected"]))
    print("Result: {:.5f}".format(result))

    print("-" * 50)

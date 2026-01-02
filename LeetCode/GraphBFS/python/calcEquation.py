# You are given an array of variable pairs equations and an array of real numbers values, where equations[i] = [Ai, Bi] and values[i] represent the equation Ai / Bi = values[i]. Each Ai or Bi is a string that represents a single variable.

# You are also given some queries, where queries[j] = [Cj, Dj] represents the jth query where you must find the answer for Cj / Dj = ?.

# Return the answers to all queries. If a single answer cannot be determined, return -1.0.

# Note: The input is always valid. You may assume that evaluating the queries will not result in division by zero and that there is no contradiction.

# Note: The variables that do not occur in the list of equations are undefined, so the answer cannot be determined for them.

# Example 1:

# Input: equations = [["a","b"],["b","c"]], values = [2.0,3.0], queries = [["a","c"],["b","a"],["a","e"],["a","a"],["x","x"]]
# Output: [6.00000,0.50000,-1.00000,1.00000,-1.00000]
# Explanation:
# Given: a / b = 2.0, b / c = 3.0
# queries are: a / c = ?, b / a = ?, a / e = ?, a / a = ?, x / x = ?
# return: [6.0, 0.5, -1.0, 1.0, -1.0 ]
# note: x is undefined => -1.0
# Example 2:

# Input: equations = [["a","b"],["b","c"],["bc","cd"]], values = [1.5,2.5,5.0], queries = [["a","c"],["c","b"],["bc","cd"],["cd","bc"]]
# Output: [3.75000,0.40000,5.00000,0.20000]
# Example 3:

# Input: equations = [["a","b"]], values = [0.5], queries = [["a","b"],["b","a"],["a","c"],["x","y"]]
# Output: [0.50000,2.00000,-1.00000,-1.00000]

# Constraints:

# 1 <= equations.length <= 20
# equations[i].length == 2
# 1 <= Ai.length, Bi.length <= 5
# values.length == equations.length
# 0.0 < values[i] <= 20.0
# 1 <= queries.length <= 20
# queries[i].length == 2
# 1 <= Cj.length, Dj.length <= 5
# Ai, Bi, Cj, Dj consist of lower case English letters and digits.

# TC: O(e), e is the number of edges
# SC: O(n), n is the number of nodes we have to perform recursion.

from collections import defaultdict, deque
from enum import Enum
from typing import Dict, List

class Result(Enum):
    PASS = "\033[92mPASS\033[00m"
    FAIL = "\033[91mFAIL\033[00m"

class Solution:

    def __init__(self):
        self.graph = defaultdict(list)

    def calcEquation(self, equations: List[List[str]], values: List[float], queries: List[List[str]]) -> List[float]:
        #   Build the graph
        #   The graph will be an object of object
        #   After visualizing the requirements, we can deduce that
        #   For the direction a->b, we assign the value as-is
        #   For the direction b->a, we assign the value as 1/value
        
        for i, eq in enumerate(equations):
            a,b = eq

            self.graph[a].append([b,values[i]])
            self.graph[b].append([a, 1 / values[i]])
        
        return [self.bfs(q[0], q[1]) for q in queries]
    
    def bfs(self, src: str, tgt: str) -> float:
        # Let's build our bfs
        # From the requirement, if the equation does not exist, we return -1
        # From our visualization of the graph, if the src and dest is itself, we return 1
        # From the visualization, moving from node to node, we multiply the values of that direction
        
        if src not in self.graph or tgt not in self.graph:
            return -1.0
            
        q = deque()
        visited = set()
        q.append([src,1])
        visited.add(src)

        while q:
            n,w = q.popleft()
            if n == tgt:
                return w
            for nei, weight in self.graph[n]:
                if nei not in visited:
                    q.append([nei, w*weight])
                    visited.add(nei)
        return -1.0
    
    @staticmethod
    def testSolution(input: Dict[str, List[int] | List[List[str]] | List[float]]) -> None:
        print(f"Input: equations: {input.get("equations")}")
        print(f"values: {input.get("values")}")
        print(f"queries: {input.get("queries")}")

        expected_formatted = [f"{x:.5f}" for x in input.get("expected")]
        print(f"expected: {expected_formatted}")

        res_list = Solution().calcEquation(input.get("equations"), input.get("values"), input.get("queries"))
        res_list_formatted = [f"{x:.5f}" for x in res_list]
        print(f"result: {res_list_formatted}")

        print(f"{Result.PASS.value if res_list_formatted == expected_formatted else Result.FAIL.value}")
    
if __name__ == "__main__":
    records = [{"equations": [["a","b"],["b","c"]], 
                "values": [2.0,3.0], 
                "queries": [["a","c"],["b","a"],["a","e"],["a","a"],["x","x"]], 
                "expected": [6.00000,0.50000,-1.00000,1.00000,-1.00000]},
                {"equations": [["a","b"],["b","c"],["bc","cd"]], 
                "values": [1.5,2.5,5.0], 
                "queries": [["a","c"],["c","b"],["bc","cd"],["cd","bc"]], 
                "expected": [3.75000,0.40000,5.00000,0.20000]},
                {"equations": [["a","b"]], 
                "values": [0.5], 
                "queries": [["a","b"],["b","a"],["a","c"],["x","y"]], 
                "expected": [0.50000,2.00000,-1.00000,-1.00000]}
                ]
    
    for i, record in enumerate(records):
        print(f"Test case {i + 1}")
        Solution.testSolution(record)
        print(f"{'-' * 50}")

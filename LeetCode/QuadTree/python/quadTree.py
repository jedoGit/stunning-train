from collections import deque
from dataclasses import dataclass
from enum import Enum
from typing import Any, Deque, List

# Definition for a QuadTree node.
class Node:
    def __init__(self, val, isLeaf, topLeft, topRight, bottomLeft, bottomRight):
        self.val = val
        self.isLeaf = isLeaf
        self.topLeft = topLeft
        self.topRight = topRight
        self.bottomLeft = bottomLeft
        self.bottomRight = bottomRight

class Result(Enum):
    PASS = "\033[92mPASS\033[00m"
    FAIL = "\033[91mFAIL\033[00m"

@dataclass
class quadTreeRecord:
    grid: List[List[int]]
    expected: List[List[int]]

class Solution:
    def construct(self, grid: List[List[int]]) -> 'Node':
        # return Node(1, False, Node(1, True, None, None, None, None), Node(1, False, Node(0, True, None, None, None, None), Node(0, True, None, None, None, None), Node(1, True, None, None, None, None), Node(1, True, None, None, None, None)), Node(1, True, None, None, None, None), Node(0, True, None, None, None, None))
        return self.DFS(len(grid), 0, 0, grid)
    
    def DFS(self, n: int, r: int, c: int, grid: List[List[int]]) -> Node:
        allSame: bool = True

        # Check this quadrant if all cells have the same value
        # If not, set the boolean to false
        for i in range(n):
            for j in range(n):
                if grid[r][c] != grid[r + i][c + j]:
                    allSame = False
                    break

        # This quadrant have the same value each cells. So this is a leaf node
        if allSame:
            return Node(grid[r][c], True, None, None, None, None)
        

        # At this point, we know that some cells in the quadrant don't have the same value
        # So, we DFS the 4 sub quadrants of this quadrant
        n: int = n//2

        topLeft: Node = self.DFS(n, r, c, grid)
        topRight: Node = self.DFS(n, r, c + n, grid)
        bottomLeft: Node = self.DFS(n, r + n, c, grid)
        bottomRight: Node = self.DFS(n, r + n, c + n, grid)

        # We know that this quadrant is not a leaf node, so we return a new leafnode and attach the 4 subquadrant children.
        # Per the requirement, if this is not a leaf node, we set val to any value
        return Node(0, False, topLeft, topRight, bottomLeft, bottomRight)

    @staticmethod
    def testSolution(record: quadTreeRecord) -> None:
        print(f"input: grid: {record.grid}")
        print(f"expected: {record.expected}")

        resNode: Node = Solution().construct(record.grid)
        resList: List[List[int] | str] = Solution.quadTreeToList(resNode)

        print(f"result: {resList}")
        print(Result.PASS.value if Solution.validateResult(resList, record.expected) else Result.FAIL.value)

    @staticmethod
    def validateResult(result: List[List[Any]], expected: List[List[int]]) -> bool:
        if len(result) != len(expected):
            return False
        
        # Result is a list[x, y], where x is the isLeaf boolean and y is the val.
        # We want to compare the isLeaf boolean if the same because if isLeaf is 0 or false, the val portion can be any value 0 and 1.
        # If isLeaf is true, val should be the same as expected.
        for i in range(len(result)):
            if result[i][0] == 1:
                if result[i][0] != expected[i][0] or result[i][1] != expected[i][1]:
                    return False
            
            if result[i][0] == 0:
                if result[i][0] != expected[i][0] or result[i][1] not in [0,1]:
                    return False
            
        return True
    
    @staticmethod
    def quadTreeToList(root: Node) -> List[List[Any]]:
        # print(f"{root.val}")

        # Using BFS
        res: List[List[int] | str] = []
        q: Deque[Node | None] = deque()
        q.append(root)

        while len(q) > 0:
            curNode = q.popleft()

            tmp = [int(curNode.isLeaf), curNode.val]  if curNode is not None else "null"

            res.append(tmp)

            if curNode is not None: 
                q.append(curNode.topLeft)
                q.append(curNode.topRight)
                q.append(curNode.bottomLeft)
                q.append(curNode.bottomRight)

        while len(res) > -1:
            if res[-1] != "null":
                break
            res.pop()

        return res

if __name__ == "__main__":
    records: List[quadTreeRecord] = [
        quadTreeRecord([[0,1],[1,0]], 
                       [[0,1],[1,0],[1,1],[1,1],[1,0]]),
        quadTreeRecord([[1,1,1,1,0,0,0,0],
                        [1,1,1,1,0,0,0,0],
                        [1,1,1,1,1,1,1,1],
                        [1,1,1,1,1,1,1,1],
                        [1,1,1,1,0,0,0,0],
                        [1,1,1,1,0,0,0,0],
                        [1,1,1,1,0,0,0,0],
                        [1,1,1,1,0,0,0,0]],
                        [[0,1],[1,1],[0,1],[1,1],[1,0],"null","null","null","null",[1,0],[1,0],[1,1],[1,1]])
    ]

    for i, record in enumerate(records):
        print(f"# Test case {i + 1}")
        Solution.testSolution(record)
        print("-" * 50)


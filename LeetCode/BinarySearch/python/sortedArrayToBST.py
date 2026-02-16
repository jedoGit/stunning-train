from collections import deque
from dataclasses import dataclass
from enum import Enum
from typing import Any, List, Optional

# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Result(Enum):
    PASS = "\033[92mPASS\033[00m"
    FAIL = "\033[91mFAIL\033[00m"

@dataclass
class sortedArrayToBSTRecord:
    nums: List[int]
    expected: List[List[Any]]

class Solution:
    def sortedArrayToBST(self, nums: List[int]) -> Optional[TreeNode]:
        return self.DFS(nums, 0, len(nums) - 1)
    
    def DFS(self, nums: List[int], l: int, r: int) -> Optional[TreeNode]:
        if l > r:
            return None
        
        mid: int = (r + l) // 2

        root: TreeNode = TreeNode(nums[mid])

        root.left = self.DFS(nums, l, mid - 1)
        root.right = self.DFS(nums, mid + 1, r)

        return root
    
    @staticmethod
    def testSolution(record: sortedArrayToBSTRecord) -> None: 
        print(f"input: nums: {record.nums}")
        print(f"expected: {record.expected}")

        res: TreeNode = Solution().sortedArrayToBST(record.nums)
        resArray: List[Any] = Solution.bstToArray(res)
        print(f"result: {resArray}")

        print(Result.PASS.value if Solution.validateResult(resArray, record.expected) else Result.FAIL.value)

    @staticmethod
    def validateResult(result: List[Any], expected: List[List[Any]]) -> bool:

        if result in expected:
            return True
               
        return False
    
    @staticmethod 
    def bstToArray(root: TreeNode) -> List[Any]:
        # Use BFS to create the list
        if root is None:
            return []
        
        q = deque([root])
        res = []
        
        while len(q) > 0:
            curNode = q.popleft()

            tmp: Any = curNode.val if curNode is not None else "null"
            
            res.append(tmp)

            if curNode is not None:
                q.append(curNode.left)
                q.append(curNode.right)

        while len(res) > -1:
            if res[-1] != "null":
                break
            res.pop()
        
        return res

if __name__ == "__main__":
    records: List[sortedArrayToBSTRecord] = [
        sortedArrayToBSTRecord([-10,-3,0,5,9], [[0,-3,9,-10,"null",5], [0,-10,5,"null",-3,"null",9]]),
        sortedArrayToBSTRecord([1,3], [[3,1], [1,"null",3]])
    ]

    for i, record in enumerate(records):
        print(f"# Test case {i + 1}")
        Solution.testSolution(record)
        print("-" * 50)
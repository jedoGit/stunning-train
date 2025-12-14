# Given the root of a binary search tree, and an integer k, return the kth smallest value (1-indexed) of all the values of the nodes in the tree.

# Example 1:

# Input: root = [3,1,4,null,2], k = 1
# Output: 1
# Example 2:

# Input: root = [5,3,6,2,4,null,null,1], k = 3
# Output: 3

# Constraints:

# The number of nodes in the tree is n.
# 1 <= k <= n <= 104
# 0 <= Node.val <= 104

# Follow up: If the BST is modified often (i.e., we can do insert and delete operations) and you need to find the kth smallest frequently, how would you optimize?

# TC: O(n)
# SC: O(h), h is height of the tree

# Definition for a binary tree node.

from collections import deque
from typing import Dict, List, Optional


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def kthSmallest(self, root: Optional[TreeNode], k: int) -> int:
        n = 0
        s = []
        cur = root

        while cur or len(s):
            # add all the left child to the stack
            while cur:
                s.append(cur)
                cur = cur.left
            
            # pop the stack and increment the n counter
            cur = s.pop()

            n += 1

            if n == k:
                return cur.val

            # check the right child of cur
            cur = cur.right

    @staticmethod
    def testSolution(input: Dict[str, List[str|int]]) -> None:
        bTree = Solution.BFSCreateBinaryTree(input["root"])
        print(f"Input: root: {Solution.BFSBinaryTreeToStr(bTree)}")
        print(f"Input: k: {input.get("k")}")
        print(f"Expected: {input['expected']}")

        res = Solution().kthSmallest(bTree, input.get("k"))

        print(f"Result: {res}")
        print("\033[92mPASS\033[00m" if res == input.get("expected", [[]]) else "\033[91mFAIL\033[00m")

    @staticmethod
    def BFSCreateBinaryTree(node: List[int|str]) -> TreeNode:
        arLen = len(node)

        if arLen < 1:
            return None

        root = TreeNode(node[0], None, None)
        i = 1

        # Using queue (BFS) to build the tree level by level
        queue = deque([root])

        while len(queue) > 0 and i < arLen:
            # Pre order: root, left, then right
            cur_node = queue.popleft()

            # Left child
            if i < arLen and node[i] != "null":
                cur_node.left = TreeNode(node[i], None, None)
                queue.append(cur_node.left)
            i += 1
            
            # Right child
            if i < arLen and node[i] != "null":
                cur_node.right = TreeNode(node[i], None, None)
                queue.append(cur_node.right)            
            i += 1

        return root
    
    @staticmethod
    def BFSBinaryTreeToStr(root: Optional[TreeNode]) -> None:

        if root is None:
            return "[]"
        
        sb = []

        # Using queue (BFS) to build the tree level by level
        queue = deque([root])


        while len(queue) > 0:
            curNode = queue.popleft()

            tmp = str(curNode.val) if curNode is not None else "null"

            sb.append(tmp)
 
            if curNode is not None:
                queue.append(curNode.left)
                queue.append(curNode.right)

        new_len = 0

        # Check starting from end of sb_array where the value is not "null"
        for i in range(len(sb) - 1, -1, -1):
            if sb[i] == "null":
                continue
            else:
                new_len = i
                break

        # Remove those extra "null"
        if len(sb) > 0:
            sb = sb[0 : new_len + 1]

        return "[" + ", ".join(sb) + "]"


if __name__ == "__main__":
    # Example test cases
    test_cases = [
        {"root": [3,1,4,"null",2], "k": 1, "expected": 1},
        {"root": [5,3,6,2,4,"null","null",1], "k": 3, "expected": 3},
    ]

    for i, test_case in enumerate(test_cases):
        print(f"Test Case {i+1}:")
        Solution.testSolution(test_case)
        print(f"{'-'*30}")  
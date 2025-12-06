# Given the root of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).

 

# Example 1:


# Input: root = [3,9,20,null,null,15,7]
# Output: [[3],[9,20],[15,7]]
# Example 2:

# Input: root = [1]
# Output: [[1]]
# Example 3:

# Input: root = []
# Output: []
 

# Constraints:

# The number of nodes in the tree is in the range [0, 2000].
# -1000 <= Node.val <= 1000

# TC: O(n)
# SC: O(h), where h is the max num nodes on all levels

from collections import deque
from typing import Dict, List, Optional

# Definition for a binary tree node.

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def levelOrder(self, root: Optional[TreeNode]) -> List[List[int]]:
        if not root: return []

        # Using BFS
        q = deque([root])
        res = []

        while len(q):
            qLen = len(q)
            val = []
            for _ in range(qLen):
                node = q.popleft()
                val.append(node.val)

                if node.left: q.append(node.left)
                if node.right: q.append(node.right)
            res.append(val)
        return res
    
    @staticmethod
    def testSolution(input: Dict[str, List[str|int]]) -> None:
        bTree = Solution.BFSCreateBinaryTree(input["root"])
        print(f"Input: {Solution.BFSBinaryTreeToStr(bTree)}")
        print(f"Expected: {input['expected']}")

        res = Solution().levelOrder(bTree)

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
        {"root": [3,9,20,"null","null",15,7], "expected": [[3],[9,20],[15,7]]},
        {"root": [1], "expected": [[1]]},
        {"root": [], "expected": []},
    ]

    for i, test_case in enumerate(test_cases):
        print(f"Test Case {i+1}:")
        Solution.testSolution(test_case)
        print(f"{'-'*30}")
# Given the root of a binary tree, imagine yourself standing on the right side of it, return the values of the nodes you can see ordered from top to bottom.

 

# Example 1:

# Input: root = [1,2,3,null,5,null,4]

# Output: [1,3,4]

# Explanation:



# Example 2:

# Input: root = [1,2,3,4,null,null,null,5]

# Output: [1,3,4,5]

# Explanation:



# Example 3:

# Input: root = [1,null,3]

# Output: [1,3]

# Example 4:

# Input: root = []

# Output: []

 

# Constraints:

# The number of nodes in the tree is in the range [0, 100].
# -100 <= Node.val <= 100

from collections import deque
from typing import Dict, List, Optional

# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right
        
class Solution:
    def rightSideView(self, root: Optional[TreeNode]) -> List[int]:
        # Using BFS
        # We'll need a results list to hold the values as seen in the right hand side of the tree

        result = []
        queue = deque([])

        if not root: 
            return []

        queue.append(root)

        while(len(queue)):
            qLen = len(queue)
            node = queue[-1]  # save the node value from the end of the queue.

            result.append(node.val)

            while(qLen > 0):
                curNode = queue.popleft()
                if curNode.left is not None:
                    queue.append(curNode.left)
                if curNode.right is not None:
                    queue.append(curNode.right)
                
                qLen -= 1

        return result
    
    @staticmethod
    def testSolution(input: Dict[str, List[str|int]]) -> None:
        bTree = Solution.BFSCreateBinaryTree(input["root"])
        print(f"Input: {Solution.BFSBinaryTreeToStr(bTree)}")
        print(f"Expected: {input['expected']}")

        res = Solution().rightSideView(bTree)

        print(f"Result: {res}")
        print("\033[92mPASS\033[00m" if res == input["expected"] else "\033[91mFAIL\033[00m")

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
        {"root": [1,2,3,"null",5,"null",4], "expected": [1,3,4]},
        {"root": [1,2,3,4,"null","null","null",5], "expected": [1,3,4,5]},
        {"root": [1,"null",3], "expected": [1,3]},
        {"root": [], "expected": []},
    ]

    for i, test_case in enumerate(test_cases):
        print(f"Test Case {i+1}:")
        Solution.testSolution(test_case)
        print(f"{'-'*30}")
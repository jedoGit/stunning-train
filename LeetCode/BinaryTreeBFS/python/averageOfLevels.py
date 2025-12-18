# Given the root of a binary tree, return the average value of the nodes on each level in the form of an array. Answers within 10-5 of the actual answer will be accepted.
 

# Example 1:


# Input: root = [3,9,20,null,null,15,7]
# Output: [3.00000,14.50000,11.00000]
# Explanation: The average value of nodes on level 0 is 3, on level 1 is 14.5, and on level 2 is 11.
# Hence return [3, 14.5, 11].
# Example 2:


# Input: root = [3,9,20,15,7]
# Output: [3.00000,14.50000,11.00000]
 

# Constraints:

# The number of nodes in the tree is in the range [1, 104].
# -231 <= Node.val <= 231 - 1

# TC: O(n)
# SC: O(h), h is the max num of node of all levels


from collections import deque
from typing import Dict, List, Optional

# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def averageOfLevels(self, root: Optional[TreeNode]) -> List[float]:
        if not root:
            return []

        # Using BFS
        queue = deque([])
        avg = []

        queue.append(root)

        while len(queue):
            qLen = len(queue)
            cumSum = 0

            for i in range(qLen):
                node = queue.popleft()

                cumSum += node.val

                if node.left:
                    queue.append(node.left)
                if node.right:
                    queue.append(node.right)
        
            avg.append(cumSum/qLen)
        
        return avg
    
    @staticmethod
    def testSolution(input: Dict[str, List[str|int]]) -> None:
        bTree = Solution.BFSCreateBinaryTree(input["root"])
        print(f"Input: {Solution.BFSBinaryTreeToStr(bTree)}")
        print(f"Expected: {input['expected']}")

        res = Solution().averageOfLevels(bTree)

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
        {"root": [3,9,20,"null","null",15,7], "expected": [3.00000,14.50000,11.00000]},
        {"root": [3,9,20,15,7], "expected": [3.00000,14.50000,11.00000]},
    ]

    for i, test_case in enumerate(test_cases):
        print(f"Test Case {i+1}:")
        Solution.testSolution(test_case)
        print(f"{'-'*30}")
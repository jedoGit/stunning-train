from collections import deque
from typing import Dict, List, Optional

# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def maxDepth(self, root: Optional[TreeNode]) -> int:
        # Use DFS to compute max depth
        stack = []
        level = 0

        stack.append([root, 1])

        while len(stack) > 0:
            [node, dep] = stack.pop()

            if node is not None:
                level = max(level, dep)
                stack.append([node.left, dep + 1])
                stack.append([node.right, dep + 1])

        return level       

    @staticmethod
    def testSolution(input: Dict[str, List[str|int]]) -> None:
        # Create the Binary Tree from the input list using BFS
        binTree = Solution.BFSCreateBinaryTree(input["root"])

        # Print the Binary Tree and the expected output
        print("Input: " + Solution.BFSBinaryTreeToStr(binTree))
        print("Expected: " + str(input["expected"]))

        # Call the function to be tested
        res = Solution().maxDepth(binTree)

        # Print the result
        print("Result: " + str(res))

        # Validate the result
        print("PASS" if res == input["expected"] else "FAIL")
        print("-" * 50)

    @staticmethod
    def BFSCreateBinaryTree(node: List[int|str]) -> TreeNode:
        #  0 1 2  3    4    5  6
        # [3,9,20,null,null,15,7]
        #           3
        #        9     20
        #            15   7

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
            return "[ ]"
        
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

        return "[ " + ", ".join(sb) + " ]"

if __name__ == "__main__":
    input = {"root": [3,9,20,"null","null",15,7], "expected": 3}
    Solution.testSolution(input)

    input = {"root": [1,"null",2], "expected": 2}
    Solution.testSolution(input)
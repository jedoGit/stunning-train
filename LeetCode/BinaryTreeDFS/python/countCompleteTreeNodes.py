from typing import Dict
from typing import List
from typing import Optional
from collections import deque

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def __init__(self):
        # Init to 0
        self.nodeCount = 0

    def countNodes(self, root: Optional[TreeNode]) -> int:
        if root is None:
            return 0
        
        self.nodeCount = 0

        self.DFS(root)

        return self.nodeCount

    # Helper function to call recursively
    def DFS(self, node: Optional[TreeNode]) -> None:
        if node is None:
            return
        
        self.nodeCount += 1

        self.DFS(node.left)
        self.DFS(node.right)

    @staticmethod
    def testSolution(input: Dict[str, List[str|int]]) -> None:
        # Create the Binary Tree from the input list using BFS
        binTree = Solution.BFSCreateBinaryTree(input["root"])

        # Print the Binary Tree and the expected output
        print("Input: " + Solution.BFSBinaryTreeToStr(binTree))
        print("Expected: " + str(input["expected"]))

        # Call the function to be tested
        res = Solution().countNodes(binTree)

        # Print the result
        print("Result: " + str(res))

        # Validate the result
        print("PASS" if res == input["expected"] else "FAIL")
        print("-" * 50)

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
    input = {"root": [1,2,3,4,5,6], "expected": 6}
    Solution.testSolution(input)

    input = {"root": [], "expected": 0}
    Solution.testSolution(input)

    input = {"root": [1], "expected": 1}
    Solution.testSolution(input)

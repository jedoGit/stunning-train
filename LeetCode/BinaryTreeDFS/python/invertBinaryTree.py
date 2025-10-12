
# Definition for a binary tree node.
from collections import deque
from typing import Dict, List, Optional


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def invertTree(self, root: Optional[TreeNode]) -> Optional[TreeNode]:

        # Base case
        if root is None:
            return root
        
        # Now, lets swap the left and right child of this node
        tmp = None

        if root.left is not None:
            tmp = root.left

        root.left = root.right
        root.right = tmp

        # After we swap the children node, let's invert the children of the left and right nodes
        if root.left is not None:
            self.invertTree(root.left)
        if root.right is not None:
            self.invertTree(root.right)

        # After we invert the children node, we return the root
        return root

    @staticmethod
    def testSolution(input: Dict[str, List[str|int]]) -> None:
        # Create the Binary Tree from the input list using BFS
        binTree = Solution.BFSCreateBinaryTree(input["root"])
        expectedTree = Solution.BFSCreateBinaryTree(input["expected"])

        # Print the Binary Tree and the expected output
        print("Input: " + Solution.BFSTraversalPrint(binTree))
        print("Expected: " + Solution.BFSTraversalPrint(expectedTree))

        # Call the function to be tested
        res = Solution().invertTree(binTree)
   
        # Print the result
        print("Result: " + Solution.BFSTraversalPrint(res))

        # Validate the result
        print("PASS" if Solution.validateResult(res, expectedTree) else "FAIL")
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
    def BFSTraversalPrint(node: Optional[TreeNode]) -> None:
        #  Using BFS traversal to print tree value level by level

        if node == None:
            return "[ ]"

        s = "[ "

        queue = deque([node])

        while len(queue) > 0:
            cur_node = queue.popleft()

            val = cur_node.val if cur_node is not None else "null"
            s += str(val)
            s += ", "

            if cur_node is not None:
                queue.append(cur_node.left)
            
            if cur_node is not None:
                queue.append(cur_node.right) 

        if len(s) > 0:
            s = s[0 : len(s) - 2]

        s += " ]"

        return s

    @staticmethod
    def validateResult(res: Optional[TreeNode], expected: Optional[TreeNode]) -> bool:
        resList = []
        expectedList = []

        qRes = deque([res])
        qExpected = deque([expected])

        while len(qRes) > 0:
            curNode = qRes.popleft()

            resList.append(curNode.val if curNode is not None else "null")

            if curNode is not None:
                qRes.append(curNode.left)
                qRes.append(curNode.right)

        while len(qExpected) > 0:
            curNode = qExpected.popleft()
            
            expectedList.append(curNode.val if curNode is not None else "null")

            if curNode is not None:
                qExpected.append(curNode.left)
                qExpected.append(curNode.right)

        print(resList)
        print(expectedList)

        return resList == expectedList


if __name__ == "__main__":
    input = {"root": [4,2,7,1,3,6,9], "expected": [4,7,2,9,6,3,1]}
    Solution.testSolution(input)

    input = {"root": [2,1,3], "expected": [2,3,1]}
    Solution.testSolution(input)

    input = {"root": [], "expected": []}
    Solution.testSolution(input)

    input = {"root": [2,"null",3], "expected": [2,3,"null"]}
    Solution.testSolution(input)

    input = {"root": [2,3,"null"], "expected": [2,"null",3]}
    Solution.testSolution(input)
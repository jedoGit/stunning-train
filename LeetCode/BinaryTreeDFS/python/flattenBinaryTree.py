
from collections import deque
from typing import Dict, List, Optional


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def flatten(self, root: Optional[TreeNode]) -> None:
        """
        Do not return anything, modify root in-place instead.
        """
        if root is None:
            return root
        
        self.DFS(root)
    
    def DFS(self, root: Optional[TreeNode]) -> TreeNode:
        if root is None:
            return root
        # The order is necessary. We need to DFS on the left child first. Then DFS on the right child
        leftTail = self.DFS(root.left)
        rightTail = self.DFS(root.right)

        # Each time we DFS, we check for the left child
        # We need to connect the right child of the root, to the left tail 
        # Then, assight the left child to the right child
        # Lastly, set left child to null
        if root.left is not None:
            leftTail.right = root.right
            root.right = root.left
            root.left = None

        # Use boolean and it needs to be in this order. Compiler process OR statements left to right
        last = rightTail or leftTail or root

        return last


    @staticmethod
    def testSolution(input: Dict[str, List[str|int]]) -> None:
        # Create the Binary Tree from the input list using BFS
        binTree = Solution.BFSCreateBinaryTree(input["root"])
        expectedTree = Solution.BFSCreateBinaryTree(input["expected"])

        # Print the Binary Tree and the expected output
        print("Input: " + Solution.BFSBinaryTreeToStr(binTree))
        print("Expected: " + Solution.BFSBinaryTreeToStr(expectedTree))

        # Call the function to be tested
        Solution().flatten(binTree)
   
        # Print the result
        print("Result: " + Solution.BFSBinaryTreeToStr(binTree))

        # Validate the result
        print("PASS" if Solution.validateResult(binTree, expectedTree) else "FAIL")
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

        # print(resList)
        # print(expectedList)

        return resList == expectedList


if __name__ == "__main__":
    input = {"root": [1,2,5,3,4,"null",6], "expected": [1,"null",2,"null",3,"null",4,"null",5,"null",6]}
    Solution.testSolution(input)

    input = {"root": [], "expected": []}
    Solution.testSolution(input)

    input = {"root": [0], "expected": [0]}
    Solution.testSolution(input)

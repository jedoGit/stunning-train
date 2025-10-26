from collections import deque
from typing import Dict, List, Optional


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def buildTree(self, preorder: List[int], inorder: List[int]) -> Optional[TreeNode]:
        if len(preorder) == 0 and len(inorder) == 0:
            return None
        
        root = TreeNode(preorder[0])
        mid = inorder.index(preorder[0])
        root.left = self.buildTree(preorder[1 : mid + 1], inorder[0 : mid])
        root.right = self.buildTree(preorder[mid + 1:], inorder[mid + 1:])

        return root

    @staticmethod
    def testSolution(input: Dict[str, List[str | int]]) -> None:
        # Create the binary tree using BFS
        pBinTree = Solution.BFSCreateBinaryTree(input["preorder"])
        qBinTree = Solution.BFSCreateBinaryTree(input["inorder"])

        # Print the binary trees
        print("Input: p: " + Solution.BFSBinaryTreeToStr(pBinTree))
        print("Input: q: " + Solution.BFSBinaryTreeToStr(qBinTree))
        print("Expected: " + str(input["expected"]))

        # Call the function to be tested
        res = Solution().buildTree(input["preorder"], input["inorder"])

        # Print the result
        print("Result: " + Solution.BFSBinaryTreeToStr(res))

        # Validate the result
        expectedBinTree = Solution.BFSCreateBinaryTree(input["expected"])
        print("PASS" if Solution.ValidateResult(res, expectedBinTree) else "FAIL")
        print("-" * 50)

    @staticmethod
    def BFSCreateBinaryTree(listVal: List[str | int]) -> TreeNode:
        arLen = len(listVal)

        if arLen < 1:
            return None
        
        root =  TreeNode(listVal[0], None, None)
        i = 1

        # Using queue (BFS) to build the tree level by level
        queue = deque([root])

        while len(queue) > 0 and i < arLen:
            curNode = queue.popleft()

            if curNode is not None:
                # left child
                if i < arLen and listVal[i] is not None:
                    curNode.left = TreeNode(listVal[i], None, None)
                    queue.append(curNode.left)
                i += 1

                # right child
                if i < arLen and listVal[i] is not None:
                    curNode.right = TreeNode(listVal[i], None, None)
                    queue.append(curNode.right)
                i += 1

        return root
    
    @staticmethod
    def BFSBinaryTreeToStr(root: Optional[TreeNode]) -> str:

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
    
    @staticmethod
    def ValidateResult(res: Optional[TreeNode], expected: Optional[TreeNode]) -> bool:

        resStr = Solution.BFSBinaryTreeToStr(res)
        expectedStr = Solution.BFSBinaryTreeToStr(expected)

        return resStr == expectedStr

if __name__ == "__main__":
    input = {"preorder": [3,9,20,15,7], "inorder": [9,3,15,20,7], "expected": [3,9,20,"null","null",15,7]}
    Solution.testSolution(input)

    input = {"preorder": [-1], "inorder": [-1], "expected": [-1]}
    Solution.testSolution(input)
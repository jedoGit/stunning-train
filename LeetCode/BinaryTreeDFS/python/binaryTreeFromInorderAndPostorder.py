from collections import deque
from typing import Dict, List, Optional


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def buildTree(self, inorder: List[int], postorder: List[int]) -> Optional[TreeNode]:
        # get the indices of each element of inorder array and convert to object
        inorder_index = { val: i for i, val in enumerate(inorder) }
        
        # Call the helper DFS function
        return self.DFS(0, len(inorder) - 1, postorder, inorder_index)
    
    def DFS(self, left: int, right: int, postorder: List[int], inorder_index: Dict[str, int]) -> Optional[TreeNode]:
        # Base case
        if left > right:
            return None
        
        if len(postorder) < 1:
            return None
        
        # The root is always at the end of a post order tree
        root = TreeNode(postorder.pop())

        # Let's get the index of the root from the inorder list
        idx = inorder_index[root.val]

        # Assign the children and DFS
        root.right = self.DFS(idx + 1, right, postorder, inorder_index)
        root.left = self.DFS(left, idx - 1, postorder, inorder_index)

        return root

    @staticmethod
    def testSolution(input: Dict[str, List[str | int]]) -> None:
        # Create the binary tree using BFS
        pBinTree = Solution.BFSCreateBinaryTree(input["inorder"])
        qBinTree = Solution.BFSCreateBinaryTree(input["postorder"])

        # Print the binary trees
        print("Input: inorder: " + Solution.BFSBinaryTreeToStr(pBinTree))
        print("Input: postorder: " + Solution.BFSBinaryTreeToStr(qBinTree))
        print("Expected: " + str(input["expected"]))

        # Call the function to be tested
        res = Solution().buildTree(input["inorder"], input["postorder"])

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
    input = {"inorder": [9,3,15,20,7], "postorder": [9,15,7,20,3], "expected": [3,9,20,"null","null",15,7]}
    Solution.testSolution(input)

    input = {"inorder": [-1], "postorder": [-1], "expected": [-1]}
    Solution.testSolution(input)
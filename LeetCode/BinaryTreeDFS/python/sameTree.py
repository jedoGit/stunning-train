# Definition for a binary tree node.
from collections import deque
from typing import Dict, List, Optional


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right
        
class Solution:
    def isSameTree(self, p: Optional[TreeNode], q: Optional[TreeNode]) -> bool:
        # Using recursive DFS
        # base case
        if p is None and q is None:
            return True
        
        # check node if equal
        if p is None or q is None or p.val != q.val:
            return False

        # At each recursion, we check if both trees are equal, so we compare the right
        # from the left and both should be true
        return (self.isSameTree(p.left, q.left) and self.isSameTree(p.right, q.right))

    @staticmethod
    def testSolution(input: Dict[str, List[str | int]]) -> None:
        # Create the binary tree using BFS
        pBinTree = Solution.BFSCreateBinaryTree(input["p"])
        qBinTree = Solution.BFSCreateBinaryTree(input["q"])

        # Print the binary trees
        print("Input: p: " + Solution.BFSBinaryTreeToStr(pBinTree))
        print("Input: q: " + Solution.BFSBinaryTreeToStr(qBinTree))
        print("Expected: " + str(input["expected"]))

        # Call the function to be tested
        res = Solution().isSameTree(pBinTree, qBinTree)

        # Print the result
        print("Result: " + str(res))

        # Validate the result
        print("PASS" if res == input["expected"] else "FAIL")
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

if __name__ == "__main__":
    input = {"p": [1,2,3], "q": [1,2,3], "expected": True}
    Solution.testSolution(input)

    input = {"p": [1,2], "q": [1,"null",2], "expected": False}
    Solution.testSolution(input)

    input = {"p": [1,2,1], "q": [1,1,2], "expected": False}
    Solution.testSolution(input)
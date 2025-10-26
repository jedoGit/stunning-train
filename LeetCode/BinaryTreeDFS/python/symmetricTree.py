# Definition for a binary tree node.
from collections import deque
from typing import Dict, List, Optional


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def isSymmetric(self, root: Optional[TreeNode]) -> bool:
        # Use BFS to check if left child is the same as right child
        if root is None:
            return True
        
        queue = deque([]) # initialize deque with empty list
        queue.append([root.left, root.right]) # add the pair of children as a list => [[child.left, child.right]]

        while len(queue) > 0 :
            qlen = len(queue)

            for _ in range(qlen):
                [nodeL, nodeR] = queue.popleft()

                if nodeL is None and nodeR is None:
                    continue
                elif nodeL is None or nodeR is None:
                    return False
                elif nodeL.val != nodeR.val:
                    return False
                else:
                    queue.append([nodeL.left, nodeR.right])
                    queue.append([nodeL.right, nodeR.left])
        
        return True

    @staticmethod
    def testSolution(input: Dict[str, List[str|int]]) -> None:
        # Create the Binary Tree from the input list using BFS
        binTree = Solution.BFSCreateBinaryTree(input["root"])

        # Print the Binary Tree and the expected output
        print("Input: " + Solution.BFSBinaryTreeToStr(binTree))
        print("Expected: " + str(input["expected"]))

        # Call the function to be tested
        res = Solution().isSymmetric(binTree)

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
    input = {"root": [1,2,2,3,4,4,3], "expected": True}
    Solution.testSolution(input)

    input = {"root": [1,2,2,"null",3,"null",3], "expected": False}
    Solution.testSolution(input)
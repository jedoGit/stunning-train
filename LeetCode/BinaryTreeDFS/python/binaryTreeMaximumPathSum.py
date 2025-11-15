from collections import deque
from typing import Dict, List, Optional


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def __init__(self):
        self.res = 0

    def maxPathSum(self, root: Optional[TreeNode]) -> int:
        #  Using a global variable and using an array for ease of manipulation
        self.res = [root.val]

        self.DFS(root)

        return self.res[0]
    
    def DFS(self, root: Optional[TreeNode]) -> int:
        if root is None:
            return 0
        
        leftMax = self.DFS(root.left)
        rightMax = self.DFS(root.right)

        # DFS could return negative value, if negative, we want to use zero instead and not include the negative value
        leftMax = max(leftMax, 0)
        rightMax = max(rightMax, 0)

        # Compute the max path with split to both children
        self.res[0] = max(self.res[0], root.val + leftMax + rightMax)

        return root.val + max(leftMax, rightMax)

    @staticmethod
    def testSolution(input: Dict[str, List[str|int]]) -> None:
        # Create the Binary Tree from the input list using BFS
        binTree = Solution.BFSCreateBinaryTree(input["root"])

        # Print the Binary Tree and the expected output
        print("Input: " + Solution.BFSBinaryTreeToStr(binTree))
        print("Expected: " + str(input["expected"]))

        # Call the function to be tested
        res = Solution().maxPathSum(binTree)
   
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

    # @staticmethod
    # def validateResult(res: Optional[TreeNode], expected: Optional[TreeNode]) -> bool:
    #     resList = []
    #     expectedList = []

    #     qRes = deque([res])
    #     qExpected = deque([expected])

    #     while len(qRes) > 0:
    #         curNode = qRes.popleft()

    #         resList.append(curNode.val if curNode is not None else "null")

    #         if curNode is not None:
    #             qRes.append(curNode.left)
    #             qRes.append(curNode.right)

    #     while len(qExpected) > 0:
    #         curNode = qExpected.popleft()
            
    #         expectedList.append(curNode.val if curNode is not None else "null")

    #         if curNode is not None:
    #             qExpected.append(curNode.left)
    #             qExpected.append(curNode.right)

    #     # print(resList)
    #     # print(expectedList)

    #     return resList == expectedList

if __name__ == "__main__":
    input = {"root": [1,2,3], "expected": 6}
    Solution.testSolution(input)

    input = {"root": [-10,9,20,"null","null",15,7], "expected": 42}
    Solution.testSolution(input)

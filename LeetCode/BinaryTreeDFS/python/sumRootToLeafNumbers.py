from collections import deque
from typing import Dict, List, Optional


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def sumNumbers(self, root: Optional[TreeNode]) -> int:
        return self.DFS(root, 0)
    
    def DFS(self, cur: Optional[TreeNode], num: int) -> int:
        if cur is None:
            return 0
        
        num = num * 10 + cur.val

        if cur.left is None and cur.right is None:
            return num
        
        return self.DFS(cur.left, num) + self.DFS(cur.right, num)

    @staticmethod
    def testSolution(input: Dict[str, List[str|int]]) -> None:
        # Create the Binary Tree from the input list using BFS
        binTree = Solution.BFSCreateBinaryTree(input["root"])

        # Print the Binary Tree and the expected output
        print("Input: " + Solution.BFSBinaryTreeToStr(binTree))
        print("Expected: " + str(input["expected"]))

        # Call the function to be tested
        res = Solution().sumNumbers(binTree)
   
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
    input = {"root": [1,2,3], "expected": 25}
    Solution.testSolution(input)

    input = {"root": [4,9,0,5,1], "expected": 1026}
    Solution.testSolution(input)

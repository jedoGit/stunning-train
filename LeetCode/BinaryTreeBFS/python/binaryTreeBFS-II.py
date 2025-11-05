# Definition for a Node.
from collections import deque
from typing import Dict, List, Optional


class Node:
    def __init__(self, val: int = 0, left: 'Node' = None, right: 'Node' = None, next: 'Node' = None):
        self.val = val
        self.left = left
        self.right = right
        self.next = next

class Solution:
    def connect(self, root: 'Node') -> 'Node':
        if root is None:
            return None
        
        # Using BFS iterative
        queue = deque([root])

        while len(queue) > 0:
            pre = None
            qLen = len(queue)
            while qLen > 0:
                cur = queue.popleft()

                if pre is not None:
                    pre.next = cur

                if cur is not None and cur.left is not None:
                    queue.append(cur.left)

                if cur is not None and cur.right is not None:
                    queue.append(cur.right)

                pre = cur

                qLen -= 1

        return root

    @staticmethod
    def testSolution(input: Dict[str, List[str | int]]) -> None:
        # Create the binary tree using BFS
        rBinTree = Solution.BFSCreateBinaryTree(input["root"])
        expectedBinTree = Solution.BFSCreateBinaryTree(input["expected"])

        # Print the binary trees
        print("Input: r: " + Solution.BFSBinaryTreeToStr(rBinTree))
        print("Expected: " + Solution.BFSBinaryTreeToStr(expectedBinTree))

        # Call the function to be tested
        res = Solution().connect(rBinTree)

        # Print the result
        print("Result: " + Solution.BFSBinaryTreeOutputToStr(res))

        # Validate the result
        print("PASS" if Solution.ValidateResult(res, expectedBinTree) else "FAIL")
        print("-" * 50)

    @staticmethod
    def BFSCreateBinaryTree(listVal: List[str | int]) -> Node:
        arLen = len(listVal)

        if arLen < 1:
            return None
        
        root =  Node(listVal[0], None, None)
        i = 1

        # Using queue (BFS) to build the tree level by level
        queue = deque([root])

        while len(queue) > 0 and i < arLen:
            curNode = queue.popleft()

            if curNode is not None:
                # left child
                if i < arLen and listVal[i] != "null":
                    curNode.left = Node(listVal[i], None, None)
                    queue.append(curNode.left)
                i += 1

                # right child
                if i < arLen and listVal[i] != "null":
                    curNode.right = Node(listVal[i], None, None)
                    queue.append(curNode.right)
                i += 1

        return root
    
    @staticmethod
    def BFSBinaryTreeToStr(root: Optional[Node]) -> str:

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
    def BFSBinaryTreeOutputToStr(root: Optional[Node]) -> str:

        if root is None:
            return "[]"
        
        sb = []

        # Using queue (BFS) to build the tree level by level
        queue = deque([root])


        while len(queue) > 0:
            curNode = queue.popleft()

            curNodeLine = curNode

            while curNodeLine is not None:
                # append the val
                tmp = str(curNodeLine.val)
                sb.append(tmp)

                if curNodeLine.next is None:
                    # Add "#" to signify end of each level
                    sb.append("#")
                    break
                else:
                    curNodeLine = curNodeLine.next
 
            if curNode is not None:
                queue.append(curNode.left)

        return "[" + ", ".join(sb) + "]"
    
    @staticmethod
    def ValidateResult(res: Optional[Node], expected: Optional[Node]) -> bool:

        resStr = Solution.BFSBinaryTreeOutputToStr(res)
        expectedStr = Solution.BFSBinaryTreeToStr(expected)

        return resStr == expectedStr

if __name__ == "__main__":
    input = {"root": [1,2,3,4,5,"null",7], "expected": [1,"#",2,3,"#",4,5,7,"#"]}
    Solution.testSolution(input)

    input = {"root": [], "expected": []}
    Solution.testSolution(input)    
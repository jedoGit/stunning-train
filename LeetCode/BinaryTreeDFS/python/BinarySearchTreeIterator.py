from collections import deque
from typing import Optional, Dict, List

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class BSTIterator:

    def __init__(self, root: Optional[TreeNode]):
        # We'll be using a stack
        self.stack = []

        # We'll add only the root and the left child to the stack
        # This is iterative DFS until there's no more left child
        # This is due to the in-order traversal constraint
        cur = root
        while cur is not None:
            self.stack.append(cur)
            cur = cur.left

    def next(self) -> int:
        res = self.stack.pop()
        # Once we pop the node added to the stack,
        # we'll need to check if that node has a right child
        # if it does, add the left child by iterative DFS'ing it
        cur = res.right
        while cur is not None:
            self.stack.append(cur)
            cur = cur.left 
        
        # return the value of the node we just popped.
        return res.val

    def hasNext(self) -> bool:
        return len(self.stack) > 0

    @staticmethod
    def testSolution(input: Dict[str, List[str|int]]) -> None:
        print("Input: operations: {}".format(input["operations"]))
        print("Input: values: {}".format(input["values"]))
        print("Expected: {}".format(input["expected"]))
        output = []
        soln = None
        for i in range(0, len(input["operations"])):
            oper = input["operations"][i]
            if oper == "BSTIterator":
                output.append("null")
                treeRoot = BSTIterator.BFSCreateBinaryTree(input["values"][i][0])
                soln = BSTIterator(treeRoot)
            elif oper == "next":
                output.append(str(soln.next()))
            elif oper == "hasNext":
                output.append(str(soln.hasNext()).lower())

        print("Result: {}".format(output))
        print("PASS" if input["expected"] == output else "FAIL")
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
    input = {"operations": ["BSTIterator","next","next","hasNext","next","hasNext","next","hasNext","next","hasNext"],
             "values": [[["7","3","15","null","null","9","20"]],[],[],[],[],[],[],[],[],[]],
             "expected": ["null","3","7","true","9","true","15","true","20","false"]}
    
    BSTIterator.testSolution(input)
"""
# Definition for a Node.
"""
from typing import Dict, List, Optional

class Node:
    def __init__(self, x: int, next: 'Node' = None, random: 'Node' = None):
        self.val = int(x)
        self.next = next
        self.random = random

class Solution:
    def copyRandomList(self, head: 'Optional[Node]') -> 'Optional[Node]':
        oldToCopy = {None: None}

        cur = head

        while cur is not None:
            oldToCopy[cur] = Node(cur.val)
            cur = cur.next

        cur = head

        while cur is not None:
            copy = oldToCopy[cur]

            copy.next = oldToCopy.get(cur.next)
            copy.random = oldToCopy.get(cur.random)

            cur = cur.next

        return oldToCopy[head]

    @staticmethod
    def createLinkedList(headVals: List[int]) -> Optional[Node]:
        arLen = len(headVals)

        lNodesList = []

        for i in range(arLen):
            lNodesList.append(Node(headVals[i][0]))

            if i > 0:
                lNodesList[i - 1].next = lNodesList[i]

            if i == arLen - 1:
                lNodesList[i].next = None

        for i in range(arLen):
            lNodesList[i].random = None if headVals[i][1] == "null" else lNodesList[headVals[i][1]]
        
        return lNodesList[0]
        
    @staticmethod
    def linkedListValueToString(ll: Optional[Node]) -> str:
        if ll == None:
            return ""

        s = "["

        while ll is not None:
            tmp1 = ll.val
            tmp2 = str(ll.random.val) if ll.random != None else "null"

            s += "["
            s += str(tmp1)
            s += ", "
            s += tmp2
            s += "], "

            ll = ll.next

        if len(s) > 0:
            s = s[0 : len(s) - 2]

        s += "]"

        return s

    @staticmethod
    def validateResult(res: Optional[Node], expected: Optional[Node]) -> bool:
        resList = []
        expectedList = []

        while res is not None:
            resList.append([res.val, res.random.val if res.random != None else "null"])
            res = res.next

        while expected is not None:
            expectedList.append([expected.val, expected.random.val if expected.random != None else "null"])
            expected = expected.next

        # print(resList)

        return resList == expectedList
    
    @staticmethod
    def testSolution(input: Dict[str, List[int]]) -> None:
        l1 = Solution.createLinkedList(input["l1"])
        expected = Solution.createLinkedList(input["expected"])

        print("Input head1 array [val, index pointing]: {}".format(input["l1"]) )
        print("Input LL [val, random.val]: " + Solution.linkedListValueToString(l1))
        print("Expected array [val, index pointing]: {}".format(input["expected"]) )
        print("Expected LL [val, random.val]: " + Solution.linkedListValueToString(expected))
        res = Solution().copyRandomList(l1)
        print("Result LL [val, random.val]: " + Solution.linkedListValueToString(res))
        print("PASS" if Solution.validateResult(res, expected) else "FAIL")
        print("-" * 50)

if __name__ == "__main__":
    input = {"l1": [[7,"null"],[13,0],[11,4],[10,2],[1,0]], "expected": [[7,"null"],[13,0],[11,4],[10,2],[1,0]]}
    Solution.testSolution(input)

    input = {"l1": [[1,1],[2,1]], "expected": [[1,1],[2,1]]}
    Solution.testSolution(input)

    input = {"l1": [[3,"null"],[3,0],[3,"null"]], "expected": [[3,"null"],[3,0],[3,"null"]]}
    Solution.testSolution(input)


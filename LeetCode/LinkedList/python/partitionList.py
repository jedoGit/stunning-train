# Definition for singly-linked list.
from typing import Dict, List, Optional


class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def partition(self, head: Optional[ListNode], x: int) -> Optional[ListNode]:
        left = ListNode()
        right = ListNode()

        cur = head
        curLeft = left
        curRight = right

        while cur is not None:
            if cur.val < x:
                curLeft.next = cur
                curLeft = curLeft.next
            else:
                curRight.next = cur
                curRight = curRight.next
            
            cur = cur.next
        
        curLeft.next = right.next

        curRight.next = None

        return left.next

    @staticmethod
    def testSolution(input: Dict[str, List[int] | int]) -> None:
        l1 = Solution.createLinkedList(input["llVals"])
        expected = Solution.createLinkedList(input["expected"])

        print("Input: head vals: " + Solution.linkedListValueToString(l1))
        print("\tx: " + str(input["x"]))
        print("Expected: " + Solution.linkedListValueToString(expected))
        
        res = Solution().partition(l1, input["x"])

        print("Result: " + Solution.linkedListValueToString(res))
        print("PASS" if Solution.validateResult(res, expected) else "FAIL")
        print("-" * 50)

    @staticmethod
    def createLinkedList(headVals: List[int]) -> Optional[ListNode]:
        arLen = len(headVals)

        if arLen < 1:
            return None

        lNodesList = []

        for i in range(arLen):
            lNodesList.append(ListNode(headVals[i]))

            if i > 0:
                lNodesList[i - 1].next = lNodesList[i]

            if i == arLen - 1:
                lNodesList[i].next = None
        
        return lNodesList[0]

    @staticmethod
    def linkedListValueToString(ll: Optional[ListNode]) -> str:
        if ll == None:
            return "[ ]"

        s = "[ "

        while ll is not None:
            tmp = ll.val
            s += str(tmp)
            s += ", "
            ll = ll.next

        if len(s) > 0:
            s = s[0 : len(s) - 2]

        s += " ]"

        return s

    @staticmethod
    def validateResult(res: Optional[ListNode], expected: Optional[ListNode]) -> bool:
        if res is None and expected is None:
            return True

        resList = []
        expectedList = []

        while res is not None:
            resList.append(res.val)
            res = res.next

        while expected is not None:
            expectedList.append(expected.val)
            expected = expected.next

        return resList == expectedList

if __name__ == "__main__":
    input = {"llVals": [1,4,3,2,5,2], "x": 3, "expected": [1,2,2,4,3,5]}
    Solution.testSolution(input)

    input = {"llVals": [2,1], "x": 2, "expected": [1,2]}
    Solution.testSolution(input)
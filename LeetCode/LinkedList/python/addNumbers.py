# Definition for singly-linked list.
from typing import Dict, List, Optional


class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def addTwoNumbers(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:
        dummy = ListNode(0)
        cur = dummy

        carry = 0

        while l1 is not None or l2 is not None or carry is not 0:
            v1 = l1.val if l1 is not None else 0
            v2 = l2.val if l2 is not None else 0

            val = v1 + v2 + carry

            carry = val // 10
            val = val % 10

            cur.next = ListNode(val)

            cur = cur.next

            l1 = l1.next if l1 is not None else None
            l2 = l2.next if l2 is not None else None

        return dummy.next
    
    @staticmethod
    def createLinkedList(headVals: List[int]) -> Optional[ListNode]:
        arLen = len(headVals)

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
            return ""

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
        resList = []
        expectedList = []

        while res is not None:
            resList.append(res.val)
            res = res.next

        while expected is not None:
            expectedList.append(expected.val)
            expected = expected.next

        return resList == expectedList
    
    @staticmethod
    def testSolution(input: Dict[str, List[int]]) -> None:
        l1 = Solution.createLinkedList(input["l1"])
        l2 = Solution.createLinkedList(input["l2"])
        expected = Solution.createLinkedList(input["expected"])

        print("Input: head1 vals: " + Solution.linkedListValueToString(l1))
        print("\thead2 vals: " + Solution.linkedListValueToString(l2))
        print("Expected: " + Solution.linkedListValueToString(expected))
        res = Solution().addTwoNumbers(l1, l2)
        print("Result: " + Solution.linkedListValueToString(res))
        print("PASS" if Solution.validateResult(res, expected) else "FAIL")
        print("-" * 50)

if __name__ == "__main__":
    input = {"l1": [2,4,3], "l2": [5,6,4], "expected": [7,0,8]}
    Solution.testSolution(input)

    input = {"l1": [0], "l2": [0], "expected": [0]}
    Solution.testSolution(input)

    input = {"l1": [9,9,9,9,9,9,9], "l2": [9,9,9,9], "expected": [8,9,9,9,0,0,0,1]}
    Solution.testSolution(input)


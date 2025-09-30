# Definition for singly-linked list.
from typing import Dict, List, Optional


class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    
    def rotateRight(self, head: Optional[ListNode], k: int) -> Optional[ListNode]:
        if head == None:
            return head
        
        len = 1
        tail = head

        while tail.next is not None:
            tail = tail.next
            len += 1

        k_ = k % len
        if k_ == 0:
            return head
        
        cur = head
        for i in range(0, len - k_ - 1):
            cur = cur.next
        
        newHead = cur.next
        cur.next = None
        tail.next = head

        return newHead

    @staticmethod
    def testSolution(input: Dict[str, List[int] | int]) -> None:
        l1 = Solution.createLinkedList(input["llVals"])
        expected = Solution.createLinkedList(input["expected"])

        print("Input: head vals: " + Solution.linkedListValueToString(l1))
        print("\tk: " + str(input["k"]))
        print("Expected: " + Solution.linkedListValueToString(expected))
        
        res = Solution().rotateRight(l1, input["k"])

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
    input = {"llVals": [1,2,3,4,5], "k": 2, "expected": [4,5,1,2,3]}
    Solution.testSolution(input)

    input = {"llVals": [0,1,2], "k": 4, "expected": [2,0,1]}
    Solution.testSolution(input)
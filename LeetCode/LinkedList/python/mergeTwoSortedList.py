# Definition for singly-linked list.
from typing import Dict, List, Optional


class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def mergeTwoLists(self, list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:
        dummy = ListNode(0)
        tail = dummy

        while list1 is not None and list2 is not None:
            if list1.val < list2.val:
                tail.next = list1
                list1 = list1.next
            else:
                tail.next = list2
                list2 = list2.next
            
            tail = tail.next

        if list1 is not None:
            tail.next = list1
        elif list2 is not None:
            tail.next = list2

        return dummy.next

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
    
    @staticmethod
    def testSolution(input: Dict[str, List[int]]) -> None:
        l1 = Solution.createLinkedList(input["l1"])
        l2 = Solution.createLinkedList(input["l2"])
        expected = Solution.createLinkedList(input["expected"])

        print("Input: head1 vals: " + Solution.linkedListValueToString(l1))
        print("\thead2 vals: " + Solution.linkedListValueToString(l2))
        print("Expected: " + Solution.linkedListValueToString(expected))
        res = Solution().mergeTwoLists(l1, l2)
        print("Result: " + Solution.linkedListValueToString(res))
        print("PASS" if Solution.validateResult(res, expected) else "FAIL")
        print("-" * 50)

if __name__ == "__main__":
    input = {"l1": [1,2,4], "l2": [1,3,4], "expected": [1,1,2,3,4,4]}
    Solution.testSolution(input)

    input = {"l1": [], "l2": [], "expected": []}
    Solution.testSolution(input)

    input = {"l1": [], "l2": [0], "expected": [0]}
    Solution.testSolution(input)


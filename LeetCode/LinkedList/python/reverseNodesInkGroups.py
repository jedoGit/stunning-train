# Definition for singly-linked list.
from typing import Dict, List, Optional


class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next
        
class Solution:
    def reverseKGroup(self, head: Optional[ListNode], k: int) -> Optional[ListNode]:

        dummy = ListNode(0, head)
        groupPrev  = dummy

        while True:
            kth = self.getKth(groupPrev, k)

            if kth is None:
                break
            
            groupNext = kth.next

            prev = kth.next
            cur = groupPrev.next
            tmp = None

            while cur is not groupNext:
                tmp = cur.next
                cur.next = prev
                prev = cur
                cur = tmp

            tmp = groupPrev.next
            groupPrev.next = kth
            groupPrev = tmp

        return dummy.next
    
    def getKth(self, cur: Optional[ListNode], k: int) -> Optional[ListNode]:
        while cur is not None and k > 0:
            cur = cur.next
            k -= 1
        
        return cur

    @staticmethod
    def testSolution(input: Dict[str, List[int] | int ]) -> None:
        l1 = Solution.createLinkedList(input["headVals"])
        expected = Solution.createLinkedList(input["expectedVals"])

        print("Input: head vals: " + Solution.linkedListValueToString(l1))
        print("\tk: " + str(input["k"]))
        print("Expected: " + Solution.linkedListValueToString(expected))
        res = Solution().reverseKGroup(l1, input["k"])
        print("Result: " + Solution.linkedListValueToString(res))
        print("PASS" if Solution.validateResult(res, expected) else "FAIL")
        print("-" * 50)

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

if __name__ == "__main__":
    input = {"headVals": [1,2,3,4,5], "k": 2, "expectedVals": [2,1,4,3,5]}
    Solution.testSolution(input)

    input = {"headVals": [1,2,3,4,5], "k": 3, "expectedVals": [3,2,1,4,5]}
    Solution.testSolution(input)
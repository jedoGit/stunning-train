from typing import Dict, List, Optional


class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def deleteDuplicates(self, head: Optional[ListNode]) -> Optional[ListNode]:

        dummy = ListNode(0, head)
        cur = dummy

        while cur is not None:
            if cur.next is not None and cur.next.next is not None and cur.next.val == cur.next.next.val:
                temp = cur.next.next
                
                while temp is not None and temp.next is not None and temp.val == temp.next.val:
                    temp = temp.next
                
                cur.next = temp.next
            else:
                cur = cur.next

        return dummy.next

    @staticmethod
    def testSolution(input: Dict[str, List[int] | int]) -> None:
        l1 = Solution.createLinkedList(input["llVals"])
        expected = Solution.createLinkedList(input["expected"])

        print("Input: head vals: " + Solution.linkedListValueToString(l1))
        print("Expected: " + Solution.linkedListValueToString(expected))
        
        res = Solution().deleteDuplicates(l1)

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
    input = {"llVals": [1,2,3,3,4,4,5], "expected": [1,2,5]}
    Solution.testSolution(input)

    input = {"llVals": [1,1,1,2,3], "expected": [2,3]}
    Solution.testSolution(input)
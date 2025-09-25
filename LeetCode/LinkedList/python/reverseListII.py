from typing import Dict, List, Optional

# Definition for singly-linked list.
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next
        
class Solution:
    def reverseBetween(self, head: Optional[ListNode], left: int, right: int) -> Optional[ListNode]:
        dummy = ListNode(0, head)

        leftPrev = dummy
        cur = head

        # Move the leftPrev pointer to the node position left - 1
        for i in range(left - 1):
            leftPrev = cur
            cur = cur.next

        prev = None

        # cur points to node position left at this point
        for i in range(right - left + 1):
            tmpNext = cur.next
            cur.next = prev
            prev = cur
            cur = tmpNext

        leftPrev.next.next = cur
        leftPrev.next = prev

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

        while res is not None and expected is not None:
            if res.val != expected.val:
                return False

            res = res.next
            expected = expected.next

        return True
    
    @staticmethod
    def testSolution(input: Dict[str, List[int]]) -> None:
        l1 = Solution.createLinkedList(input["llVals"])
        expected = Solution.createLinkedList(input["expected"])

        print("Input: head vals: " + Solution.linkedListValueToString(l1))
        print("Expected: " + Solution.linkedListValueToString(expected))
        
        res = Solution().reverseBetween(l1, input["left"], input["right"])

        print("Result: " + Solution.linkedListValueToString(res))
        print("PASS" if Solution.validateResult(res, expected) else "FAIL")
        print("-" * 50)

if __name__ == "__main__":
    input = {"llVals": [1,2,3,4,5], "left": 2, "right": 4, "expected": [1,4,3,2,5]}
    Solution.testSolution(input)

    input = {"llVals": [5], "left": 1, "right": 1, "expected": [5]}
    Solution.testSolution(input)
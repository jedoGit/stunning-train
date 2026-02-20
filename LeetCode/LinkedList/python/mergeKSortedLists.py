from dataclasses import dataclass
from enum import Enum
from typing import List, Optional

# Definition for singly-linked list.
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Result(Enum):
    PASS = "\033[92mPASS\033[00m"
    FAIL = "\033[91mFAIL\033[00m"

@dataclass
class mergeKListsRecord:
    lists: List[List[int]]
    expected: List[int]

class Solution:
    def mergeKLists(self, lists: List[Optional[ListNode]]) -> Optional[ListNode]:
        if len(lists) < 1:
            return None

        while len(lists) > 1:
            l1: ListNode = lists.pop(0) # pop the first element
            l2: ListNode = lists.pop(0) # pop the first element

            newHead: ListNode = self.mergeList(l1, l2)
            lists.append(newHead)

        return lists[0]
    
    def mergeList(self, l1: ListNode, l2: ListNode) -> ListNode:
        dummy: ListNode = ListNode()
        tmp: ListNode =  dummy

        while l1 is not None and l2 is not None:
            if l1.val < l2.val:
                tmp.next = l1
                l1 = l1.next
            else:
                tmp.next = l2
                l2 = l2.next

            tmp = tmp.next

        tmp.next = l1 if l1 is not None else l2

        return dummy.next

    @staticmethod
    def testSolution(record: mergeKListsRecord) -> None:
        # Create a list of Linked Lists for the input
        llList: List[ListNode] = []

        for el in record.lists:
            llList.append(Solution.createLinkedList(el))

        # Print the list of linked list
        print(f"input: lists: [", end = "")
        for i, el in enumerate(llList):
            endVal = ", "
            if i == len(llList) - 1:
                endVal = ""
            print(f"{Solution.linkedListValueToString(el)}", end = endVal)
        print(f"]", end = "\n")

        expectedLL: ListNode = Solution.createLinkedList(record.expected)
        print(f"expected: {Solution.linkedListValueToString(expectedLL)}")

        # Call the mergeKLists()
        resultList: ListNode = Solution().mergeKLists(llList)

        print(f"result: {Solution.linkedListValueToString(resultList)}")
        print(Result.PASS.value if Solution.validateResult(resultList, expectedLL) else Result.FAIL.value)
        
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
            
        return res is None and expected is None

if __name__ == "__main__":
    records: List[mergeKListsRecord] = [
        mergeKListsRecord([[1,4,5],[1,3,4],[2,6]], [1,1,2,3,4,4,5,6]),
        mergeKListsRecord([], []),
        mergeKListsRecord([[]], [])
    ]

    for i, record in enumerate(records):
        print(f"# Test case {i + 1}")
        Solution.testSolution(record)
        print("-" * 50)
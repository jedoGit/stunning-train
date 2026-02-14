# Given the head of a linked list, return the list after sorting it in ascending order.

# Example 1:

# Input: head = [4,2,1,3]
# Output: [1,2,3,4]
# Example 2:

# Input: head = [-1,5,3,4,0]
# Output: [-1,0,3,4,5]
# Example 3:

# Input: head = []
# Output: []

# Constraints:

# The number of nodes in the list is in the range [0, 5 * 104].
# -105 <= Node.val <= 105

# Follow up: Can you sort the linked list in O(n logn) time and O(1) memory (i.e. constant space)?

from dataclasses import dataclass
from enum import Enum
from typing import List, Optional

class Result(Enum):
    PASS = "\033[92mPASS\033[00m"
    FAIL = "\033[91mFAIL\033[00m"

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

@dataclass
class sortListRecord:
    head: List[int]
    expected: List[int]

class Solution:
    def sortList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        if not head or not head.next:
            return head
        
        mid: ListNode = self._findMid(head)
        r: ListNode = mid.next

        mid.next = None

        l: ListNode = self.sortList(head)
        r = self.sortList(r)

        return self._mergeList(l, r)

    def _findMid(self, root: Optional[ListNode]) -> Optional[ListNode]:
        slow: ListNode = root
        fast: ListNode = root.next

        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next

        return slow
        
    def _mergeList(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:
        dummy: ListNode = ListNode(None)
        temp: ListNode = dummy

        while l1 and l2:
            if l1.val < l2.val:
                temp.next = l1
                l1 = l1.next
            else:
                temp.next = l2
                l2 = l2.next
               
            temp = temp.next
            
        temp.next = l1 or l2

        return dummy.next
    
    @staticmethod
    def testSolution(record: sortListRecord) -> None:
        l1_head: ListNode = Solution.createLinkedList(record.head)
        expected_head: ListNode = Solution.createLinkedList(record.expected)

        print(f"input: head vals: {Solution.linkedListValueToString(l1_head)}")
        print(f"expected: {Solution.linkedListValueToString(expected_head)}")

        res_head: ListNode = Solution().sortList(l1_head)

        print(f"result: {Solution.linkedListValueToString(res_head)}")
        print(Result.PASS.value if Solution.validateResult(res_head, expected_head) else Result.FAIL.value)

    @staticmethod
    def createLinkedList(headVals: List[int]) -> ListNode:
        headLen = len(headVals)

        if headLen < 1:
            return None
        
        nodeList: List[ListNode] = []

        for i in range(headLen):
            nodeList.append(ListNode(headVals[i]))

            # Connect the previous node to the current node
            if i > 0:
                nodeList[i - 1].next = nodeList[i]

            # If this is the last node, point it to null
            if i == headLen - 1:
                nodeList[i].next = None

        return nodeList[0]
    
    @staticmethod
    def linkedListValueToString(node: ListNode) -> str:
        if node == None:
            return "[ ]"
        
        s = "[ "

        while node is not None:
            tmp = node.val
            s += str(tmp)
            s += ", "
            node = node.next

        if len(s) > 0:
            s = s[0 : -2]
        
        s += " ]"

        return s
    
    @staticmethod
    def validateResult(resNode: ListNode, expectedNode: ListNode) -> bool:
        cur1 = resNode
        cur2 = expectedNode

        # Traverse through both LL and if val is not the same return false immediately
        while cur1 and cur2:
            if cur1.val != cur2.val:
                return False
            
            cur1 = cur1.next
            cur2 = cur2.next

        # If we've exited the while loop, it means one or both of the node is None.
        # We need to check that both are None, which means both LL are the same
        return cur1 is None and cur2 is None
    
if __name__ == "__main__":
    records: List[sortListRecord] = [
        sortListRecord([4,2,1,3], [1,2,3,4]),
        sortListRecord([-1,5,3,4,0], [-1,0,3,4,5]),
        sortListRecord([], [])
    ]

    for i, record in enumerate(records):
        print(f"# Test case {i + 1}")
        Solution.testSolution(record)
        print("-" * 50)
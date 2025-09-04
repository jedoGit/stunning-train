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


# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
from typing import Optional

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def sortList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        if not head or  not head.next:
            return head
        
        mid = self.findMid(head)
        r = mid.next

        mid.next = None

        l = self.sortList(head)
        r = self.sortList(r)

        return self.mergeList(l,r)

    def findMid(self,root):
        slow = root
        fast = root.next

        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next

        return slow
        
    def mergeList(self, l1,l2):
        dummy = ListNode(None)
        temp = dummy

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
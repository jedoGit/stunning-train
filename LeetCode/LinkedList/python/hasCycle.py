# Definition for singly-linked list.
from typing import Dict, List, Optional

class ListNode:
    def __init__(self, x):
        self.val = x
        self.next = None

class Solution:
    def hasCycle(self, head: Optional[ListNode]) -> bool:
        
        slow = head
        fast = head

        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next

            if slow == fast:
                return True
        
        return False
    
    @staticmethod
    def testSolution(input: Dict[str, Optional[ListNode] | int | bool]) -> None:
        lNodes = []

        # Create the Linked List
        for i in range(len(input["head"])):
            lNodes.append(ListNode(input["head"][i]))
            # print(lNodes[i].val)
        
        # Connect the Linked List
        # For the last element in the LL, connect it to the LL in the pointed by the pos value
        for i in range(len(lNodes) - 1, -1, -1):
            if i == len(lNodes) - 1:
                lNodes[i].next = lNodes[input["pos"]] if input["pos"] != -1 else None
            else:
                lNodes[i].next = lNodes[i + 1]
            # print(lNodes[i].next.val)

        print("Input: head vals: " + str(input["head"]))
        print("\tpos: " + str(input["pos"]))
        print("Expected: " + str(input["expected"]))
        res = Solution().hasCycle(lNodes[0])
        print("Result: " + str(res))
        print("PASS" if res == input["expected"] else "FAIL")
        print("-" * 50)

if __name__ == "__main__":    
    input = {"head": [3,2,0,-4], "pos": 1, "expected": True}
    Solution.testSolution(input)

    input = {"head": [1,2], "pos": 0, "expected": True}
    Solution.testSolution(input)

    input = {"head": [1], "pos": -1, "expected": False}
    Solution.testSolution(input)

        
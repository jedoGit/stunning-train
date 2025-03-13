# Given the root of a binary tree, return the zigzag level order traversal of its nodes' values. (i.e., from left to right, then right to left for the next level and alternate between).

# Example 1:

# Input: root = [3,9,20,null,null,15,7]
# Output: [[3],[20,9],[15,7]]
# Example 2:

# Input: root = [1]
# Output: [[1]]
# Example 3:

# Input: root = []
# Output: []

# Constraints:

# The number of nodes in the tree is in the range [0, 2000].
# -100 <= Node.val <= 100

# TC: O(n)
# SC: O(n/2) = O(n), worst case is the last level of the tree is full, if full, the number of nodes is n/2.


# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def zigzagLevelOrder(self, root: Optional[TreeNode]) -> List[List[int]]:
        res = []
        q = deque([root] if root else []) # python ternary operator

        while q:
            level = []

            for _ in range(len(q)):
                node = q.popleft()
                level.append(node.val)

                if node.left: q.append(node.left)
                if node.right: q.append(node.right)
            
            # reverse the level node values if the res.length is odd. res.length refers to the last node values added to res.
            if (len(res) % 2) == 1: 
                level = list(reversed(level)) # reversed is in-place, need to assign as a new list
            
            res.append(level)
        
        return res
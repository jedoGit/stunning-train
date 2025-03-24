# There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai.

# For example, the pair [0, 1], indicates that to take course 0 you have to first take course 1.
# Return true if you can finish all courses. Otherwise, return false.

# Example 1:

# Input: numCourses = 2, prerequisites = [[1,0]]
# Output: true
# Explanation: There are a total of 2 courses to take.
# To take course 1 you should have finished course 0. So it is possible.
# Example 2:

# Input: numCourses = 2, prerequisites = [[1,0],[0,1]]
# Output: false
# Explanation: There are a total of 2 courses to take.
# To take course 1 you should have finished course 0, and to take course 0 you should also have finished course 1. So it is impossible.

# Constraints:

# 1 <= numCourses <= 2000
# 0 <= prerequisites.length <= 5000
# prerequisites[i].length == 2
# 0 <= ai, bi < numCourses
# All the pairs prerequisites[i] are unique.

# TC: O(edge + Node(vertex)) - each Node(vertex) have edges going in and going out of each nodes, it's possible that you'll visit each nodes multiple times.
# SC: O(edge + Node(vertex)) - each Node(vertex) have edges going in and going out of each nodes, it's possible that you'll visit each nodes multiple times.

class Solution:
    def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:
        # Create an adjacency list of courses and prereqs
        # object comprehension. Create a k/v pair where k is the course number and the value is an empty array
        premap = { c:[] for c in range(numCourses) }
        
        # prerequisites is an array of arrays [[c,p],...,[c,p]]
        # we want: premap{1:[2,3]...}
        for c,p in prerequisites:
            premap[c].append(p)

        visited = set()

        # Helper function, DFS all courses in the premap. Returns false if course is in the visited set, true otherwise. Add course to visited set.
        def dfs(crs):
            if crs in visited: return False
            if len(premap[crs]) == 0: return True # premap[crs] returns an array. We check if the size of the array is 0. If zero, there's nothing to DFS.

            visited.add(crs)

            # DFS the courses
            for pre in premap[crs]:
                if not dfs(pre):
                    return False # We've visited this prerequisite and let's not visit it again... just return false

            # Let's remove course from visited set and empty the adjacency list for this course
            visited.remove(crs)
            premap[crs] = []

            return True
        
        # Let's DFS all course
        for c in range(numCourses):
            if not dfs(c): return False # We've visited this course before so, let's not continue
        
        return True

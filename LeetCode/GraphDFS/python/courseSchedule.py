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

from enum import Enum
from typing import Dict, List

class Result(Enum):
    PASS = "\033[92mPASS\033[00m"
    FAIL = "\033[91mFAIL\033[00m"

class Solution:

    def __init__(self):
        self.premap = None
        self.visited = set()

    def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:
        # Create an adjacency list of courses and prereqs
        # object comprehension. Create a k/v pair where k is the course number and the value is an empty array
        self.premap = { c:[] for c in range(numCourses) }
        
        # prerequisites is an array of arrays [[c,p],...,[c,p]]
        # we want: premap{1:[2,3]...}
        for c,p in prerequisites:
            self.premap[c].append(p)

        # Let's DFS all course
        for c in range(numCourses):
            if not self.DFS(c): return False # We've visited this course before so, let's not continue
        
        return True

    # Helper function, DFS all courses in the premap. Returns false if course is in the visited set, true otherwise. Add course to visited set.
    def DFS(self, crs: int) -> bool:
        if crs in self.visited: 
            return False
        
        if len(self.premap[crs]) == 0: 
            return True # premap[crs] returns an array. We check if the size of the array is 0. If zero, there's nothing to DFS.

        self.visited.add(crs)

        # DFS the courses
        for pre in self.premap[crs]:
            if not self.DFS(pre):
                return False # We've visited this prerequisite and let's not visit it again... just return false

        # Let's remove course from visited set and empty the adjacency list for this course
        self.visited.remove(crs)
        self.premap[crs] = []

        return True

    @staticmethod
    def testSolution(record: Dict[str, List[List[int]]] | bool) -> None:
        print(f"Input: numCourse: {record.get("numCourses")}")
        print(f"prerequisites: {record.get("prerequisites")}")
        print(f"expected: {record.get("expected")}")

        res = Solution().canFinish(record["numCourses"], record["prerequisites"])
        print(f"result: {res}")
        print(f"{Result.PASS.value if res == record.get("expected") else Result.FAIL.value}")

if __name__ == "__main__":
    records = [ {"numCourses": 2, "prerequisites": [[1,0]], "expected": True},
                {"numCourses": 2, "prerequisites": [[1,0],[0,1]], "expected": False}
              ]
    
    for i, record in enumerate(records):
        print(f"Test case {i+1}")
        Solution.testSolution(record)
        print(f"{'-' * 50}")
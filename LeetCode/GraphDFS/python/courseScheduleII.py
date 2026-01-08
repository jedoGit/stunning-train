# There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai.

# For example, the pair [0, 1], indicates that to take course 0 you have to first take course 1.
# Return the ordering of courses you should take to finish all courses. If there are many valid answers, return any of them. If it is impossible to finish all courses, return an empty array.

# Example 1:

# Input: numCourses = 2, prerequisites = [[1,0]]
# Output: [0,1]
# Explanation: There are a total of 2 courses to take. To take course 1 you should have finished course 0. So the correct course order is [0,1].
# Example 2:

# Input: numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]
# Output: [0,2,1,3]
# Explanation: There are a total of 4 courses to take. To take course 3 you should have finished both courses 1 and 2. Both courses 1 and 2 should be taken after you finished course 0.
# So one correct course order is [0,1,2,3]. Another correct ordering is [0,2,1,3].
# Example 3:

# Input: numCourses = 1, prerequisites = []
# Output: [0]

# Constraints:

# 1 <= numCourses <= 2000
# 0 <= prerequisites.length <= numCourses * (numCourses - 1)
# prerequisites[i].length == 2
# 0 <= ai, bi < numCourses
# ai != bi
# All the pairs [ai, bi] are distinct.

# TC: O(edge + Node(vertex)) - each Node(vertex) have edges going in and going out of each nodes, it's possible that you'll visit each nodes multiple times.
# SC: O(edge + Node(vertex)) - each Node(vertex) have edges going in and going out of each nodes, it's possible that you'll visit each nodes multiple times.

from enum import Enum
from typing import Dict, List


class Result(Enum):
    PASS = "\033[92mPASS\033[00m"
    FAIL = "\033[91mFAIL\033[00m"

class Solution:
    def __init__(self):
        self.prereq = {}
        self.output = []
        self.visited = set()
        self.cycle = set()

    def findOrder(self, numCourses: int, prerequisites: List[List[int]]) -> List[int]:
        # Create an adjacency list
        # object comprehension. Create a k/v pair where k is the course number and the value is an empty array
        self.prereq = { c:[] for c in range(numCourses) } 

        # Map the courses to the prereqs
        # prereqsuisites returns an array of array: [[crs, pre],...,[crs, pre]]
        for crs, pre in prerequisites:
            self.prereq[crs].append(pre)

        # print(prereq)

        for c in range(numCourses):
            if self.DFS(c) == False:
                return [] # We detected a cycle, therefore we can't continue, return an empty array
        
        return self.output
    
    # Helper function to dfs the adjacency list of each course. Returns false if there's a cycle, otherwise returns true add to visited set
    def DFS(self, crs: int) -> bool:
        if crs in self.cycle:
            return False
            
        if crs in self.visited:
            return True
            
        self.cycle.add(crs)

        # prereq[crs] returns an array
        for pre in self.prereq[crs]:
            if self.DFS(pre) == False:
                return False # there is a cycle and we can't continue
            
        self.cycle.remove(crs)
        self.visited.add(crs)
        self.output.append(crs)

        return True    
    
    @staticmethod
    def testSolution(record: Dict[str, int | List[List[int]] | List[int]]) -> None:
        print(f"Input: numCourses: {record.get("numCourses")}")
        print(f"prerequisites: {record["prerequisites"]}")
        print(f"expected: {record.get("expected")}")

        res: List[int] = Solution().findOrder(record.get("numCourses"), record.get("prerequisites"))

        print(f"result: {res}")
        
        # Compare the set of the result and the expected. Order of the element value does not matter here
        validated_result: bool = set(res) == set(record.get("expected"))
        print(f"{Result.PASS.value if validated_result == True else Result.FAIL.value}")

if __name__ == "__main__":
    records = [{"numCourses": 2, "prerequisites": [[1,0]], "expected": [1,0]}, 
               {"numCourses": 4, "prerequisites": [[1,0],[2,0],[3,1],[3,2]], "expected": [0,2,1,3]},
               {"numCourses": 1, "prerequisites": [], "expected": [0]}]

    for i, record in enumerate(records):
        print(f"Test case {i+1}")
        Solution.testSolution(record)
        print(f"{'-' * 50}")
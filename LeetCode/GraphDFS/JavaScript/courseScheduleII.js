// There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai.

// For example, the pair [0, 1], indicates that to take course 0 you have to first take course 1.
// Return the ordering of courses you should take to finish all courses. If there are many valid answers, return any of them. If it is impossible to finish all courses, return an empty array.

// Example 1:

// Input: numCourses = 2, prerequisites = [[1,0]]
// Output: [0,1]
// Explanation: There are a total of 2 courses to take. To take course 1 you should have finished course 0. So the correct course order is [0,1].
// Example 2:

// Input: numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]
// Output: [0,2,1,3]
// Explanation: There are a total of 4 courses to take. To take course 3 you should have finished both courses 1 and 2. Both courses 1 and 2 should be taken after you finished course 0.
// So one correct course order is [0,1,2,3]. Another correct ordering is [0,2,1,3].
// Example 3:

// Input: numCourses = 1, prerequisites = []
// Output: [0]

// Constraints:

// 1 <= numCourses <= 2000
// 0 <= prerequisites.length <= numCourses * (numCourses - 1)
// prerequisites[i].length == 2
// 0 <= ai, bi < numCourses
// ai != bi
// All the pairs [ai, bi] are distinct.

// TC: O(edge + Node(vertex)) - each Node(vertex) have edges going in and going out of each nodes, it's possible that you'll visit each nodes multiple times.
// SC: O(edge + Node(vertex)) - each Node(vertex) have edges going in and going out of each nodes, it's possible that you'll visit each nodes multiple times.

/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */
var findOrder = function (numCourses, prerequisites) {
  // Create an adjacency list
  let prereq = {};

  // Create the K/v with keys as the courses and values are empty arrays
  for (let i = 0; i < numCourses; i += 1) {
    if (!prereq[i]) {
      prereq[i] = [];
    }
  }

  // console.log(prereq)

  for (let [crs, pre] of prerequisites) {
    prereq[crs].push(pre);
  }

  // console.log(prereq)

  let output = [];
  let visited = new Set();
  let cycle = new Set();

  // Helper function
  // DFS on a crs adjacency list. Returns false if a cycle is detected and returns true otherwise add to visited set.
  function dfs(crs) {
    // Check first if we have a cycle
    if (cycle.has(crs)) return false;
    // Check if we've visited this course
    if (visited.has(crs)) return true;

    // Add course to cycle set
    cycle.add(crs);

    // DFS all the courses in the prereq of this course
    // prereq[crs] returns an array, so use for-of
    for (let pre of prereq[crs]) {
      if (dfs(pre) === false) return false; // this means we have a cycle and we can't continue
    }

    // Remove course from cycle set
    cycle.delete(crs);
    // Add crs to the visited set so we don't have to visit it again
    visited.add(crs);
    // Finally add it to our output array
    output.push(crs);

    return true;
  }

  // Now, let's dfs on all courses
  for (let c = 0; c < numCourses; c += 1) {
    if (dfs(c) === false) {
      return []; // need to return an empty array if there's a cycle.
    }
  }

  return output;
};

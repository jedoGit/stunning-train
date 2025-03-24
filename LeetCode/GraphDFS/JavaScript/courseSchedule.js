// There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai.

// For example, the pair [0, 1], indicates that to take course 0 you have to first take course 1.
// Return true if you can finish all courses. Otherwise, return false.

// Example 1:

// Input: numCourses = 2, prerequisites = [[1,0]]
// Output: true
// Explanation: There are a total of 2 courses to take.
// To take course 1 you should have finished course 0. So it is possible.
// Example 2:

// Input: numCourses = 2, prerequisites = [[1,0],[0,1]]
// Output: false
// Explanation: There are a total of 2 courses to take.
// To take course 1 you should have finished course 0, and to take course 0 you should also have finished course 1. So it is impossible.

// Constraints:

// 1 <= numCourses <= 2000
// 0 <= prerequisites.length <= 5000
// prerequisites[i].length == 2
// 0 <= ai, bi < numCourses
// All the pairs prerequisites[i] are unique.

// TC: O(edge + Node(vertex)) - each Node(vertex) have edges going in and going out of each nodes, it's possible that you'll visit each nodes multiple times.
// SC: O(edge + Node(vertex)) - each Node(vertex) have edges going in and going out of each nodes, it's possible that you'll visit each nodes multiple times.

/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinish = function (numCourses, prerequisites) {
  // Map each course to prereq list
  let preMap = {};

  // Create the key to val mapping first... with the numCourses as key
  for (let i = 0; i < numCourses; i += 1) {
    if (!preMap[String(i)]) {
      preMap[String(i)] = [];
    }
  }

  // Create the adjacency list
  for (let [crs, pre] of prerequisites) {
    preMap[String(crs)].push(pre);
  }

  // console.log(preMap)

  // Visit all courses along the current DFS path
  let visited = new Set();

  // Helper function to DFS the adjacency list
  function dfs(crs) {
    if (visited.has(String(crs))) {
      return false;
    }

    // The k/v of preMap is k: []. It returns an array
    // Check if the array is empty
    if (preMap[String(crs)].length === 0) {
      return true;
    }

    // Let's add crs to the visited set prior to DFS'ing
    visited.add(String(crs));

    // preMap[String(crs)] returns an array, so use for-of
    for (let pre of preMap[String(crs)]) {
      if (!dfs(pre)) {
        return false;
      }
    }

    // After DFS'ing, remove crs from visited and reset preMap[String(crs)] to empty array
    visited.delete(String(crs));
    preMap[String(crs)] = [];

    return true;
  }

  // DFS for all courses
  for (let i = 0; i < numCourses; i += 1) {
    if (!dfs(i)) {
      return false;
    }
  }

  return true;
};

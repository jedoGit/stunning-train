// You are given an array of variable pairs equations and an array of real numbers values, where equations[i] = [Ai, Bi] and values[i] represent the equation Ai / Bi = values[i]. Each Ai or Bi is a string that represents a single variable.

// You are also given some queries, where queries[j] = [Cj, Dj] represents the jth query where you must find the answer for Cj / Dj = ?.

// Return the answers to all queries. If a single answer cannot be determined, return -1.0.

// Note: The input is always valid. You may assume that evaluating the queries will not result in division by zero and that there is no contradiction.

// Note: The variables that do not occur in the list of equations are undefined, so the answer cannot be determined for them.

// Example 1:

// Input: equations = [["a","b"],["b","c"]], values = [2.0,3.0], queries = [["a","c"],["b","a"],["a","e"],["a","a"],["x","x"]]
// Output: [6.00000,0.50000,-1.00000,1.00000,-1.00000]
// Explanation:
// Given: a / b = 2.0, b / c = 3.0
// queries are: a / c = ?, b / a = ?, a / e = ?, a / a = ?, x / x = ?
// return: [6.0, 0.5, -1.0, 1.0, -1.0 ]
// note: x is undefined => -1.0
// Example 2:

// Input: equations = [["a","b"],["b","c"],["bc","cd"]], values = [1.5,2.5,5.0], queries = [["a","c"],["c","b"],["bc","cd"],["cd","bc"]]
// Output: [3.75000,0.40000,5.00000,0.20000]
// Example 3:

// Input: equations = [["a","b"]], values = [0.5], queries = [["a","b"],["b","a"],["a","c"],["x","y"]]
// Output: [0.50000,2.00000,-1.00000,-1.00000]

// Constraints:

// 1 <= equations.length <= 20
// equations[i].length == 2
// 1 <= Ai.length, Bi.length <= 5
// values.length == equations.length
// 0.0 < values[i] <= 20.0
// 1 <= queries.length <= 20
// queries[i].length == 2
// 1 <= Cj.length, Dj.length <= 5
// Ai, Bi, Cj, Dj consist of lower case English letters and digits.

// TC: O(e), e is the number of edges
// SC: O(n), n is the number of nodes we have to perform recursion.

/**
 * @param {string[][]} equations
 * @param {number[]} values
 * @param {string[][]} queries
 * @return {number[]}
 */
var calcEquation = function (equations, values, queries) {
  // Build the graph
  // The graph will be an object of object
  // After visualizing the requirements, we can deduce that
  // For the direction a->b, we assign the value as-is
  // For the direction b->a, we assign the value as 1/value
  let g = {};

  // Let's look at each equations
  for (let i = 0; i < equations.length; i++) {
    const [a, b] = equations[i];

    if (!g[a]) {
      g[a] = {};
    }

    if (!g[b]) {
      g[b] = {};
    }

    g[a][b] = values[i];
    g[b][a] = 1 / values[i];
  }

  //console.log(g)

  // Let's build our DFS
  // From the requirement, if the equation does not exist, we return -1
  // From our visualization of the graph, if the src and dest is itself, we return 1
  // From the visualization, moving from node to node, we multiply the values of that direction

  function dfs(src, tgt, visited) {
    // This is the case when the variable in the equation does not exist
    if (!g[src] || !g[tgt]) {
      return -1;
    }
    // This is the case when the variable is the same
    if (src === tgt) {
      return 1;
    }

    // We add the src to the visited so we're not going to visit it only once
    visited.add(src);

    // These are the other cases
    for (let nei in g[src]) {
      if (!visited.has(nei)) {
        // We multiply every values in the path
        const result = dfs(nei, tgt, visited) * g[src][nei];

        // We check the result if it's positive and return it
        if (result > 0) {
          return result;
        }
      }
    }
    return -1;
  }

  // Process the queries. We'll use map here. Map will look at element by element
  // and create a new array and save the dfs result to the index
  return queries.map((q) => dfs(q[0], q[1], new Set()));
};

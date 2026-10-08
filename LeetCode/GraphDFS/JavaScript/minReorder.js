// There are n cities numbered from 0 to n - 1 and n - 1 roads such that there is only one way to travel between two different cities (this network form a tree). Last year, The ministry of transport decided to orient the roads in one direction because they are too narrow.

// Roads are represented by connections where connections[i] = [ai, bi] represents a road from city ai to city bi.

// This year, there will be a big event in the capital (city 0), and many people want to travel to this city.

// Your task consists of reorienting some roads such that each city can visit the city 0. Return the minimum number of edges changed.

// It's guaranteed that each city can reach city 0 after reorder.

// Example 1:

// Input: n = 6, connections = [[0,1],[1,3],[2,3],[4,0],[4,5]]
// Output: 3
// Explanation: Change the direction of edges show in red such that each node can reach the node 0 (capital).
// Example 2:

// Input: n = 5, connections = [[1,0],[1,2],[3,2],[3,4]]
// Output: 2
// Explanation: Change the direction of edges show in red such that each node can reach the node 0 (capital).
// Example 3:

// Input: n = 3, connections = [[1,0],[2,0]]
// Output: 0

// Constraints:

// 2 <= n <= 5 * 10^4
// connections.length == n - 1
// connections[i].length == 2
// 0 <= ai, bi <= n - 1
// ai != bi

// TC: O(n) we visit every city once and every connection once
// SC: O(n) the adjacency list, the direction set, and the visited set all grow with n

const Result = { PASS: "\x1b[92mPASS\x1b[0m", FAIL: "\x1b[91mFAIL\x1b[0m" };

class MinReorderRecord {
  constructor(n, connections, expected) {
    this.n = n;
    this.connections = connections;
    this.expected = expected;
  }
}

class Solution {
  /**
   * @param {number} n
   * @param {number[][]} connections
   * @return {number}
   */
  minReorder(n, connections) {
    // This graph will keep track of the neighbors of the city
    let g = new Map();
    // This set, we'll use this keep track of the direction of travel
    let s = new Set();
    // This is our visited set. We use this to keep track of the cities we've visited.
    let visited = new Set();

    // Let's fill our graph and set
    // For graph, we fill the key with the city, and the values with the cities it is connected with
    // For the set, we fill it with the directions we get from the connection input
    for (let [a, b] of connections) {
      if (!g.has(a)) {
        g.set(a, []);
      }

      if (!g.has(b)) {
        g.set(b, []);
      }

      // This is our adjacency list
      let temp = g.get(a);
      temp.push(b);
      g.set(a, temp);

      temp = g.get(b);
      temp.push(a);
      g.set(b, temp);

      // This is our direction list
      s.add([a, b].join());
    }

    // This is our dfs function
    function dfs(city) {
      // First, let's mark this city as visited
      visited.add(city);

      let count = 0;

      // Let's check our adjacency list for each of our cities.
      for (let nei of g.get(city)) {
        // First, let's check if the neighbor city is in our visited set, if not,
        // we'll dfs on this neighbor city
        if (!visited.has(nei)) {
          // We'll check if the direction from city to neighbor exists in our set.
          // If it exists, we increment our count of directions we need to
          // reverse.
          if (s.has([city, nei].join())) {
            count += 1;
          }
          count += dfs(nei);
        }
      }

      return count;
    }

    // Run the dfs on first city
    return dfs(0);
  }
}

function testSolution(record) {
  const solution = new Solution();
  const result = solution.minReorder(record.n, record.connections);
  const pass = result === record.expected;

  console.log(
    `Input: n = ${record.n}, connections = ${JSON.stringify(record.connections)}`
  );
  console.log(`Expected: ${record.expected}`);
  console.log(`Result: ${result}`);
  console.log(pass ? Result.PASS : Result.FAIL);
}

const records = [
  new MinReorderRecord(
    6,
    [
      [0, 1],
      [1, 3],
      [2, 3],
      [4, 0],
      [4, 5],
    ],
    3
  ),
  new MinReorderRecord(
    5,
    [
      [1, 0],
      [1, 2],
      [3, 2],
      [3, 4],
    ],
    2
  ),
  new MinReorderRecord(
    3,
    [
      [1, 0],
      [2, 0],
    ],
    0
  ),
  new MinReorderRecord(2, [[0, 1]], 1),
  new MinReorderRecord(
    4,
    [
      [0, 1],
      [0, 2],
      [0, 3],
    ],
    3
  ),
];

records.forEach((record, index) => {
  console.log(`# Test case ${index + 1}`);
  testSolution(record);
  console.log("----------------------------------------");
});

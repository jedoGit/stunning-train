// Given a reference of a node in a connected undirected graph.

// Return a deep copy (clone) of the graph.

// Each node in the graph contains a value (int) and a list (List[Node]) of its neighbors.

// class Node {
//     public int val;
//     public List<Node> neighbors;
// }

// Test case format:

// For simplicity, each node's value is the same as the node's index (1-indexed). For example, the first node with val == 1, the second node with val == 2, and so on. The graph is represented in the test case using an adjacency list.

// An adjacency list is a collection of unordered lists used to represent a finite graph. Each list describes the set of neighbors of a node in the graph.

// The given node will always be the first node with val = 1. You must return the copy of the given node as a reference to the cloned graph.

// Example 1:

// Input: adjList = [[2,4],[1,3],[2,4],[1,3]]
// Output: [[2,4],[1,3],[2,4],[1,3]]
// Explanation: There are 4 nodes in the graph.
// 1st node (val = 1)'s neighbors are 2nd node (val = 2) and 4th node (val = 4).
// 2nd node (val = 2)'s neighbors are 1st node (val = 1) and 3rd node (val = 3).
// 3rd node (val = 3)'s neighbors are 2nd node (val = 2) and 4th node (val = 4).
// 4th node (val = 4)'s neighbors are 1st node (val = 1) and 3rd node (val = 3).
// Example 2:

// Input: adjList = [[]]
// Output: [[]]
// Explanation: Note that the input contains one empty list. The graph consists of only one node with val = 1 and it does not have any neighbors.
// Example 3:

// Input: adjList = []
// Output: []
// Explanation: This an empty graph, it does not have any nodes.

// Constraints:

// The number of nodes in the graph is in the range [0, 100].
// 1 <= Node.val <= 100
// Node.val is unique for each node.
// There are no repeated edges and no self-loops in the graph.
// The Graph is connected and all nodes can be visited starting from the given node.

// TC: O(n)
// SC: O(n)

/**
 * // Definition for a _Node.
 * function _Node(val, neighbors) {
 *    this.val = val === undefined ? 0 : val;
 *    this.neighbors = neighbors === undefined ? [] : neighbors;
 * };
 */
class _Node {
  constructor(val, neighbors) {
    this.val = val === undefined ? 0 : val;
    this.neighbors = neighbors === undefined ? [] : neighbors;
  }
}

const Result = { PASS: "\x1b[92mPASS\x1b[0m", FAIL: "\x1b[91mFAIL\x1b[0m" };

class CloneGraphRecord {
  constructor(adjList, expected) {
    this.adjList = adjList;
    this.expected = expected;
  }
}

class Solution {
  /**
   * @param {_Node} node
   * @return {_Node}
   */
  cloneGraph(node) {
    if (!node) return null;

    let oldToNew = new Map();

    function dfs(node) {
      // Check if the node is in our old to new node hashmap, if so, return the old to new mapping
      if (oldToNew.has(node)) {
        return oldToNew.get(node);
      }

      // The node is not in our hashmap, so we save a copy of the node to the hashmap
      let copy = new _Node(node.val);
      oldToNew.set(node, copy);

      // Copy and update the adjacency list of the old node to the neighbor
      for (let nei of node.neighbors) {
        copy.neighbors.push(dfs(nei));
      }

      // Return copy
      return copy;
    }

    return dfs(node);
  }
}

// Build the graph from an adjacency list. Node values are 1-indexed and the
// first node (val = 1) is returned as the entry point, or null for an empty graph.
function buildGraph(adjList) {
  if (!adjList.length) return null;

  const nodes = adjList.map((_, index) => new _Node(index + 1));

  adjList.forEach((neighbors, index) => {
    for (let val of neighbors) {
      nodes[index].neighbors.push(nodes[val - 1]);
    }
  });

  return nodes[0];
}

// Serialize a graph back into an adjacency list so it can be compared with the expected output
function toAdjList(node) {
  if (!node) return [];

  const visited = new Map();
  const stack = [node];

  while (stack.length) {
    const cur = stack.pop();
    if (visited.has(cur.val)) continue;
    visited.set(cur.val, cur);

    for (let nei of cur.neighbors) {
      if (!visited.has(nei.val)) stack.push(nei);
    }
  }

  return [...visited.keys()]
    .sort((a, b) => a - b)
    .map((val) => visited.get(val).neighbors.map((nei) => nei.val));
}

function testSolution(record) {
  const solution = new Solution();
  const node = buildGraph(record.adjList);
  const clone = solution.cloneGraph(node);
  const result = toAdjList(clone);

  // A valid clone must have the same shape and must not reuse any of the original nodes
  const isDeepCopy = !node || (clone !== node && clone.neighbors.every((nei, i) => nei !== node.neighbors[i]));
  const pass = JSON.stringify(result) === JSON.stringify(record.expected) && isDeepCopy;

  console.log(`Input: adjList = ${JSON.stringify(record.adjList)}`);
  console.log(`Expected: ${JSON.stringify(record.expected)}`);
  console.log(`Result: ${JSON.stringify(result)}`);
  console.log(pass ? Result.PASS : Result.FAIL);
}

const records = [
  new CloneGraphRecord(
    [
      [2, 4],
      [1, 3],
      [2, 4],
      [1, 3],
    ],
    [
      [2, 4],
      [1, 3],
      [2, 4],
      [1, 3],
    ]
  ),
  new CloneGraphRecord([[]], [[]]),
  new CloneGraphRecord([], []),
  new CloneGraphRecord([[2], [1]], [[2], [1]]),
  new CloneGraphRecord(
    [[2, 3], [1], [1]],
    [[2, 3], [1], [1]]
  ),
];

records.forEach((record, index) => {
  console.log(`# Test case ${index + 1}`);
  testSolution(record);
  console.log("----------------------------------------");
});

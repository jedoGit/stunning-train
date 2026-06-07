class Graph {
  constructor() {
    // we create an adjacency list object to keep track of the edges and vertex
    this.adjacencyList = {};
  }

  addVertex(vertex) {
    // In js, you can create an object property in two ways:
    // Object.defineProperty(this.adjacencyList, vertex, {value: []}); or
    // this.adjacencyList[vertex] = [];
    if (!this.adjacencyList[vertex]) {
      // In the adjacency list object, create a vertex key and set the value to an empty array
      this.adjacencyList[vertex] = [];
      //Object.defineProperty(this.adjacencyList, vertex, { value: [] });
      return true;
    }
    return false;
  }

  addEdge(vertex1, vertex2) {
    if (this.adjacencyList[vertex1] && this.adjacencyList[vertex2]) {
      this.adjacencyList[vertex1].push(vertex2);
      this.adjacencyList[vertex2].push(vertex1);
      return true;
    }
    return false;
  }

  removeEdge(vertex1, vertex2) {
    //filter out the vertices from the edge
    if (this.adjacencyList[vertex1] && this.adjacencyList[vertex2]) {
      this.adjacencyList[vertex1] = this.adjacencyList[vertex1].filter(
        (v) => v !== vertex2
      );
      this.adjacencyList[vertex2] = this.adjacencyList[vertex2].filter(
        (v) => v !== vertex1
      );
      return true;
    }
    return false;
  }

  removeVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      return undefined;
    }

    while (this.adjacencyList[vertex].length) {
      let temp = this.adjacencyList[vertex].pop();
      this.removeEdge(vertex, temp);
    }

    delete this.adjacencyList[vertex];

    return this;
  }
}

const Result = { PASS: "\x1b[92mPASS\x1b[0m", FAIL: "\x1b[91mFAIL\x1b[0m" };

class GraphRecord {
  constructor(operations, expected) {
    this.operations = operations;
    this.expected = expected;
  }
}

class Solution {
  runGraphOperations(operations) {
    const graph = new Graph();

    operations.forEach((operation) => {
      const [method, ...args] = operation;
      graph[method](...args);
    });

    return graph.adjacencyList;
  }
}

function testSolution(record) {
  const solution = new Solution();
  const result = solution.runGraphOperations(record.operations);
  const passed = JSON.stringify(result) === JSON.stringify(record.expected);

  console.log(`Input: operations = ${JSON.stringify(record.operations)}`);
  console.log(`Expected: ${JSON.stringify(record.expected)}`);
  console.log(`Result: ${JSON.stringify(result)}`);
  console.log(passed ? Result.PASS : Result.FAIL);
}

const records = [
  new GraphRecord(
    [
      ["addVertex", "A"],
      ["addVertex", "B"],
      ["addEdge", "A", "B"],
    ],
    { A: ["B"], B: ["A"] }
  ),
  new GraphRecord(
    [
      ["addVertex", "A"],
      ["addVertex", "B"],
      ["addVertex", "C"],
      ["addEdge", "A", "B"],
      ["addEdge", "A", "C"],
      ["removeEdge", "A", "B"],
    ],
    { A: ["C"], B: [], C: ["A"] }
  ),
  new GraphRecord(
    [
      ["addVertex", "A"],
      ["addVertex", "B"],
      ["addVertex", "C"],
      ["addEdge", "A", "B"],
      ["addEdge", "A", "C"],
      ["removeVertex", "A"],
    ],
    { B: [], C: [] }
  ),
];

records.forEach((record, index) => {
  console.log(`# Test case ${index + 1}`);
  testSolution(record);
  console.log("--------------------");
});

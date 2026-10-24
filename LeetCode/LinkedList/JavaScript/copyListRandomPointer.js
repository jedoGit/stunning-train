// A linked list of length n is given such that each node contains an additional random pointer, which could point to any node in the list, or null.

// Construct a deep copy of the list. The deep copy should consist of exactly n brand new nodes, where each new node has its value set to the value of its corresponding original node. Both the next and random pointer of the new nodes should point to new nodes in the copied list such that the pointers in the original list and copied list represent the same list state. None of the pointers in the new list should point to nodes in the original list.

// For example, if there are two nodes X and Y in the original list, where X.random --> Y, then for the corresponding two nodes x and y in the copied list, x.random --> y.

// Return the head of the copied linked list.

// The linked list is represented in the input/output as a list of n nodes. Each node is represented as a pair of [val, random_index] where:

// val: an integer representing Node.val
// random_index: the index of the node (range from 0 to n-1) that the random pointer points to, or null if it does not point to any node.
// Your code will only be given the head of the original linked list.

// Example 1:

// Input: head = [[7,null],[13,0],[11,4],[10,2],[1,0]]
// Output: [[7,null],[13,0],[11,4],[10,2],[1,0]]
// Example 2:

// Input: head = [[1,1],[2,1]]
// Output: [[1,1],[2,1]]
// Example 3:

// Input: head = [[3,null],[3,0],[3,null]]
// Output: [[3,null],[3,0],[3,null]]

// Constraints:

// 0 <= n <= 1000
// -104 <= Node.val <= 104
// Node.random is null or is pointing to some node in the linked list.

// TC: O(2n) => O(n), we're visiting all of the LL nodes twice. First time is to create a copy of the node and push to the map, second is to connect all the copy nodes.
// SC: O(n), we're creating a map that contains a deep copy of all the nodes of the original LL.

const Result = { PASS: "\x1b[92mPASS\x1b[0m", FAIL: "\x1b[91mFAIL\x1b[0m" };

class Node {
  constructor(val = 0, next = null, random = null) {
    this.val = val;
    this.next = next;
    this.random = random;
  }
}

class CopyRandomListRecord {
  constructor(head, expected) {
    this.head = head;
    this.expected = expected;
  }
}

class Solution {
  /**
   * @param {Node} head
   * @return {Node}
   */
  copyRandomList(head) {
    // We'll be using a map to map a LL node to an LL node
    let oldToCopy = new Map();

    // Here, let's add an entry to our map for null entry... a null LL should be mapped to a null value
    oldToCopy.set(null, null);

    // The first loop, let's visit each LL nodes and create a new node and copy the value to that new node.
    // Then let's map the current LL as key and the copy LL as the value.
    // Let's do that to all of the nodes on the original LL.
    // At the end of the iteration, we should have a map of K/V where the key is the original node and the value is the new copy of the original node
    let curr = head;

    while (curr) {
      const copy = new Node(curr.val);

      oldToCopy.set(curr, copy);
      curr = curr.next;
    }

    // The second loop, is to create and link the nodes we pushed to our oldToCopy map.
    curr = head;

    // Let's travese through all the nodes of the original LL and get the copy of the node we pushed to the Map.
    // Then, we'll connect all the node copies from the map.
    while (curr) {
      // Get the copy we pushed to the Map. The curr pointer points to the nodes of the original LL. It's our key to get
      // the copy nodes on the map
      let copy = oldToCopy.get(curr);

      // We got the copy of the node, then let's get the next pointer and the random pointer from the map.
      copy.next = oldToCopy.get(curr.next);
      copy.random = oldToCopy.get(curr.random);

      // Let's move to the next node
      curr = curr.next;
    }

    // Once we connected the copies of all the nodes, we'll return the pointer to the copy of the original head node.
    return oldToCopy.get(head);
  }
}

function buildList(pairs) {
  const nodes = pairs.map(([val]) => new Node(val));

  nodes.forEach((node, index) => {
    const randomIndex = pairs[index][1];

    node.next = index + 1 < nodes.length ? nodes[index + 1] : null;
    node.random = randomIndex === null ? null : nodes[randomIndex];
  });

  return nodes.length > 0 ? nodes[0] : null;
}

function listToPairs(head) {
  const nodes = [];
  const indexOf = new Map();

  let current = head;

  while (current) {
    indexOf.set(current, nodes.length);
    nodes.push(current);
    current = current.next;
  }

  return nodes.map((node) => [node.val, node.random === null ? null : indexOf.get(node.random)]);
}

function testSolution(record) {
  const solution = new Solution();
  const result = listToPairs(solution.copyRandomList(buildList(record.head)));
  const pass = JSON.stringify(result) === JSON.stringify(record.expected);

  console.log(`Input: head = ${JSON.stringify(record.head)}`);
  console.log(`Expected: ${JSON.stringify(record.expected)}`);
  console.log(`Result: ${JSON.stringify(result)}`);
  console.log(pass ? Result.PASS : Result.FAIL);
}

const records = [
  new CopyRandomListRecord(
    [
      [7, null],
      [13, 0],
      [11, 4],
      [10, 2],
      [1, 0],
    ],
    [
      [7, null],
      [13, 0],
      [11, 4],
      [10, 2],
      [1, 0],
    ]
  ),
  new CopyRandomListRecord(
    [
      [1, 1],
      [2, 1],
    ],
    [
      [1, 1],
      [2, 1],
    ]
  ),
  new CopyRandomListRecord(
    [
      [3, null],
      [3, 0],
      [3, null],
    ],
    [
      [3, null],
      [3, 0],
      [3, null],
    ]
  ),
  new CopyRandomListRecord([], []),
];

records.forEach((record, index) => {
  console.log(`# Test case ${index + 1}`);
  testSolution(record);
  console.log("----------------------------------------");
});

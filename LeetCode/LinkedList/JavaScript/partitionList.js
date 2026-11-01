// Given the head of a linked list and a value x, partition it such that all nodes less than x come before nodes greater than or equal to x.

// You should preserve the original relative order of the nodes in each of the two partitions.

// Example 1:

// Input: head = [1,4,3,2,5,2], x = 3
// Output: [1,2,2,4,3,5]
// Example 2:

// Input: head = [2,1], x = 2
// Output: [1,2]

// Constraints:

// The number of nodes in the list is in the range [0, 200].
// -100 <= Node.val <= 100
// -200 <= x <= 200

// TC: O(n), we visit all input nodes
// SC: O(1), in place processing

const Result = { PASS: "\x1b[92mPASS\x1b[0m", FAIL: "\x1b[91mFAIL\x1b[0m" };

class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

class PartitionListRecord {
  constructor(head, x, expected) {
    this.head = head;
    this.x = x;
    this.expected = expected;
  }
}

class Solution {
  /**
   * @param {ListNode} head
   * @param {number} x
   * @return {ListNode}
   */
  partition(head, x) {
    let left = new ListNode(); // initialize to an empty node. This is our dummy left node
    let right = new ListNode(); // Initialized to an empty node. This is our dummy right node

    let cur = head;
    let curLeft = left;
    let curRight = right;

    // We'll traverse through all the nodes and filter the nodes.
    // All nodes that have val less than x will be linked to the left dummy node, and the rest is on the right dummy node
    // We need current pointers listed above
    while (cur) {
      if (cur.val < x) {
        // Connect this node to the left pointer
        curLeft.next = cur;
        curLeft = curLeft.next;
      } else {
        // Connect this node to the right pointer
        curRight.next = cur;
        curRight = curRight.next;
      }

      cur = cur.next;
    }

    // Last step is to connect the left dummy pointer to the right dummy pointer,
    curLeft.next = right.next;
    // Then, set curRight.next to null to create a new end node
    curRight.next = null;

    // We're done and return left.next
    return left.next;
  }
}

function buildList(values) {
  const dummy = new ListNode();
  let current = dummy;

  values.forEach((value) => {
    current.next = new ListNode(value);
    current = current.next;
  });

  return dummy.next;
}

function listToArray(head) {
  const values = [];
  let current = head;

  while (current) {
    values.push(current.val);
    current = current.next;
  }

  return values;
}

function testSolution(record) {
  const solution = new Solution();
  const result = listToArray(
    solution.partition(buildList(record.head), record.x)
  );
  const pass = JSON.stringify(result) === JSON.stringify(record.expected);

  console.log(
    `Input: head = ${JSON.stringify(record.head)}, x = ${record.x}`
  );
  console.log(`Expected: ${JSON.stringify(record.expected)}`);
  console.log(`Result: ${JSON.stringify(result)}`);
  console.log(pass ? Result.PASS : Result.FAIL);
}

const records = [
  new PartitionListRecord([1, 4, 3, 2, 5, 2], 3, [1, 2, 2, 4, 3, 5]),
  new PartitionListRecord([2, 1], 2, [1, 2]),
  new PartitionListRecord([], 0, []),
  new PartitionListRecord([1], 2, [1]),
  new PartitionListRecord([3, 1, 2], 10, [3, 1, 2]),
  new PartitionListRecord([3, 1, 2], -5, [3, 1, 2]),
];

records.forEach((record, index) => {
  console.log(`# Test case ${index + 1}`);
  testSolution(record);
  console.log("----------------------------------------");
});

// Given the head of a linked list, remove the nth node from the end of the list and return its head.

// Example 1:

// Input: head = [1,2,3,4,5], n = 2
// Output: [1,2,3,5]
// Example 2:

// Input: head = [1], n = 1
// Output: []
// Example 3:

// Input: head = [1,2], n = 1
// Output: [1]

// Constraints:

// The number of nodes in the list is sz.
// 1 <= sz <= 30
// 0 <= Node.val <= 100
// 1 <= n <= sz

// Follow up: Could you do this in one pass?

// TC: O(n) we need do traverse all nodes in the LL to find the n node from end
// SC: O(1) in place processing

const Result = { PASS: "\x1b[92mPASS\x1b[0m", FAIL: "\x1b[91mFAIL\x1b[0m" };

class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

class RemoveNNodeFromEndRecord {
  constructor(head, n, expected) {
    this.head = head;
    this.n = n;
    this.expected = expected;
  }
}

class Solution {
  /**
   * @param {ListNode} head
   * @param {number} n
   * @return {ListNode}
   */
  removeNthFromEnd(head, n) {
    let dummy = new ListNode(0, head); // we use a dummy node to return the new LL
    let left = dummy; // left pointer initial points at the dummy node
    let right = head; // right pointer initial points to head

    // We need to move right pointer n nodes
    while (right && n > 0) {
      right = right.next;
      n -= 1;
    }

    // Then, we need to move both right and left pointers until right is null
    while (right) {
      left = left.next;
      right = right.next;
    }

    // At this point, we found the node which is n node from the end
    // We need to delete this node
    left.next = left.next.next;

    // We're done
    return dummy.next;
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
    solution.removeNthFromEnd(buildList(record.head), record.n)
  );
  const pass = JSON.stringify(result) === JSON.stringify(record.expected);

  console.log(
    `Input: head = ${JSON.stringify(record.head)}, n = ${record.n}`
  );
  console.log(`Expected: ${JSON.stringify(record.expected)}`);
  console.log(`Result: ${JSON.stringify(result)}`);
  console.log(pass ? Result.PASS : Result.FAIL);
}

const records = [
  new RemoveNNodeFromEndRecord([1, 2, 3, 4, 5], 2, [1, 2, 3, 5]),
  new RemoveNNodeFromEndRecord([1], 1, []),
  new RemoveNNodeFromEndRecord([1, 2], 1, [1]),
  new RemoveNNodeFromEndRecord([1, 2], 2, [2]),
  new RemoveNNodeFromEndRecord([1, 2, 3, 4, 5], 5, [2, 3, 4, 5]),
  new RemoveNNodeFromEndRecord([0, 100, 50], 3, [100, 50]),
];

records.forEach((record, index) => {
  console.log(`# Test case ${index + 1}`);
  testSolution(record);
  console.log("----------------------------------------");
});

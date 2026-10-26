// Given head, the head of a linked list, determine if the linked list has a cycle in it.

// There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer. Internally, pos is used to denote the index of the node that tail's next pointer is connected to. Note that pos is not passed as a parameter.

// Return true if there is a cycle in the linked list. Otherwise, return false.

// Example 1:

// Input: head = [3,2,0,-4], pos = 1
// Output: true
// Explanation: There is a cycle in the linked list, where the tail connects to the 1st node (0-indexed).
// Example 2:

// Input: head = [1,2], pos = 0
// Output: true
// Explanation: There is a cycle in the linked list, where the tail connects to the 0th node.
// Example 3:

// Input: head = [1], pos = -1
// Output: false
// Explanation: There is no cycle in the linked list.

// Constraints:

// The number of the nodes in the list is in the range [0, 104].
// -105 <= Node.val <= 105
// pos is -1 or a valid index in the linked-list.

// Follow up: Can you solve it using O(1) (i.e. constant) memory?

// TC: O(n) worst case is the size of the loop is n
// SC: O(1) in place processing. No additional data structure created

const Result = { PASS: "\x1b[92mPASS\x1b[0m", FAIL: "\x1b[91mFAIL\x1b[0m" };

class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

class HasCycleRecord {
  constructor(values, pos, expected) {
    this.values = values;
    this.pos = pos;
    this.expected = expected;
  }
}

class Solution {
  /**
   * @param {ListNode} head
   * @return {boolean}
   */
  hasCycle(head) {
    // Using Floyd's Turtle and Hare algorithm, we use a fast and a slow pointer.
    // Initially, both slow and fast pointer will point to the head and in each iteration, we
    // move the slow pointer one node at a time and the fast pointer, 2 nodes at a time
    // If a cycle or loop exists in the LL, both the fast and slow pointer at some point will
    // point to the same node, which means there is a loop or a cycle.
    // The time it would take for both slow and fast pointer to meet is the number of nodes
    // in the loop.
    let slow = head;
    let fast = head;

    // Let's loop through the LL. Since our fast pointer is moving 2 nodes at a time,
    // let's make sure that it' not out of bounds by check if fast and fast.next is not null
    while (fast && fast.next) {
      // Move the slow and fast pointer
      slow = slow.next;
      fast = fast.next.next;

      // In each iteration, check if slow is equal fast. If so, there's a cycle
      if (slow === fast) {
        return true;
      }
    }

    // We exited the while loop because the fast pointer went out of bounds. So, no cycle
    return false;
  }
}

function buildList(values, pos) {
  const dummy = new ListNode();
  const nodes = [];
  let current = dummy;

  values.forEach((value) => {
    current.next = new ListNode(value);
    current = current.next;
    nodes.push(current);
  });

  // pos is -1 when there's no cycle. Otherwise, connect the tail back to the node at pos
  if (pos >= 0 && pos < nodes.length) {
    current.next = nodes[pos];
  }

  return dummy.next;
}

function testSolution(record) {
  const solution = new Solution();
  const result = solution.hasCycle(buildList(record.values, record.pos));
  const pass = result === record.expected;

  console.log(`Input: head = ${JSON.stringify(record.values)}, pos = ${record.pos}`);
  console.log(`Expected: ${record.expected}`);
  console.log(`Result: ${result}`);
  console.log(pass ? Result.PASS : Result.FAIL);
}

const records = [
  new HasCycleRecord([3, 2, 0, -4], 1, true),
  new HasCycleRecord([1, 2], 0, true),
  new HasCycleRecord([1], -1, false),
  new HasCycleRecord([], -1, false),
  new HasCycleRecord([1, 2, 3, 4, 5], -1, false),
  new HasCycleRecord([1, 2, 3], 2, true),
];

records.forEach((record, index) => {
  console.log(`# Test case ${index + 1}`);
  testSolution(record);
  console.log("----------------------------------------");
});

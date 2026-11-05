// Given the head of a singly linked list and two integers left and right where left <= right, reverse the nodes of the list from position left to position right, and return the reversed list.

// Example 1:

// Input: head = [1,2,3,4,5], left = 2, right = 4
// Output: [1,4,3,2,5]
// Example 2:

// Input: head = [5], left = 1, right = 1
// Output: [5]

// Constraints:

// The number of nodes in the list is n.
// 1 <= n <= 500
// -500 <= Node.val <= 500
// 1 <= left <= right <= n

// Follow up: Could you do it in one pass?

// TC: O(n), we're traversing through all the nodes
// SC: O(1), in place processing

const Result = { PASS: "\x1b[92mPASS\x1b[0m", FAIL: "\x1b[91mFAIL\x1b[0m" };

class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

class ReverseListIIRecord {
  constructor(head, left, right, expected) {
    this.head = head;
    this.left = left;
    this.right = right;
    this.expected = expected;
  }
}

class Solution {
  /**
   * @param {ListNode} head
   * @param {number} left
   * @param {number} right
   * @return {ListNode}
   */
  reverseBetween(head, left, right) {
    let dummy = new ListNode(0, head); // We'll use a dummy node and let it point to the original head

    // 1. We need to reach the first position which is the left position
    // We need these pointers so we can start setting up reversing the nodes starting at the left position
    // To setup for reversing LLs, we need a previous pointer and a current pointer
    let leftPrev = dummy;
    let cur = head;

    for (let i = 0; i < left - 1; i++) {
      leftPrev = cur;
      cur = cur.next;
    }

    // At this point, we found the node pointed by "left"
    // cur="left", leftPrev="node before left"
    // 2. We need to reverse the nodes starting at left and ending at right

    let prev = null; // we need a previous pointer to perform a reversing of nodes
    for (let i = 0; i < right - left + 1; i++) {
      let tmpNext = cur.next; // save the cur.next first
      cur.next = prev; // point cur.next to prev
      prev = cur; // point prev to cur
      cur = tmpNext; // point cur to tmpNext
    }

    // At this point, the cur pointer is pointing to the node after "right"
    // prev points to "right"
    // leftPrev.next.next still point to null... we need to point it to cur, which is the node after "right"
    // leftPrev.next still point to the end node and we need to point it to right, which is prev
    // 3. Update the pointers

    leftPrev.next.next = cur; // cur is node after "right"
    leftPrev.next = prev; // prev is "right"

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
    solution.reverseBetween(buildList(record.head), record.left, record.right)
  );
  const pass = JSON.stringify(result) === JSON.stringify(record.expected);

  console.log(
    `Input: head = ${JSON.stringify(record.head)}, left = ${
      record.left
    }, right = ${record.right}`
  );
  console.log(`Expected: ${JSON.stringify(record.expected)}`);
  console.log(`Result: ${JSON.stringify(result)}`);
  console.log(pass ? Result.PASS : Result.FAIL);
}

const records = [
  new ReverseListIIRecord([1, 2, 3, 4, 5], 2, 4, [1, 4, 3, 2, 5]),
  new ReverseListIIRecord([5], 1, 1, [5]),
  new ReverseListIIRecord([1, 2, 3], 1, 3, [3, 2, 1]),
  new ReverseListIIRecord([1, 2, 3, 4, 5], 1, 2, [2, 1, 3, 4, 5]),
  new ReverseListIIRecord([1, 2, 3, 4, 5], 4, 5, [1, 2, 3, 5, 4]),
  new ReverseListIIRecord([-500, 0, 500], 2, 3, [-500, 500, 0]),
];

records.forEach((record, index) => {
  console.log(`# Test case ${index + 1}`);
  testSolution(record);
  console.log("----------------------------------------");
});

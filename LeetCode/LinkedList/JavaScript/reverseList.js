// Given the head of a singly linked list, reverse the list, and return the reversed list.

// Example 1:

// Input: head = [1,2,3,4,5]
// Output: [5,4,3,2,1]
// Example 2:

// Input: head = [1,2]
// Output: [2,1]
// Example 3:

// Input: head = []
// Output: []

// Constraints:

// The number of nodes in the list is the range [0, 5000].
// -5000 <= Node.val <= 5000

// Follow up: A linked list can be reversed either iteratively or recursively. Could you implement both?

// TC: O(n) we're traversing the LL
// SC: O(1) we're not creating new memory

const Result = { PASS: "\x1b[92mPASS\x1b[0m", FAIL: "\x1b[91mFAIL\x1b[0m" };

class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

class ReverseListRecord {
  constructor(head, expected) {
    this.head = head;
    this.expected = expected;
  }
}

class Solution {
  /**
   * @param {ListNode} head
   * @return {ListNode}
   */
  reverseList1(head) {
    // Iterative solution
    if (!head) return head;

    let prev = head;
    let cur = prev.next;

    // We want to point cur.next to the prev node
    // Then, we move the pointers to the right
    while (cur) {
      let tmp = cur.next; // save cur.next
      cur.next = prev; // point cur.next to the prev node
      prev = cur; // move the prev pointer to the right
      cur = tmp; // move the cur pointer to the right
    }

    // Update the head.next to point to null
    // The head is now the tail at this point
    head.next = null;

    // We return the prev pointer. The prev pointer is now the head at this point
    return prev;
  }

  /**
   * @param {ListNode} head
   * @return {ListNode}
   */
  reverseList2(head) {
    // Recursive solution
    if (!head || !head.next) {
      return head;
    }

    var newHead = this.reverseList2(head.next);
    head.next.next = head;
    head.next = null;
    return newHead;
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
  const result = listToArray(solution.reverseList2(buildList(record.head)));
  const pass = JSON.stringify(result) === JSON.stringify(record.expected);

  console.log(`Input: head = ${JSON.stringify(record.head)}`);
  console.log(`Expected: ${JSON.stringify(record.expected)}`);
  console.log(`Result: ${JSON.stringify(result)}`);
  console.log(pass ? Result.PASS : Result.FAIL);
}

const records = [
  new ReverseListRecord([1, 2, 3, 4, 5], [5, 4, 3, 2, 1]),
  new ReverseListRecord([1, 2], [2, 1]),
  new ReverseListRecord([], []),
  new ReverseListRecord([1], [1]),
  new ReverseListRecord([-5000, 0, 5000], [5000, 0, -5000]),
];

records.forEach((record, index) => {
  console.log(`# Test case ${index + 1}`);
  testSolution(record);
  console.log("----------------------------------------");
});

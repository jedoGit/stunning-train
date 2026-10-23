// You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

// You may assume the two numbers do not contain any leading zero, except the number 0 itself.

// Example 1:

// Input: l1 = [2,4,3], l2 = [5,6,4]
// Output: [7,0,8]
// Explanation: 342 + 465 = 807.
// Example 2:

// Input: l1 = [0], l2 = [0]
// Output: [0]
// Example 3:

// Input: l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
// Output: [8,9,9,9,0,0,0,1]

// Constraints:

// The number of nodes in each linked list is in the range [1, 100].
// 0 <= Node.val <= 9
// It is guaranteed that the list represents a number that does not have leading zeros.

// TC: O(max(m,n)), we're looping thorough the LL with the max number of elements.
// SC: O(max(max(m,n), (n+1)), we're building an output LL that may hold at most max(max(m,n), (n+1)), where m and n are the number of elements in the LL and 1 is the carry

const Result = { PASS: "\x1b[92mPASS\x1b[0m", FAIL: "\x1b[91mFAIL\x1b[0m" };

class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

class AddTwoNumbersRecord {
  constructor(l1, l2, expected) {
    this.l1 = l1;
    this.l2 = l2;
    this.expected = expected;
  }
}

class Solution {
  /**
   * @param {ListNode} l1
   * @param {ListNode} l2
   * @return {ListNode}
   */
  addTwoNumbers(l1, l2) {
    //   (2) -> (4) -> (3)
    // + (5) -> (6) -> (4)
    // -------------------
    //   (7) -> (0) -> (8)

    let dummy = new ListNode();
    let curr = dummy;

    let carry = 0;

    while (l1 || l2 || carry) {
      const v1 = l1 !== null ? l1.val : 0;
      const v2 = l2 !== null ? l2.val : 0;

      // Compute the addition of the values
      let val = v1 + v2 + carry;
      carry = Math.floor(val / 10); // we need the second digit for the carry
      val = val % 10; // we need the first digit to create the new node

      // This node points to dummy and is used to capture the output LL
      curr.next = new ListNode(val);

      // Update the pointers
      curr = curr.next;
      l1 = l1 !== null ? l1.next : null;
      l2 = l2 !== null ? l2.next : null;
    }

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
  const result = listToArray(solution.addTwoNumbers(buildList(record.l1), buildList(record.l2)));
  const pass = JSON.stringify(result) === JSON.stringify(record.expected);

  console.log(`Input: l1 = ${JSON.stringify(record.l1)}, l2 = ${JSON.stringify(record.l2)}`);
  console.log(`Expected: ${JSON.stringify(record.expected)}`);
  console.log(`Result: ${JSON.stringify(result)}`);
  console.log(pass ? Result.PASS : Result.FAIL);
}

const records = [
  new AddTwoNumbersRecord([2, 4, 3], [5, 6, 4], [7, 0, 8]),
  new AddTwoNumbersRecord([0], [0], [0]),
  new AddTwoNumbersRecord([9, 9, 9, 9, 9, 9, 9], [9, 9, 9, 9], [8, 9, 9, 9, 0, 0, 0, 1]),
  new AddTwoNumbersRecord([5], [5], [0, 1]),
];

records.forEach((record, index) => {
  console.log(`# Test case ${index + 1}`);
  testSolution(record);
  console.log("----------------------------------------");
});

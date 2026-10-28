// Given the head of a linked list, return the list after sorting it in ascending order.

// Example 1:

// Input: head = [4,2,1,3]
// Output: [1,2,3,4]
// Example 2:

// Input: head = [-1,5,3,4,0]
// Output: [-1,0,3,4,5]
// Example 3:

// Input: head = []
// Output: []

// Constraints:

// The number of nodes in the list is in the range [0, 5 * 104].
// -105 <= Node.val <= 105

// Follow up: Can you sort the linked list in O(n logn) time and O(1) memory (i.e. constant space)?

const Result = { PASS: "\x1b[92mPASS\x1b[0m", FAIL: "\x1b[91mFAIL\x1b[0m" };

class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

class SortListRecord {
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
  sortList(head) {
    if (!head || !head.next) return head;

    // Find middle of the current LL
    let mid = findMid(head);
    // Find right of middle
    let r = mid.next;
    // Mark the mid as the end of the current ll
    mid.next = null;

    // Find left of the current ll
    let l = this.sortList(head);
    r = this.sortList(r);

    // Find the mid of the ll.. Use slow fast pointer
    function findMid(root) {
      let slow = root;
      let fast = root.next;

      while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
      }
      return slow;
    }

    // Merge two ll
    function mergeLists(l1, l2) {
      let dummy = new ListNode(null);
      let temp = dummy;

      while (l1 && l2) {
        if (l1.val < l2.val) {
          temp.next = l1;
          l1 = l1.next;
        } else {
          temp.next = l2;
          l2 = l2.next;
        }

        temp = temp.next;
      }

      temp.next = l1 || l2;
      return dummy.next;
    }

    return mergeLists(l, r);
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
  // The algorithm rewires the nodes in place, so the list is rebuilt per run
  const result = listToArray(solution.sortList(buildList(record.head)));
  const pass = JSON.stringify(result) === JSON.stringify(record.expected);

  console.log(`Input: head = ${JSON.stringify(record.head)}`);
  console.log(`Expected: ${JSON.stringify(record.expected)}`);
  console.log(`Result: ${JSON.stringify(result)}`);
  console.log(pass ? Result.PASS : Result.FAIL);
}

const records = [
  new SortListRecord([4, 2, 1, 3], [1, 2, 3, 4]),
  new SortListRecord([-1, 5, 3, 4, 0], [-1, 0, 3, 4, 5]),
  new SortListRecord([], []),
  new SortListRecord([1], [1]),
  new SortListRecord([2, 1], [1, 2]),
  new SortListRecord([3, 1, 3, 2, 1], [1, 1, 2, 3, 3]),
];

records.forEach((record, index) => {
  console.log(`# Test case ${index + 1}`);
  testSolution(record);
  console.log("----------------------------------------");
});

// You are given an array of k linked-lists lists, each linked-list is sorted in ascending order.

// Merge all the linked-lists into one sorted linked-list and return it.

// Example 1:

// Input: lists = [[1,4,5],[1,3,4],[2,6]]
// Output: [1,1,2,3,4,4,5,6]
// Explanation: The linked-lists are:
// [
//   1->4->5,
//   1->3->4,
//   2->6
// ]
// merging them into one sorted list:
// 1->1->2->3->4->4->5->6
// Example 2:

// Input: lists = []
// Output: []
// Example 3:

// Input: lists = [[]]
// Output: []

// Constraints:

// k == lists.length
// 0 <= k <= 104
// 0 <= lists[i].length <= 500
// -104 <= lists[i][j] <= 104
// lists[i] is sorted in ascending order.
// The sum of lists[i].length will not exceed 104.

const Result = { PASS: "\x1b[92mPASS\x1b[0m", FAIL: "\x1b[91mFAIL\x1b[0m" };

class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

class MergeKListsRecord {
  constructor(lists, expected) {
    this.lists = lists;
    this.expected = expected;
  }
}

class Solution {
  /**
   * @param {ListNode[]} lists
   * @return {ListNode}
   */
  mergeKLists(lists) {
    // console.log(lists.length)
    if (!lists.length) return null;

    // Basic merge sorted ll algo
    const mergeList = (l1, l2) => {
      let dummy = new ListNode();
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

      temp.next = l1 ? l1 : l2;

      return dummy.next;
    };

    // console.log(mergeList(lists[0],lists[1]))

    while (lists.length > 1) {
      // popleft the first 2 elements and merge them...
      // It will return a new head after the merge.
      // Then push it back to be merged with the remaining elements
      let l1 = lists.shift();
      let l2 = lists.shift();
      let newHead = mergeList(l1, l2);
      lists.push(newHead);
    }

    return lists[0];
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
  // The algorithm consumes the array of heads, so we rebuild the lists per run
  const heads = record.lists.map((values) => buildList(values));
  const result = listToArray(solution.mergeKLists(heads));
  const pass = JSON.stringify(result) === JSON.stringify(record.expected);

  console.log(`Input: lists = ${JSON.stringify(record.lists)}`);
  console.log(`Expected: ${JSON.stringify(record.expected)}`);
  console.log(`Result: ${JSON.stringify(result)}`);
  console.log(pass ? Result.PASS : Result.FAIL);
}

const records = [
  new MergeKListsRecord(
    [
      [1, 4, 5],
      [1, 3, 4],
      [2, 6],
    ],
    [1, 1, 2, 3, 4, 4, 5, 6]
  ),
  new MergeKListsRecord([], []),
  new MergeKListsRecord([[]], []),
  new MergeKListsRecord([[2, 7]], [2, 7]),
  new MergeKListsRecord(
    [
      [-10, -1, 0],
      [],
      [-5, 3],
    ],
    [-10, -5, -1, 0, 3]
  ),
];

records.forEach((record, index) => {
  console.log(`# Test case ${index + 1}`);
  testSolution(record);
  console.log("----------------------------------------");
});

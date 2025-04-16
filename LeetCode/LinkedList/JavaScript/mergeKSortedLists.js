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

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function (lists) {
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
};

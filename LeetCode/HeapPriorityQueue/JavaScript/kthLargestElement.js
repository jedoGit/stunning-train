// Given an integer array nums and an integer k, return the kth largest element in the array.

// Note that it is the kth largest element in the sorted order, not the kth distinct element.

// Can you solve it without sorting?

// Example 1:

// Input: nums = [3,2,1,5,6,4], k = 2
// Output: 5
// Example 2:

// Input: nums = [3,2,3,1,2,4,5,5,6], k = 4
// Output: 4

// Constraints:

// 1 <= k <= nums.length <= 105
// -104 <= nums[i] <= 104

// TC: O(n) worst case if you visit all of the elements of nums
// SC: O(n) worst case if you visit all the element of nums

const Result = { PASS: "\x1b[92mPASS\x1b[0m", FAIL: "\x1b[91mFAIL\x1b[0m" };

// Minimal local stand-in for the datastructures-js v5 MinPriorityQueue that LeetCode
// preloads (https://github.com/datastructures-js/priority-queue/blob/v5/README.md).
// front() returns { element, priority } just like the v5 library.
class MinPriorityQueue {
  constructor() {
    this.heap = [];
  }

  size() {
    return this.heap.length;
  }

  front() {
    return this.heap.length ? { element: this.heap[0], priority: this.heap[0] } : null;
  }

  enqueue(value) {
    const heap = this.heap;
    heap.push(value);
    let i = heap.length - 1;
    while (i > 0) {
      const parent = (i - 1) >> 1;
      if (heap[parent] <= heap[i]) break;
      [heap[parent], heap[i]] = [heap[i], heap[parent]];
      i = parent;
    }
    return this;
  }

  dequeue() {
    const heap = this.heap;
    if (!heap.length) return null;
    const top = heap[0];
    const last = heap.pop();
    if (heap.length) {
      heap[0] = last;
      let i = 0;
      while (true) {
        const left = 2 * i + 1;
        const right = left + 1;
        let smallest = i;
        if (left < heap.length && heap[left] < heap[smallest]) smallest = left;
        if (right < heap.length && heap[right] < heap[smallest]) smallest = right;
        if (smallest === i) break;
        [heap[smallest], heap[i]] = [heap[i], heap[smallest]];
        i = smallest;
      }
    }
    return { element: top, priority: top };
  }
}

class KthLargestRecord {
  constructor(nums, k, expected) {
    this.nums = nums;
    this.k = k;
    this.expected = expected;
  }
}

class Solution {
  /**
   * @param {number[]} nums
   * @param {number} k
   * @return {number}
   */
  findKthLargest(nums, k) {
    // Use min heap from library https://github.com/datastructures-js/priority-queue/blob/v5/README.md
    // This library is loaded by leetcode. Check the language setting for information
    let h = new MinPriorityQueue();

    // Insert the first k elements of num to the heap
    for (let i = 0; i < k; i++) {
      // enqueue() adds to the heap
      h.enqueue(nums[i]);
    }

    // After we have the first k element in the heap, we continue looking at the rest of the elements of the num array
    // and compare it to the root of the heap. If the ith element in the num array is greater than the heap root, we
    // remove the heap root and add the ith element of the num array to the heap. Go on until we finish looking at the number array

    for (let i = k; i < nums.length; i++) {
      // front() returns an object, we need the element property and compare to num[i]
      if (nums[i] > h.front().element) {
        // We remove the root of heap and add nums[i] to the heap
        // dequeue() remove's the root of the heap
        h.dequeue();
        h.enqueue(nums[i]);
      }
    }

    // At this point, we visited all the nums element
    return h.front().element;
  }
}

function testSolution(record) {
  const solution = new Solution();
  const result = solution.findKthLargest([...record.nums], record.k);

  console.log(`Input: nums = ${JSON.stringify(record.nums)}, k = ${record.k}`);
  console.log(`Expected: ${record.expected}`);
  console.log(`Result: ${result}`);
  console.log(result === record.expected ? Result.PASS : Result.FAIL);
}

const records = [
  new KthLargestRecord([3, 2, 1, 5, 6, 4], 2, 5),
  new KthLargestRecord([3, 2, 3, 1, 2, 4, 5, 5, 6], 4, 4),
  new KthLargestRecord([1], 1, 1),
  new KthLargestRecord([-1, -1, -2], 3, -2),
  new KthLargestRecord([7, 10, 4, 3, 20, 15], 1, 20),
];

records.forEach((record, index) => {
  console.log(`# Test case ${index + 1}`);
  testSolution(record);
  console.log("----------------------------------------");
});

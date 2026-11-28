// The median is the middle value in an ordered integer list. If the size of the list is even, there is no middle value, and the median is the mean of the two middle values.

// For example, for arr = [2,3,4], the median is 3.
// For example, for arr = [2,3], the median is (2 + 3) / 2 = 2.5.
// Implement the MedianFinder class:

// MedianFinder() initializes the MedianFinder object.
// void addNum(int num) adds the integer num from the data stream to the data structure.
// double findMedian() returns the median of all elements so far. Answers within 10-5 of the actual answer will be accepted.

// Example 1:

// Input
// ["MedianFinder", "addNum", "addNum", "findMedian", "addNum", "findMedian"]
// [[], [1], [2], [], [3], []]
// Output
// [null, null, null, 1.5, null, 2.0]

// Explanation
// MedianFinder medianFinder = new MedianFinder();
// medianFinder.addNum(1);    // arr = [1]
// medianFinder.addNum(2);    // arr = [1, 2]
// medianFinder.findMedian(); // return 1.5 (i.e., (1 + 2) / 2)
// medianFinder.addNum(3);    // arr[1, 2, 3]
// medianFinder.findMedian(); // return 2.0

// Constraints:

// -105 <= num <= 105
// There will be at least one element in the data structure before calling findMedian.
// At most 5 * 104 calls will be made to addNum and findMedian.

// Follow up:

// If all integer numbers from the stream are in the range [0, 100], how would you optimize your solution?
// If 99% of all integer numbers from the stream are in the range [0, 100], how would you optimize your solution?

// TC:
// addNum: O(logn) due to heaps
// findMedian: O(1) only accessing the index 0 of the heap array
// SC:
// addNum: O(n), we have 2 heaps and the total number of elements of both heaps will total all of the elements added
// findMedian: O(1), in place processing

// // Example input
// ["MedianFinder","addNum","addNum","addNum","addNum","addNum","addNum","addNum","findMedian","addNum","findMedian"]
// [[],[90203],[78],[234],[23432],[-12123],[8],[5],[],[3],[]]

// This is how the heaps would look like:
// [ 90203 ] [] - add to minheap, then move top of min heap to max heap, size, minHeap size < maxHeap size, move top of maxHeap back to minHeap
// [ 90203 ] [ 78 ] - add to minheap, then move top of min heap to max heap, size, minHeap size !< maxHeap size, do nothing
// [ 234, 90203 ] [ 78 ] - add to minheap, then move top of min heap to max heap, size, minHeap size < maxHeap size, move top of maxHeap back to minHeap
// [ 23432, 90203 ] [ 234, 78 ] - add to minheap, then move top of min heap to max heap, size, minHeap size !< maxHeap size, do nothing
// [ 234, 23432, 90203 ] [ 78, -12123 ] - add to minheap, then move top of min heap to max heap, size, minHeap size < maxHeap size, move top of maxHeap back to minHeap
// [ 234, 23432, 90203 ] [ 78, 8, -12123 ] - add to minheap, then move top of min heap to max heap, size, minHeap size !< maxHeap size, do nothing
// [ 78, 234, 23432, 90203 ] [ 8, 5, -12123 ] - add to minheap, then move top of min heap to max heap, size, minHeap size < maxHeap size, move top of maxHeap back to minHeap
// [ 78, 234, 23432, 90203 ] [ 8, 5, 3, -12123 ] - add to minheap, then move top of min heap to max heap, size, minHeap size !< maxHeap size, do nothing

// This is the expected output
// [null,null,null,null,null,null,null,null,78.00000,null,43.00000]

const Result = { PASS: "\x1b[92mPASS\x1b[0m", FAIL: "\x1b[91mFAIL\x1b[0m" };

// Minimal local stand-ins for the datastructures-js MinPriorityQueue / MaxPriorityQueue
// that LeetCode preloads (https://github.com/datastructures-js/priority-queue).
// front() and dequeue() return the raw value, matching how the solution below uses them.
class HeapPriorityQueue {
  constructor(compare) {
    this.compare = compare;
    this.heap = [];
  }

  size() {
    return this.heap.length;
  }

  front() {
    return this.heap.length ? this.heap[0] : null;
  }

  enqueue(value) {
    const heap = this.heap;
    heap.push(value);
    let i = heap.length - 1;
    while (i > 0) {
      const parent = (i - 1) >> 1;
      if (this.compare(heap[parent], heap[i]) <= 0) break;
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
        let best = i;
        if (left < heap.length && this.compare(heap[left], heap[best]) < 0) best = left;
        if (right < heap.length && this.compare(heap[right], heap[best]) < 0) best = right;
        if (best === i) break;
        [heap[best], heap[i]] = [heap[i], heap[best]];
        i = best;
      }
    }
    return top;
  }
}

class MinPriorityQueue extends HeapPriorityQueue {
  constructor() {
    super((a, b) => a - b);
  }
}

class MaxPriorityQueue extends HeapPriorityQueue {
  constructor() {
    super((a, b) => b - a);
  }
}

class MedianFinderRecord {
  // expected holds one entry per operation: null for the constructor and addNum,
  // and the median for findMedian.
  constructor(operations, args, expected) {
    this.operations = operations;
    this.args = args;
    this.expected = expected;
  }
}

class Solution {
  constructor() {
    // store num at each call of addNum
    // Using heaps
    this.maxHeap = new MaxPriorityQueue();
    this.minHeap = new MinPriorityQueue();
  }

  /**
   * @param {number} num
   * @return {void}
   */
  addNum(num) {
    // add num to internal storage and make sure it's sorted
    // Using min heap and max heap
    // first, add the num to the min queue
    this.minHeap.enqueue(num);

    // second, dequeue the min from minHeap and enqueue to maxHeap
    let minVal = this.minHeap.dequeue();
    this.maxHeap.enqueue(minVal);

    // Let's check if the total number of element we have on both queues is even.
    // It is even if the maxHeap has more element than the minHeap
    // We need to move the top of maxHeap to the minHeap
    if (this.minHeap.size() < this.maxHeap.size()) {
      let maxVal = this.maxHeap.dequeue();
      this.minHeap.enqueue(maxVal);
    }

    // At this point, our two heaps are balanced and should contain the same size of elements
    // console.log( this.minHeap.toArray(), this.maxHeap.toArray() )
  }

  /**
   * @return {number}
   */
  findMedian() {
    // We have 2 heaps with elements on it
    // If we have an odd number of elements, the size of the minHeap will be greater than the maxHeap,
    // So we just return the top of the minHeap. This will be our median
    if (this.minHeap.size() > this.maxHeap.size()) {
      return this.minHeap.front();
    } else {
      // the total elements we have is even because the maxHeap has more than the minHeap
      // We calculate the mean
      let mean = (this.minHeap.front() + this.maxHeap.front()) / 2;
      return mean;
    }
  }
}

function testSolution(record) {
  const solution = new Solution();

  const results = record.operations.map((operation, i) => {
    // The first operation is the constructor call, which returns null
    if (operation === "MedianFinder") return null;

    const result = solution[operation](...record.args[i]);
    return result === undefined ? null : result;
  });

  const pass = results.every((result, i) => {
    const expected = record.expected[i];

    return expected === null
      ? result === null
      : Math.abs(result - expected) <= 1e-5;
  });

  console.log(`Input: operations = ${JSON.stringify(record.operations)}`);
  console.log(`       args = ${JSON.stringify(record.args)}`);
  console.log(`Expected: ${JSON.stringify(record.expected)}`);
  console.log(`Result: ${JSON.stringify(results)}`);
  console.log(pass ? Result.PASS : Result.FAIL);
}

const records = [
  new MedianFinderRecord(
    ["MedianFinder", "addNum", "addNum", "findMedian", "addNum", "findMedian"],
    [[], [1], [2], [], [3], []],
    [null, null, null, 1.5, null, 2.0]
  ),
  new MedianFinderRecord(
    [
      "MedianFinder",
      "addNum",
      "addNum",
      "addNum",
      "addNum",
      "addNum",
      "addNum",
      "addNum",
      "findMedian",
      "addNum",
      "findMedian",
    ],
    [[], [90203], [78], [234], [23432], [-12123], [8], [5], [], [3], []],
    [null, null, null, null, null, null, null, null, 78.0, null, 43.0]
  ),
  new MedianFinderRecord(
    ["MedianFinder", "addNum", "findMedian"],
    [[], [-7], []],
    [null, null, -7]
  ),
  new MedianFinderRecord(
    ["MedianFinder", "addNum", "addNum", "findMedian", "addNum", "addNum", "findMedian"],
    [[], [-1], [-2], [], [-3], [-4], []],
    [null, null, null, -1.5, null, null, -2.5]
  ),
  new MedianFinderRecord(
    ["MedianFinder", "addNum", "addNum", "addNum", "findMedian"],
    [[], [5], [5], [5], []],
    [null, null, null, null, 5]
  ),
];

records.forEach((record, index) => {
  console.log(`# Test case ${index + 1}`);
  testSolution(record);
  console.log("----------------------------------------");
});

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

var MedianFinder = function () {
  // store num at each call of addNum
  // Using heaps
  this.maxHeap = new MaxPriorityQueue();
  this.minHeap = new MinPriorityQueue();
};

/**
 * @param {number} num
 * @return {void}
 */
MedianFinder.prototype.addNum = function (num) {
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
};

/**
 * @return {number}
 */
MedianFinder.prototype.findMedian = function () {
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
};

/**
 * Your MedianFinder object will be instantiated and called as such:
 * var obj = new MedianFinder()
 * obj.addNum(num)
 * var param_2 = obj.findMedian()
 */

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

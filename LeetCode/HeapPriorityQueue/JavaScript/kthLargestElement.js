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

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function (nums, k) {
  // Use min heap from library https://github.com/datastructures-js/priority-queue/blob/v5/README.md
  // This library is loaded by leetcode. Check the language setting for information
  let h = new MinPriorityQueue();

  // Insert the first k elements of num to the heap
  for (let i = 0; i < k; i++) {
    // enqueue() adds to the heap
    h.enqueue(nums[i]);
  }

  // console.log(h.toArray())

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
};

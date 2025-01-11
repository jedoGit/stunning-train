// Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.

// Example 1:

// Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
// Output: [[1,6],[8,10],[15,18]]
// Explanation: Since intervals [1,3] and [2,6] overlap, merge them into [1,6].
// Example 2:

// Input: intervals = [[1,4],[4,5]]
// Output: [[1,5]]
// Explanation: Intervals [1,4] and [4,5] are considered overlapping.

// Constraints:

// 1 <= intervals.length <= 104
// intervals[i].length == 2
// 0 <= starti <= endi <= 104

// TC: O(nlogn) due to sorting the array before processing it
// SC: O(n) in place processing

/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function (intervals) {
  // We need to sort the intervals in ascending order based on index zero of the intervals
  // Index zero is the starting point and index 1 is the ending point
  // [[start0, end0],[start1, end1],[start2, end2]...]
  intervals.sort((a, b) => a[0] - b[0]);
  // console.log(intervals)

  let output = [intervals[0]]; // Initialize the output array with the first element in the sorted intervals array

  // We want to start at index 1 of the intervals array..
  // JS array slice method return all values of the array starting at index 1.
  // We're using array deconstruction here. Intervals array is an array of arrays
  for (let [start, end] of intervals.slice(1)) {
    // console.log(start, end)
    // our last end is what we put in our output. output[output.length-1][1]
    const lastEnd = output[output.length - 1][1];

    // Check if the current start value is less than to the previous end value
    // This means that this interval is overlapping with the previous interval.
    // If it's less than the prevEnd, it IS overlapping.
    // If overlapping, we need to merge this interval. To merge interval, look at the
    // last end value and the current end value and use the max and save the new
    // interval in our output
    if (start <= lastEnd) {
      output[output.length - 1][1] = Math.max(lastEnd, end);
    } else {
      output.push([start, end]);
    }
  }

  return output;
};

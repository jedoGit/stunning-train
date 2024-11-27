// Given an array of intervals intervals where intervals[i] = [starti, endi], return the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping.

// Note that intervals which only touch at a point are non-overlapping. For example, [1, 2] and [2, 3] are non-overlapping.

// Example 1:

// Input: intervals = [[1,2],[2,3],[3,4],[1,3]]
// Output: 1
// Explanation: [1,3] can be removed and the rest of the intervals are non-overlapping.
// Example 2:

// Input: intervals = [[1,2],[1,2],[1,2]]
// Output: 2
// Explanation: You need to remove two [1,2] to make the rest of the intervals non-overlapping.
// Example 3:

// Input: intervals = [[1,2],[2,3]]
// Output: 0
// Explanation: You don't need to remove any of the intervals since they're already non-overlapping.

// Constraints:

// 1 <= intervals.length <= 105
// intervals[i].length == 2
// -5 * 104 <= starti < endi <= 5 * 104

// TC: O(nlogn + n), we have to sort the intervals array first (nlogn) and visit each intervals (n)
// SC: O(1) in place processing

/**
 * @param {number[][]} intervals
 * @return {number}
 */
var eraseOverlapIntervals = function (intervals) {
  // We need to sort the intervals in ascending order based on index zero of the intervals
  // Index zero is the starting point and index 1 is the ending point
  // [[start0, end0],[start1, end1],[start2, end2]...]
  intervals.sort((a, b) => a[0] - b[0]);
  // console.log(intervals)

  let res = 0;
  // Let's save the previous end value. It is index 0, element 1 of the intervals array
  let prevEnd = intervals[0][1];

  // We want to start at index 1 of the intervals array..
  // JS array slice method return all values of the array starting at index 1.
  // We're using array deconstruction here
  for (let [start, end] of intervals.slice(1)) {
    // console.log(start, end)

    // Check if the current start value is greater/equal to the previous end value
    // This means that this interval is NOT overlapping with the previous interval.
    // If it's less than the prevEnd, it IS overlapping.
    // If overlapping, we need to remove this interval. To remove interval, we set
    // a new prevEnd by taking the min of the current end and the previous end values
    if (start >= prevEnd) {
      prevEnd = end;
    } else {
      res += 1;
      prevEnd = Math.min(end, prevEnd);
    }
  }

  return res;
};

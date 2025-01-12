// You are given an array of non-overlapping intervals intervals where intervals[i] = [starti, endi] represent the start and the end of the ith interval and intervals is sorted in ascending order by starti. You are also given an interval newInterval = [start, end] that represents the start and end of another interval.

// Insert newInterval into intervals such that intervals is still sorted in ascending order by starti and intervals still does not have any overlapping intervals (merge overlapping intervals if necessary).

// Return intervals after the insertion.

// Note that you don't need to modify intervals in-place. You can make a new array and return it.

// Example 1:

// Input: intervals = [[1,3],[6,9]], newInterval = [2,5]
// Output: [[1,5],[6,9]]
// Example 2:

// Input: intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]
// Output: [[1,2],[3,10],[12,16]]
// Explanation: Because the new interval [4,8] overlaps with [3,5],[6,7],[8,10].

// Constraints:

// 0 <= intervals.length <= 104
// intervals[i].length == 2
// 0 <= starti <= endi <= 105
// intervals is sorted by starti in ascending order.
// newInterval.length == 2
// 0 <= start <= end <= 105

// TC: O(n), we're looping through each elements of the input array
// SC: O(n), because we're storing the results to an array

/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
var insert = function (intervals, newInterval) {
  let res = [];

  for (let i = 0; i < intervals.length; i++) {
    // If the new interval does not overlap with the first interval in the interval array,
    // it means it will not overlap with the rest of the intervals in the array.
    // So we add it to our results
    // Check the end of the newInterval if it's less than the start of the current Interval
    // If so, add the newInterval to the results array and return an array with the results array first followed by the rest of the intervals
    if (newInterval[1] < intervals[i][0]) {
      res.push([...newInterval]);
      // console.log(res)
      // console.log([...res, ...intervals.slice(i)])
      return [...res, ...intervals.slice(i)];
    } else if (newInterval[0] > intervals[i][1]) {
      // check if the start of the new interval is greater than the end of the current interval
      res.push([...intervals[i]]); // add the current interval to the results array
      // console.log(res)
    } else {
      // this is an overlapping interval
      // We need to merge the new interval with the current interval
      // The new interval will be, take the min of the start values, and the max of the end values
      newInterval = [
        Math.min(newInterval[0], intervals[i][0]),
        Math.max(newInterval[1], intervals[i][1]),
      ];
      // console.log(newInterval)
    }
  }

  // So we go to the end of the intervals array and there's nothing to compare the newInterval array with, so, we need to push it to our results array and return the result
  res.push([...newInterval]);

  // console.log(res)
  return res;
};

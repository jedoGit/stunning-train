// There are some spherical balloons taped onto a flat wall that represents the XY-plane. The balloons are represented as a 2D integer array points where points[i] = [xstart, xend] denotes a balloon whose horizontal diameter stretches between xstart and xend. You do not know the exact y-coordinates of the balloons.

// Arrows can be shot up directly vertically (in the positive y-direction) from different points along the x-axis. A balloon with xstart and xend is burst by an arrow shot at x if xstart <= x <= xend. There is no limit to the number of arrows that can be shot. A shot arrow keeps traveling up infinitely, bursting any balloons in its path.

// Given the array points, return the minimum number of arrows that must be shot to burst all balloons.

// Example 1:

// Input: points = [[10,16],[2,8],[1,6],[7,12]]
// Output: 2
// Explanation: The balloons can be burst by 2 arrows:
// - Shoot an arrow at x = 6, bursting the balloons [2,8] and [1,6].
// - Shoot an arrow at x = 11, bursting the balloons [10,16] and [7,12].
// Example 2:

// Input: points = [[1,2],[3,4],[5,6],[7,8]]
// Output: 4
// Explanation: One arrow needs to be shot for each balloon for a total of 4 arrows.
// Example 3:

// Input: points = [[1,2],[2,3],[3,4],[4,5]]
// Output: 2
// Explanation: The balloons can be burst by 2 arrows:
// - Shoot an arrow at x = 2, bursting the balloons [1,2] and [2,3].
// - Shoot an arrow at x = 4, bursting the balloons [3,4] and [4,5].

// Constraints:

// 1 <= points.length <= 105
// points[i].length == 2
// -231 <= xstart < xend <= 231 - 1

// TC: O(nlogn) due to sorting
// SC: O(1) in place processing... disregarding the space required for sorting

/**
 * @param {number[][]} points
 * @return {number}
 */
var findMinArrowShots = function (points) {
  // What we need to do is:
  // 1. Sort the intervals by their starting point: [start, end]
  // 2. Detect if there are overlapping intervals
  // 3. If overlapping, we want to merge them. We want to take the intersection of the overlapping intervals:
  //    ex. [1,7] intersect [2,8] => [2,7] , [1,7] intersect [2,5] => [2,5]
  // 4. Count the number of intersections we have and the intervals that do not have an intersection

  points.sort((a, b) => a[0] - b[0]);

  let res = points.length; // we'll initially assume that we need an arrow for each interval. We'll decrement each time we see an intersect
  let prev = points[0];

  // Let's start at the element #1 of the input array
  // For each iteration, we compare the previous interval from the current one and update the previous interval
  for (let i = 1; i < points.length; i++) {
    const curr = points[i];

    // At this point, we know that our array is sorted by the starting point
    // Let's compare the starting point of our current interval from the previous if they are overlapping
    // It's overlapping if the start of the current is less than or equal to the end of the previous
    if (curr[0] <= prev[1]) {
      // We know it's overlapping, so let's decrement the arrow count
      res -= 1;
      // Let's get the intersection of the intervals
      // The new prev is the intersection
      prev = [curr[0], Math.min(prev[1], curr[1])];
    } else {
      prev = curr;
    }
  }
  return res;
};

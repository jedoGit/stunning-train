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

// TC: O(nlogn + n), we have to sort the intervals array first (nlogn) and visit each intervals (n)
// SC: O(1) in place processing... disregarding the space required for sorting.

const Result = { PASS: "\x1b[92mPASS\x1b[0m", FAIL: "\x1b[91mFAIL\x1b[0m" };

class FindMinArrowShotsRecord {
  constructor(points, expected) {
    this.points = points;
    this.expected = expected;
  }
}

class Solution {
  /**
   * @param {number[][]} points
   * @return {number}
   */
  findMinArrowShots(points) {
    // For interval problems, we need to sort the input arrays by their starting points
    // The input looks like this: [[a,b,...]]=[[a0,a1],[b0,b1]...]
    points.sort((a, b) => a[0] - b[0]);

    // console.log(points)

    // Initialize the results variable to represent 1 arrow for each interval
    let res = points.length;

    // Initialize the prev variable to element 0 of the points array
    let prev = points[0];

    // Let's check every elements of the points array if they are overlapping

    for (let i = 1; i < points.length; i++) {
      let curr = points[i];

      // It's overlapping if curr starting point is less than the prev ending point
      // [1 , 5] , [ 2 , 6] => the new prev will be [2 , 5] <== this is the overlapping portion
      // [1 , 5] , [ 2 , 4] => the new prev will be [2 , 4] <== this is the overlapping portion
      // Everytime we see an overlap, we subtract 1 from our results variable. Remember, we initialize it with 1 arrovw for each interval.
      if (curr[0] <= prev[1]) {
        res -= 1;
        prev = [curr[0], Math.min(curr[1], prev[1])];
      } else {
        prev = curr;
      }
    }

    return res;
  }
}

function testSolution(record) {
  const solution = new Solution();
  // The solution sorts the points in place, so we pass a clone to keep the record intact
  const points = record.points.map((point) => [...point]);
  const result = solution.findMinArrowShots(points);
  const pass = result === record.expected;

  console.log(`Input: points = ${JSON.stringify(record.points)}`);
  console.log(`Expected: ${record.expected}`);
  console.log(`Result: ${result}`);
  console.log(pass ? Result.PASS : Result.FAIL);
}

const records = [
  new FindMinArrowShotsRecord(
    [
      [10, 16],
      [2, 8],
      [1, 6],
      [7, 12],
    ],
    2
  ),
  new FindMinArrowShotsRecord(
    [
      [1, 2],
      [3, 4],
      [5, 6],
      [7, 8],
    ],
    4
  ),
  new FindMinArrowShotsRecord(
    [
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
    ],
    2
  ),
  new FindMinArrowShotsRecord([[1, 2]], 1),
  new FindMinArrowShotsRecord(
    [
      [1, 100],
      [11, 22],
      [1, 11],
      [2, 12],
    ],
    1
  ),
];

records.forEach((record, index) => {
  console.log(`# Test case ${index + 1}`);
  testSolution(record);
  console.log("----------------------------------------");
});

// https://leetcode.com/problems/maximum-number-of-visible-points/

// You are given an array points, an integer angle, and your location, where location = [posx, posy] and
// points[i] = [xi, yi] both denote integral coordinates on the X-Y plane.

// Initially, you are facing directly east from your position. You cannot move from your position, but you can
// rotate. In other words, posx and posy cannot be changed. Your field of view in degrees is represented by angle,
// determining how wide you can see from any given view direction. Let d be the amount in degrees that you rotate
// counterclockwise. Then, your field of view is the inclusive range of angles [d - angle/2, d + angle/2].

// You can see some set of points if, for each point, the angle formed by the point, your position, and the
// immediate east direction from your position is in your field of view.

// There can be multiple points at one coordinate. There may be points at your location, and you can always see
// these points regardless of your rotation. Points do not obstruct your vision to other points.

// Return the maximum number of points you can see.

// Example 1:

// Input: points = [[2,1],[2,2],[3,3]], angle = 90, location = [1,1]
// Output: 3
// Explanation: The shaded region represents your field of view. All points can be made visible in your field of view, including [3,3] even though [2,2] is in front and in the same line of sight.
// Example 2:

// Input: points = [[2,1],[2,2],[3,4],[1,1]], angle = 90, location = [1,1]
// Output: 4
// Explanation: All points can be made visible in your field of view, including the one at your location.
// Example 3:

// Input: points = [[1,0],[2,1]], angle = 13, location = [1,1]
// Output: 1
// Explanation: You can only see one of the two points, as shown above.

// Constraints:

// 1 <= points.length <= 105
// points[i].length == 2
// location.length == 2
// 0 <= angle < 360
// 0 <= posx, posy, xi, yi <= 100

// TC: O(n log n), the dominant cost is sorting the computed angles... the sliding window itself is O(n)
// SC: O(n), we store the angle of every point plus the duplicated entries for the negative angles

const Result = { PASS: "\x1b[92mPASS\x1b[0m", FAIL: "\x1b[91mFAIL\x1b[0m" };

class VisiblePointsRecord {
  constructor(points, angle, location, expected) {
    this.points = points;
    this.angle = angle;
    this.location = location;
    this.expected = expected;
  }
}

class Solution {
  /**
   * @param {number[][]} points
   * @param {number} angle
   * @param {number[]} location
   * @return {number}
   */
  visiblePoints(points, angle, location) {
    // 1. Get all the angles of the points directly in front of you as you rotate. This angle is d, which is in reference to your immediate east direction.
    // The angle d is computed as atan(opposite/adjacent) = atan(y2-y1/x2-x1) = atan(p[1]-location[1]/p[0]-location[0]).
    // Also, let's not include the points that are directly coincidental to you... don't add the points we looked at in step 1.
    // Add these angles to an array.
    let anglesD = points
      .filter((p) => !(p[0] === location[0] && p[1] === location[1]))
      .map((p) => {
        return (
          (Math.atan2(p[1] - location[1], p[0] - location[0]) * 180) / Math.PI
        );
      })
      .sort((a, b) => a - b);

    // 2. Compute all the points that are visible to you. The points that are visible to you are the points that you're directly coincidental to you
    let onCenterCount = points.length - anglesD.length;

    // 3. For each angles in the anglesD array that are negative, add a new entry in the anglesD array and add 360 to that negative angle
    anglesD = [...anglesD, ...anglesD.filter((d) => d < 0).map((d) => d + 360)];

    let r = 0;
    let l = 0;
    let res = 0;

    // 4. Here, we'll do some windowing technique here
    while (r < anglesD.length) {
      // Shorten the window by incrementing l
      while (anglesD[r] - anglesD[l] > angle) {
        l += 1;
      }
      // In here, let's compute the max every time we increase or shorten the window
      res = Math.max(res, r - l + 1);
      // Increase the window by incrementing r
      r += 1;
    }

    return res + onCenterCount;
  }
}

function testSolution(record) {
  const solution = new Solution();
  const result = solution.visiblePoints(
    record.points.map((p) => [...p]),
    record.angle,
    [...record.location]
  );
  const pass = result === record.expected;

  console.log(
    `Input: points = ${JSON.stringify(record.points)}, angle = ${
      record.angle
    }, location = ${JSON.stringify(record.location)}`
  );
  console.log(`Expected: ${record.expected}`);
  console.log(`Result: ${result}`);
  console.log(pass ? Result.PASS : Result.FAIL);
}

const records = [
  new VisiblePointsRecord(
    [
      [2, 1],
      [2, 2],
      [3, 3],
    ],
    90,
    [1, 1],
    3
  ),
  new VisiblePointsRecord(
    [
      [2, 1],
      [2, 2],
      [3, 4],
      [1, 1],
    ],
    90,
    [1, 1],
    4
  ),
  new VisiblePointsRecord(
    [
      [1, 0],
      [2, 1],
    ],
    13,
    [1, 1],
    1
  ),
  new VisiblePointsRecord([[1, 1]], 0, [1, 1], 1),
  new VisiblePointsRecord(
    [
      [0, 0],
      [0, 2],
    ],
    90,
    [1, 1],
    2
  ),
];

records.forEach((record, index) => {
  console.log(`# Test case ${index + 1}`);
  testSolution(record);
  console.log("----------------------------------------");
});

// https://leetcode.com/problems/maximum-number-of-visible-points/

/**
 * @param {number[][]} points
 * @param {number} angle
 * @param {number[]} location
 * @return {number}
 */
var visiblePoints = function (points, angle, location) {
  // 1. Get all the angles of the points directly in front of you as you rotate. This angle is d, which is in reference to your immediate east direction.
  // The angle d is computed as atan(opposite/adjacent) = atan(y2-y1/x2-x1) = atan(p[1]-location[1]/p[0]-location[0]).
  // Also, let's not include the points that are directly coincidental to you... don't add the points we looked at in step 1.
  // Add these angles to an array.
  let anglesD = points
    .filter((p) => !(p[0] === location[0] && p[1] === location[1]))
    .map((p) => {
      // console.log(p[1], p[0])
      return (
        (Math.atan2(p[1] - location[1], p[0] - location[0]) * 180) / Math.PI
      );
    })
    .sort((a, b) => a - b);
  // console.log(anglesD)

  // 2. Compute all the points that are visible to you. The points that are visible to you are the points that you're directly coincidental to you
  let onCenterCount = points.length - anglesD.length;

  // 3. For each angles in the anglesD array that are negative, add a new entry in the anglesD array and add 360 to that negative angle
  anglesD = [...anglesD, ...anglesD.filter((d) => d < 0).map((d) => d + 360)];
  // console.log(anglesD)

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
    // console.log(r,l, res)
    // Increase the window by incrementing r
    r += 1;
  }

  return res + onCenterCount;
};

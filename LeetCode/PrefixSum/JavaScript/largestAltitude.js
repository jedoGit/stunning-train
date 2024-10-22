// There is a biker going on a road trip. The road trip consists of n + 1 points at different altitudes. The biker starts his trip on point 0 with altitude equal 0.

// You are given an integer array gain of length n where gain[i] is the net gain in altitude between points i​​​​​​ and i + 1 for all (0 <= i < n). Return the highest altitude of a point.

// Example 1:

// Input: gain = [-5,1,5,0,-7]
// Output: 1
// Explanation: The altitudes are [0,-5,-4,1,1,-6]. The highest is 1.
// Example 2:

// Input: gain = [-4,-3,-2,-1,4,3,2]
// Output: 0
// Explanation: The altitudes are [0,-4,-7,-9,-10,-6,-3,-1]. The highest is 0.

// Constraints:

// n == gain.length
// 1 <= n <= 100
// -100 <= gain[i] <= 100

// TC: O(n) because we'll loop through the gain one time
// SC: O(n) because we create an array of the size of the input array

/**
 * @param {number[]} gain
 * @return {number}
 */
var largestAltitude = function (gain) {
  // We will be using prefix sum algorithm. In prefix sum, the 0th element of the
  // computed array is always 0. In this case, we're computing for the altitude for
  // each waypoint. Each waypoint, there is a gain.
  let alt = [0];
  let maxAlt = 0;

  // We loop through formula of the prefix sum
  // computed[n+1] = computed[n] + value[n]
  for (let i = 0; i < gain.length; i++) {
    alt[i + 1] = alt[i] + gain[i];

    // After every computation of the altitude, we save the max altitude we see
    maxAlt = Math.max(maxAlt, alt[i + 1]);
  }

  // Return the max altitude
  return maxAlt;
};

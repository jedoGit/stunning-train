// Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.

// Example 1:

// Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]
// Output: 6
// Explanation: The above elevation map (black section) is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water (blue section) are being trapped.
// Example 2:

// Input: height = [4,2,0,3,2,5]
// Output: 9

// Constraints:

// n == height.length
// 1 <= n <= 2 * 104
// 0 <= height[i] <= 105

// TC: O(n) looping through all the elements of the array
// SC: O(1) in place processing

/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
  // If the input array is empty, return 0
  if (!height.length > 0) return 0;

  // Using two pointers. We also need to maintain a leftMax and rightMax as we move the l and r pointers
  let n = height.length;
  let l = 0;
  let r = n - 1;
  let lMax = height[l];
  let rMax = height[r];
  let res = 0;

  // We stop when our left and right pointers overlap
  while (l < r) {
    // First, we check the max left or right value we've seen so far,
    // If the left max is lesser than the right max,
    // we work on the left side by moving the left pointer by 1,
    // updating the new left max, then computing for the result
    // If the right max is lesser than the left max, we work on the right side...
    if (lMax < rMax) {
      l += 1;
      lMax = Math.max(lMax, height[l]);
      res += lMax - height[l];
    } else {
      r -= 1;
      rMax = Math.max(rMax, height[r]);
      res += rMax - height[r];
    }
  }

  return res;
};

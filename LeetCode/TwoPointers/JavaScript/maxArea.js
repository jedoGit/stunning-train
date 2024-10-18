// You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).

// Find two lines that together with the x-axis form a container, such that the container contains the most water.

// Return the maximum amount of water a container can store.

// Notice that you may not slant the container.

// Input: height = [1,8,6,2,5,4,8,3,7]
// Output: 49
// Explanation: The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water (blue section) the container can contain is 49.
// Example 2:

// Input: height = [1,1]
// Output: 1

// Constraints:

// n == height.length
// 2 <= n <= 105
// 0 <= height[i] <= 104

// TC: O(n), we have to loop through one time
// SC: O(1), we're not creating memory

/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height) {
  let lp = 0;
  let rp = height.length - 1;
  let max_area = 0;

  while (lp < rp) {
    // We need to compute the area of a triangle A = H * W
    // For the height, we need to chose the lower hieght so water will not spill
    // To calculate the width, it's just the right pointer - left pointer
    let h = Math.min(height[lp], height[rp]);
    let w = rp - lp;
    let current_area = h * w;
    max_area = Math.max(max_area, current_area);

    // Now, we need to move the left or right pointer
    // We want to keep the height with the larger value
    // in case there are other taller height that will give us a larger area
    if (height[lp] < height[rp]) {
      lp++; // increament to the right so we can compute if the current_area is larger
    } else {
      rp--; // decrement to the left so we can compute if the current_area is larger
    }
  }

  return max_area;
};

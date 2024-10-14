// TC: O(n), We have 3 for loops
// SC: O(1), we're not creating new memory
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function (nums) {
  const n = nums.length;
  const left = new Array(n).fill(1);
  const right = new Array(n).fill(1);

  // first loop is to compute all the product of the elements to the left of what's the current index.
  // we start in index 1
  for (let i = 1; i < nums.length; i++) {
    left[i] = left[i - 1] * nums[i - 1];
  }

  // second loop is to compute all the product of the elements to the right of what's the current index.
  // we start in index nums.length - 2, this is the second to the last element
  for (let j = nums.length - 2; j > -1; j--) {
    right[j] = right[j + 1] * nums[j + 1];
  }

  const retVal = [];
  // the last loop it to multiply the left and right arrays element by element
  for (k = 0; k < nums.length; k++) {
    retVal[k] = left[k] * right[k];
  }

  return retVal;
};

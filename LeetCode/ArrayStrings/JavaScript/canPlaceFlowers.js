// You have a long flowerbed in which some of the plots are planted, and some are not. However, flowers cannot be planted in adjacent plots.

// Given an integer array flowerbed containing 0's and 1's, where 0 means empty and 1 means not empty, and an integer n, return true if n new flowers can be planted in the flowerbed without violating the no-adjacent-flowers rule and false otherwise.

// Example 1:

// Input: flowerbed = [1,0,0,0,1], n = 1
// Output: true
// Example 2:

// Input: flowerbed = [1,0,0,0,1], n = 2
// Output: false

// Constraints:

// 1 <= flowerbed.length <= 2 * 104
// flowerbed[i] is 0 or 1.
// There are no two adjacent flowers in flowerbed.
// 0 <= n <= flowerbed.length

// TC: O(n) we have to loop through flowerbed once
// SC: O(1) constant extra space is used
/**
 * @param {number[]} flowerbed
 * @param {number} n
 * @return {boolean}
 */
var canPlaceFlowers = function (flowerbed, n) {
  let count = 0;

  for (let i = 0; i < flowerbed.length; i++) {
    // first, we want to check if the current index is empty
    if (flowerbed[i] === 0) {
      // now, we check if the left and right of the element of the current index is empty.
      // for the first and last index, we assume that the left of index 0 is empty
      // similarly, the right of the last index is also empty
      let leftIsEmpty = flowerbed[i - 1] === 0 || i === 0;
      let rightIsEmpty = flowerbed[i + 1] === 0 || i === flowerbed.length - 1;

      if (leftIsEmpty && rightIsEmpty) {
        // we plant a flower
        flowerbed[i] = 1;
        count++;

        // we can exit early if count is already greater or equal to n
        if (count >= n) {
          return true;
        }
      }
    }
  }

  // return true if count is greater or equal to n
  return count >= n;
};

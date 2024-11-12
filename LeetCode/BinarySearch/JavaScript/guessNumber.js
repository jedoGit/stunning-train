// We are playing the Guess Game. The game is as follows:

// I pick a number from 1 to n. You have to guess which number I picked.

// Every time you guess wrong, I will tell you whether the number I picked is higher or lower than your guess.

// You call a pre-defined API int guess(int num), which returns three possible results:

// -1: Your guess is higher than the number I picked (i.e. num > pick).
// 1: Your guess is lower than the number I picked (i.e. num < pick).
// 0: your guess is equal to the number I picked (i.e. num == pick).
// Return the number that I picked.

// Example 1:

// Input: n = 10, pick = 6
// Output: 6
// Example 2:

// Input: n = 1, pick = 1
// Output: 1
// Example 3:

// Input: n = 2, pick = 1
// Output: 1

// Constraints:

// 1 <= n <= 231 - 1
// 1 <= pick <= n

// TC: O(log n) is the worst for binary search
// SC: O(log n) due to recursion

/**
 * Forward declaration of guess API.
 * @param {number} num   your guess
 * @return 	     -1 if num is higher than the picked number
 *			      1 if num is lower than the picked number
 *               otherwise return 0
 * var guess = function(num) {}
 */

/**
 * @param {number} n
 * @return {number}
 */
var guessNumber = function (n) {
  function findNum(start, end) {
    const mid = Math.floor((start + end) / 2);

    if (guess(mid) === 0) return mid;
    if (guess(mid) === -1) return findNum(start, mid - 1);
    if (guess(mid) === 1) return findNum(mid + 1, end);
  }

  return findNum(1, n);
};

// TC: O(log n) is the worst for binary search
// SC: O(1) in place processing

/**
 * @param {number} n
 * @return {number}
 */
var guessNumber = function (n) {
  let l = 1;
  let r = n;

  while (l <= r) {
    const mid = Math.floor((l + r) / 2);

    const result = guess(mid);
    if (result === -1) {
      r = mid - 1;
    } else if (result === 1) {
      l = mid + 1;
    } else {
      return mid;
    }
  }

  return -1;
};

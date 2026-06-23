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
const Result = { PASS: "\x1b[92mPASS\x1b[0m", FAIL: "\x1b[91mFAIL\x1b[0m" };

class GuessNumberRecord {
  constructor(n, pick, expected) {
    this.n = n;
    this.pick = pick;
    this.expected = expected;
  }
}

class Solution {
  constructor(pick) {
    this.pick = pick;
  }

  guess(num) {
    if (num > this.pick) return -1;
    if (num < this.pick) return 1;
    return 0;
  }

  guessNumber(n) {
    let l = 1;
    let r = n;

    while (l <= r) {
      const mid = Math.floor((l + r) / 2);

      const result = this.guess(mid);
      if (result === -1) {
        r = mid - 1;
      } else if (result === 1) {
        l = mid + 1;
      } else {
        return mid;
      }
    }

    return -1;
  }
}

function testSolution(record) {
  const solution = new Solution(record.pick);
  const result = solution.guessNumber(record.n);
  const status = result === record.expected ? Result.PASS : Result.FAIL;

  console.log(`Input: n = ${record.n}, pick = ${record.pick}`);
  console.log(`Expected: ${record.expected}`);
  console.log(`Result: ${result}`);
  console.log(status);
}

const records = [
  new GuessNumberRecord(10, 6, 6),
  new GuessNumberRecord(1, 1, 1),
  new GuessNumberRecord(2, 1, 1),
  new GuessNumberRecord(2, 2, 2),
];

records.forEach((record, index) => {
  console.log(`# Test case ${index + 1}`);
  testSolution(record);
  console.log("--------------------");
});

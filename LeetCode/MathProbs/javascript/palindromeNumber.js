// Given an integer x, return true if x is a
// palindrome
// , and false otherwise.

// Example 1:

// Input: x = 121
// Output: true
// Explanation: 121 reads as 121 from left to right and from right to left.
// Example 2:

// Input: x = -121
// Output: false
// Explanation: From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome.
// Example 3:

// Input: x = 10
// Output: false
// Explanation: Reads 01 from right to left. Therefore it is not a palindrome.

// Constraints:

// -231 <= x <= 231 - 1

/**
 * @param {number} x
 * @return {boolean}
 */
const Result = { PASS: "\x1b[92mPASS\x1b[0m", FAIL: "\x1b[91mFAIL\x1b[0m" };

class PalindromeNumberRecord {
  constructor(x, expected) {
    this.x = x;
    this.expected = expected;
  }
}

// TC: O(n), we process digit by digit
// SC: O(n), we create an array of digits

// var isPalindrome = function(x) {

//     // 121, true
//     // 00, true
//     // 1 , true
//     // null , false, invalid input
//     // 1221, true
//     // 1221221, true
//     // 12221, true
//     // 123, false
//     // 12, false
//     // -10-1, false, invalid input
//     // -101, false

//     // If x is null or x is negative, it will not be a palindrome

//     if ( !x || x < 0) {
//         return false
//     }

//     // Int X need to be read digit by digit
//     //const xStr = x.toString()

//     let x_ = x
//     let xStr = []

//     while (x_ > 0) {
//         let d = x_ % 10
//         xStr.unshift(d)
//         x_ = Math.floor(x_/10)
//         // console.log(x_,d,xStr)
//     }

//     // console.log(xStr)
//     xStr.join()

//     const n = xStr.length
//     let l = 0
//     let r = n-1

//     // if ( n === 1 ) {
//     //     return true
//     // }

//     // Using 2 pointers, l and r, compare if values are different
//     // Move l to the middle and move r to the middle
//     // This will handle when n===1, it will not go through the while loop for n === 1.
//     while ( l < r ) {
//         if ( xStr[l] !== xStr[r] ) {
//         // console.log(xStr[l], xStr[r])
//             return false
//         }
//         l += 1
//         r -= 1
//     }

//     return true
// };

class Solution {
  /**
   * @param {number} x
   * @return {boolean}
   */
  isPalindrome(x) {
    let x_ = x;
    let xR = 0;

    // To reverse the digits of x, we multiply xR by 10. Add x_ % 10 to XR. Then divide x_ by 10.
    while (x_ > 0) {
      xR = xR * 10 + (x_ % 10);
      x_ = Math.floor(x_ / 10);
    }

    // if the reversed x is equal to the original x, then it's a palindrome.
    return xR === x;
  }
}

function testSolution(record) {
  const solution = new Solution();
  const result = solution.isPalindrome(record.x);
  const status = result === record.expected ? Result.PASS : Result.FAIL;

  console.log(`input: x: ${record.x}`);
  console.log(`expected: ${record.expected}`);
  console.log(`result: ${result}`);
  console.log(status);
}

const records = [
  new PalindromeNumberRecord(121, true),
  new PalindromeNumberRecord(-121, false),
  new PalindromeNumberRecord(10, false),
  new PalindromeNumberRecord(0, true),
];

records.forEach((record, index) => {
  console.log(`# Test case ${index + 1}`);
  testSolution(record);
  console.log("-".repeat(50));
});

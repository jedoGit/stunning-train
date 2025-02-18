// Given two non-negative integers, num1 and num2 represented as string, return the sum of num1 and num2 as a string.

// You must solve the problem without using any built-in library for handling large integers (such as BigInteger). You must also not convert the inputs to integers directly.

// Example 1:

// Input: num1 = "11", num2 = "123"
// Output: "134"
// Example 2:

// Input: num1 = "456", num2 = "77"
// Output: "533"
// Example 3:

// Input: num1 = "0", num2 = "0"
// Output: "0"

// Constraints:

// 1 <= num1.length, num2.length <= 104
// num1 and num2 consist of only digits.
// num1 and num2 don't have any leading zeros except for the zero itself.

// TC: O(max(length of n1, length of n2))
// SC: O(max(length of n1, length of n2)), we created a output string and at worst, the length is max(length of n1, length of n2)

/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
// var addStrings = function (num1, num2) {
//   // num = "123"

//   // cumSum += num[0] * Math.power(10, num.length-1-0) = 1 * 10^(3-1-0) = 1 * 10^2 = 100
//   // cumSum += num[1] * Math.power(10, num.length-1-1) = 100 + 2 * 10^(3-1-1) = 100 + 2 * 10^1 = 100 + 20 = 120
//   // cumSum += num[2] * Math.power(10, num.length-1-2) = 120 + 3 * 10^(3-1-2) = 120 + 3 * 10^0 = 120 + 3 = 123

//   const n1Len = num1.length;
//   const n2Len = num2.length;

//   let n1Int = 0;
//   let n2Int = 0;

//   // Convert n1 to integer
//   for (let i = 0; i < n1Len; i += 1) {
//     n1Int += num1[i] * Math.pow(10, n1Len - 1 - i);
//   }

//   // Convert n2 to integer
//   for (let i = 0; i < n2Len; i += 1) {
//     n2Int += num2[i] * Math.pow(10, n2Len - 1 - i);
//   }

//   // Take the sum
//   let sum = n1Int + n2Int;

//   // if sum is zero, return right away
//   if (sum === 0) return "0";

//   let revVal = "";

//   // sum = 123, 10000 + 1000 = 11000

//   // Read each digit of the sum and convert to string
//   while (sum > 0) {
//     let val = sum % 10;
//     revVal += val;
//     sum = Math.floor(sum / 10);
//   }

//   // retVal = "321" => "123"
//   //           l r

//   let retVal = "";

//   // Since our string was reversed from the last conversion, we'll need to reverse it.
//   for (let i = revVal.length - 1; i > -1; i -= 1) {
//     retVal += revVal[i];
//   }

//   return retVal;
// };

/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */

var addStrings = function (num1, num2) {
  let i = num1.length - 1;
  let j = num2.length - 1;
  let sum = [];
  let carry = 0;
  while (i >= 0 || j >= 0 || carry) {
    let n1 = num1[i] || 0;
    let n2 = num2[j] || 0;

    let curSum = parseInt(n1) + parseInt(n2) + carry;
    let reminder = curSum % 10;
    sum.push(reminder);
    carry = curSum >= 10 ? 1 : 0;
    j--;
    i--;
  }

  return sum.reverse().join("");
};

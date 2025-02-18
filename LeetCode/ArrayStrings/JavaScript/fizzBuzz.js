// Given an integer n, return a string array answer (1-indexed) where:

// answer[i] == "FizzBuzz" if i is divisible by 3 and 5.
// answer[i] == "Fizz" if i is divisible by 3.
// answer[i] == "Buzz" if i is divisible by 5.
// answer[i] == i (as a string) if none of the above conditions are true.

// Example 1:

// Input: n = 3
// Output: ["1","2","Fizz"]
// Example 2:

// Input: n = 5
// Output: ["1","2","Fizz","4","Buzz"]
// Example 3:

// Input: n = 15
// Output: ["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"]

// Constraints:

// 1 <= n <= 104

// TC: O(n)
// SC: O(1)

/**
 * @param {number} n
 * @return {string[]}
 */
var fizzBuzz = function (n) {
  // n = 15
  // 1 = 1
  // 2 = 2
  // 3 = fizz
  // 4 = 4
  // 5 = buzz
  // 6 = fizz
  // 7 = 7
  // 8 = 8
  // 9 = fizz
  // 10 = buzz
  // 11 = 11
  // 12 = fizz
  // 13 = 13
  // 14 = 14
  // 15 = fizzbuzz

  let res = [];

  for (let i = 1; i < n + 1; i += 1) {
    const div3 = i % 3;
    const div5 = i % 5;
    if (div3 === 0 && div5 === 0) {
      res.push("FizzBuzz");
    } else if (div3 === 0) {
      res.push("Fizz");
    } else if (div5 === 0) {
      res.push("Buzz");
    } else {
      res.push(i.toString());
    }
  }

  return res;
};

// Trailing zeros in a factorial come from multiplying pairs of 2 and 5.
// Since factors of 2 are more frequent,we only need to count
// the number of 5 s in the prime factorization of n!.

/**
 * @param {number} n
 * @return {number}
 */
var trailingZeroes = function (n) {
  let count = 0;

  while (n > 0) {
    count = count + Math.floor(n / 5);
    n = Math.floor(n / 5);
  }

  return count;
};

let input = { n: 3 };
let expected = 0;
let result = trailingZeroes(input["n"]);
console.log("Input: ", input);
console.log("Result: ", result);
console.log("Expected: ", expected);

console.log("-".repeat(50));

input = { n: 5 };
expected = 1;
result = trailingZeroes(input["n"]);
console.log("Input: ", input);
console.log("Result: ", result);
console.log("Expected: ", expected);

console.log("-".repeat(50));

input = { n: 0 };
expected = 0;
result = trailingZeroes(input["n"]);
console.log("Input: ", input);
console.log("Result: ", result);
console.log("Expected: ", expected);

/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
var addBinary = function (a, b) {
  // Use BigInt instead of parseInt
  let num1 = BigInt(`0b${a}`);
  let num2 = BigInt(`0b${b}`);

  let sum = num1 + num2;

  let binarySum = sum.toString(2);

  return binarySum;

  // Use BigInt instead of parseInt
  // let num1 = BigInt(`0b${a}`);
  // let num2 = BigInt(`0b${b}`);

  // while( num2 !== 0n ) {
  //     let carry = num1 & num2;
  //     num1 = num1 ^ num2;
  //     num2 = carry << 1n;
  // }

  //   return num1.toString(2);
};

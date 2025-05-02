/**
 * @param {number} n - a positive integer
 * @return {number} - a positive integer
 */
var reverseBits = function (n) {
  let result = 0;
  for (let i = 0; i < 32; i++) {
    // take the i bit from the end then perform & with ...000001
    // to obtain ...000000 or ...000001 as the i bit from the end of n.
    const bit = (n >> i) & 1;
    // Perform the OR | operator with result to append the bit
    // at index i position by shifting left bit (31 -i)
    result = result | (bit << (31 - i));
  }
  // For keeping the sign for the result.
  return result >>> 0;
};

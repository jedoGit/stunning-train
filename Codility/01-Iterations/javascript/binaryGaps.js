// A binary gap within a positive integer N is any maximal sequence of consecutive zeros that is surrounded by ones at both ends in the binary representation of N.

// For example, number 9 has binary representation 1001 and contains a binary gap of length 2. The number 529 has binary representation 1000010001 and contains two binary gaps: one of length 4 and one of length 3. The number 20 has binary representation 10100 and contains one binary gap of length 1. The number 15 has binary representation 1111 and has no binary gaps. The number 32 has binary representation 100000 and has no binary gaps.

// Write a function:

// function solution(N);

// that, given a positive integer N, returns the length of its longest binary gap. The function should return 0 if N doesn't contain a binary gap.

// For example, given N = 1041 the function should return 5, because N has binary representation 10000010001 and so its longest binary gap is of length 5. Given N = 32 the function should return 0, because N has binary representation '100000' and thus no binary gaps.

// Write an efficient algorithm for the following assumptions:

// N is an integer within the range [1..2,147,483,647].

// TC: O(n), where n is the number of chars after conversion of the integer input to binary
// SC: O(1), in place processing.

// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

function solution(N) {
  // Implement your solution here
  // First thing to do is convert the input integer to binary
  //   const binStr = N.toString(2); // This is a to string method of a number in JS

  let num2Conv = N;
  let binStr = "";
  while (num2Conv) {
    binStr = binStr + (num2Conv & 1);
    num2Conv >>= 1;
  }

  // reverse the binStr
  let l = 0;
  let r = binStr.length - 1;

  while (l < r) {
    [binStr[l], binStr[r]] = [binStr[r], binStr[l]];
    // let temp =  binStr[l]
    // binStr[l] = binStr[r]
    // binStr[r] = temp
    l += 1;
    r -= 1;
  }

  // console.log(binStr)

  // We need a variable to track the longest binary gap
  let longestGap = 0;
  let currentGap = 0;

  // 010001001
  // 1000
  // 0, 1, 01

  for (let i = 1; i < binStr.length; i += 1) {
    // Lets find a c == 0, then check if previous element is 1, then we start counting the zeroes
    // If we find a c == 1, we stop counting and update our longestGap = max(currentGap, longestGap)
    // If we didn't find a 1 and we find the end of the string array, we do nothing
    if (binStr[i] === "0" && binStr[i - 1] === "1") {
      while (binStr[i] === "0" && i < binStr.length) {
        // console.log(i)
        currentGap += 1;
        i += 1;
      }

      if (binStr[i] === "1") {
        longestGap = Math.max(currentGap, longestGap);
        currentGap = 0;
        // console.log("longestGap: ", longestGap, i)
      }
    }
    // After we exit, our i value is pointing the either the end of the string or to the next 1
  }

  return longestGap;
}

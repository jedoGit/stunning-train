// Two positive integers N and M are given. Integer N represents the number of chocolates arranged in a circle, numbered from 0 to N − 1.

// You start to eat the chocolates. After eating a chocolate you leave only a wrapper.

// You begin with eating chocolate number 0. Then you omit the next M − 1 chocolates or wrappers on the circle, and eat the following one.

// More precisely, if you ate chocolate number X, then you will next eat the chocolate with number (X + M) modulo N (remainder of division).

// You stop eating when you encounter an empty wrapper.

// For example, given integers N = 10 and M = 4. You will eat the following chocolates: 0, 4, 8, 2, 6.

// The goal is to count the number of chocolates that you will eat, following the above rules.

// Write a function:

// function solution(N, M);

// that, given two positive integers N and M, returns the number of chocolates that you will eat.

// For example, given integers N = 10 and M = 4. the function should return 5, as explained above.

// Write an efficient algorithm for the following assumptions:

// N and M are integers within the range [1..1,000,000,000].

// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

// function solution(N, M) {
//     // Implement your solution here
// }

// 0 1 2 3 4 5 6 7 8 9

// multiples of 10 = 10 20
// multiple of 4 = 4 8 12 16 20
// LCM of 4 and 10 is 20
// This means that if there are 10 candies, and the person at at every 4th candy starting at 0,
// in the 5th hop, the person will come back to where it started, which is 0.

// TC: O(log(a+b)) there is recursion when computing the gcd. This is the proof in the codility lesson
// SC: O(log(a+b)) there is recursion when computing the gcd. This is the proof in the codility lesson

// This is the algorithm to compute the gcd from the codility lesson
// function gcdOld(a, b) {
//   if (a === b) {
//     return a;
//   } else {
//     if (a > b) {
//       return gcd(a - b, b);
//     } else {
//       return gcd(a, b - a);
//     }
//   }
// }

// This is the algorithm to compute the gcd from the codility lesson
function gcd(a, b) {
  if (a % b === 0) {
    return b;
  } else {
    return gcd(b, a % b);
  }
}

// This is the algorithm to compute the lcm from the codility lesson
function lcm(a, b) {
  return (a * b) / gcd(a, b);
}

function solution(N, M) {
  // compute the LCM of N and M
  // Then divide the LCM by M
  // This means that it will take this value (step) to come back where the person started.
  // console.log(lcm(N, M))
  return lcm(N, M) / M;
}

// A non-empty array A consisting of N integers is given.

// A permutation is a sequence containing each element from 1 to N once, and only once.

// For example, array A such that:

//     A[0] = 4
//     A[1] = 1
//     A[2] = 3
//     A[3] = 2
// is a permutation, but array A such that:

//     A[0] = 4
//     A[1] = 1
//     A[2] = 3
// is not a permutation, because value 2 is missing.

// The goal is to check whether array A is a permutation.

// Write a function:

// function solution(A);

// that, given an array A, returns 1 if array A is a permutation and 0 if it is not.

// For example, given array A such that:

//     A[0] = 4
//     A[1] = 1
//     A[2] = 3
//     A[3] = 2
// the function should return 1.

// Given array A such that:

//     A[0] = 4
//     A[1] = 1
//     A[2] = 3
// the function should return 0.

// Write an efficient algorithm for the following assumptions:

// N is an integer within the range [1..100,000];
// each element of array A is an integer within the range [1..1,000,000,000].

// TC: O(n+k)=>O(n) because we initialize a hashmap with all values of input A which is of size n
// SC: O(n) we're using a hashmap that is initialized with all element of A. A is of size n.

// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

function solution(A) {
  // Implement your solution here

  // N = 0 , 0, empty array
  // N = 1 , [1], should only contain element 1
  // N = 2 , [1,2] return 1, [1,1], [2,3], [2,2] return 0

  const N = A.length;

  // If empty input array, return 0
  if (!N) {
    return 0;
  }

  // Create a JS Set and initialize with elements of A
  let set = new Set(A);

  // console.log(set)

  // Count from 1 to N and check the set if the number exist.
  // If there's a number missing, then we return 0

  for (let c = 1; c < N + 1; c += 1) {
    if (!set.has(c)) {
      return 0;
    }
  }

  // We exited the for loop, this means that all the numbers from 1 to N is present in our set
  return 1;
}

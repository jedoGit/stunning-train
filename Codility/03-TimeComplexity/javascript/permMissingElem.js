// An array A consisting of N different integers is given. The array contains integers in the range [1..(N + 1)], which means that exactly one element is missing.

// Your goal is to find that missing element.

// Write a function:

// function solution(A);

// that, given an array A, returns the value of the missing element.

// For example, given array A such that:

//   A[0] = 2
//   A[1] = 3
//   A[2] = 1
//   A[3] = 5
// the function should return 4, as it is the missing element.

// Write an efficient algorithm for the following assumptions:

// N is an integer within the range [0..100,000];
// the elements of A are all distinct;
// each element of array A is an integer within the range [1..(N + 1)].

// TC: O(n) we need to access arrays of size n 3 times
// SC: O(n) we created an array of size n+1

// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

function solution(A) {
  // Implement your solution here

  // Create an array of size N+1 and fill it with boolean false
  let N = A.length;
  let checkArr = new Array(N + 1).fill(false);

  // Then access the array with A[i] as the index, if it exist, set to true
  // Remember that A[i] values are [1...N+1] and A[] have N elements and 1 element is missing
  // checkArr indices are [0...N-1]
  // We'll map A[i] element to checkArr[j] index where j is A[i] - 1
  for (let i = 0; i < N; i += 1) {
    checkArr[A[i] - 1] = true;
  }

  // Then access the array and check which index is false and that's the missing element
  // Remember that checkArr has N+1 elements... we need to check the indices [0...N]
  for (let i = 0; i < N + 1; i += 1) {
    if (!checkArr[i]) {
      return i + 1;
    }
  }
}

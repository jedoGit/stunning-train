// Write a function

// function solution(A);

// that, given an array A consisting of N integers, returns the number of distinct values in array A.

// For example, given array A consisting of six elements such that:

//  A[0] = 2    A[1] = 1    A[2] = 1
//  A[3] = 2    A[4] = 3    A[5] = 1
// the function should return 3, because there are 3 distinct values appearing in array A, namely 1, 2 and 3.

// Write an efficient algorithm for the following assumptions:

// N is an integer within the range [0..100,000];
// each element of array A is an integer within the range [-1,000,000..1,000,000].

// TC: O(nlogn) due to sorting
// SC: O(1), if we don't consider the space required for sorting algorithm. Else, it's O(nlogn)

// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

function solution(A) {
  // Implement your solution here
  // Solution using TC O(nlogn)

  if (A.length < 2) return A.length;

  // First, sort the elements of A
  A.sort((a, b) => a - b);

  // At this point, we're guaranteed to have at least 2 elements, so we initialize our count to 1
  let count = 1;

  // Loop through the elements of the sorted array and count how many times the value changed
  // We start from index 1 and compare to index 0
  for (let i = 1; i < A.length; i += 1) {
    if (A[i] !== A[i - 1]) {
      count += 1;
    }
  }

  return count;
}

// TC: O(n) values are added to the set
// SC: O(n) we have a hashmap of size n.

// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

function solution(A) {
  // Implement your solution here
  // Solution using hashmap

  // Using JS set
  const set = new Set(A);

  // The size of the set is how many distinct values we have in array A.
  const count = set.size;

  return count;
}

// A non-empty array A consisting of N integers is given. The array contains an odd number of elements, and each element of the array can be paired with another element that has the same value, except for one element that is left unpaired.

// For example, in array A such that:

//   A[0] = 9  A[1] = 3  A[2] = 9
//   A[3] = 3  A[4] = 9  A[5] = 7
//   A[6] = 9
// the elements at indexes 0 and 2 have value 9,
// the elements at indexes 1 and 3 have value 3,
// the elements at indexes 4 and 6 have value 9,
// the element at index 5 has value 7 and is unpaired.
// Write a function:

// function solution(A);

// that, given an array A consisting of N integers fulfilling the above conditions, returns the value of the unpaired element.

// For example, given array A such that:

//   A[0] = 9  A[1] = 3  A[2] = 9
//   A[3] = 3  A[4] = 9  A[5] = 7
//   A[6] = 9
// the function should return 7, as explained in the example above.

// Write an efficient algorithm for the following assumptions:

// N is an odd integer within the range [1..1,000,000];
// each element of array A is an integer within the range [1..1,000,000,000];
// all but one of the values in A occur an even number of times.

// TC: O(n+k), where n is the size of the input array and k is the size of the the map we created
// SC: O(k), is the size of the map we created.

// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

function solution(A) {
  // Implement your solution here

  let m = new Map();
  const n = A.length;

  // Create a map of values and number of times we see the value
  for (let i = 0; i < n; i += 1) {
    // Check if A[i] is in our map
    // If not, create it, and set count 1
    // If exist, increament the count
    if (!m.has(A[i])) {
      m.set(A[i], 1);
    } else {
      let prevCount = m.get(A[i]);
      m.set(A[i], prevCount + 1);
    }
  }

  // Check all the values in our map and return the value that is odd

  let res = 0;

  for (let [k, v] of m.entries()) {
    // console.log(k,v)
    if (v % 2 !== 0) {
      // not even
      res = k;
    }
  }

  return res;
}

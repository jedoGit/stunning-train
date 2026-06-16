// An array A consisting of N integers is given. Rotation of the array means that each element is shifted right by one index, and the last element of the array is moved to the first place. For example, the rotation of array A = [3, 8, 9, 7, 6] is [6, 3, 8, 9, 7] (elements are shifted right by one index and 6 is moved to the first place).

// The goal is to rotate array A K times; that is, each element of A will be shifted to the right K times.

// Write a function:

// function solution(A, K);

// that, given an array A consisting of N integers and an integer K, returns the array A rotated K times.

// For example, given

//     A = [3, 8, 9, 7, 6]
//     K = 3
// the function should return [9, 7, 6, 3, 8]. Three rotations were made:

//     [3, 8, 9, 7, 6] -> [6, 3, 8, 9, 7]
//     [6, 3, 8, 9, 7] -> [7, 6, 3, 8, 9]
//     [7, 6, 3, 8, 9] -> [9, 7, 6, 3, 8]
// For another example, given

//     A = [0, 0, 0]
//     K = 1
// the function should return [0, 0, 0]

// Given

//     A = [1, 2, 3, 4]
//     K = 4
// the function should return [1, 2, 3, 4]

// Assume that:

// N and K are integers within the range [0..100];
// each element of array A is an integer within the range [-1,000..1,000].
// In your solution, focus on correctness. The performance of your solution will not be the focus of the assessment.

// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

// TC: O(n), visit all of element of A
// SC: O(n), create an array of size n

const Result = { PASS: "\x1b[92mPASS\x1b[0m", FAIL: "\x1b[91mFAIL\x1b[0m" };

class CyclicRotationRecord {
  constructor(A, K, expected) {
    this.A = A;
    this.K = K;
    this.expected = expected;
  }
}

class Solution {
  solution(A, K) {
    let res = [];

    // Get the length of A
    const aLen = A.length;

    // Compute the newK... if K is divisible by A.length, there's no rotation.
    let newK = K % aLen;

    // console.log("newK: " + newK)

    if (newK === 0) {
      return A;
    }

    // Process the k elements from the end of array and add it to the results
    for (let i = aLen - newK; i < aLen; i += 1) {
      res.push(A[i]);
    }

    // Process the k elements from the beginning of the array and push it to the results array
    for (let i = 0; i < aLen - newK; i += 1) {
      res.push(A[i]);
    }

    // console.log( res)

    return res;
  }
}

function arraysEqual(left, right) {
  return left.length === right.length && left.every((value, index) => value === right[index]);
}

function testSolution(record) {
  const solution = new Solution();
  const result = solution.solution(record.A, record.K);
  const status = arraysEqual(result, record.expected) ? Result.PASS : Result.FAIL;

  console.log(`Input: A = ${JSON.stringify(record.A)}, K = ${record.K}`);
  console.log(`Expected: ${JSON.stringify(record.expected)}`);
  console.log(`Result: ${JSON.stringify(result)}`);
  console.log(status);
}

const records = [
  new CyclicRotationRecord([3, 8, 9, 7, 6], 3, [9, 7, 6, 3, 8]),
  new CyclicRotationRecord([0, 0, 0], 1, [0, 0, 0]),
  new CyclicRotationRecord([1, 2, 3, 4], 4, [1, 2, 3, 4]),
  new CyclicRotationRecord([], 3, []),
  new CyclicRotationRecord([1], 7, [1]),
];

records.forEach((record, index) => {
  console.log(`# Test case ${index + 1}`);
  testSolution(record);
  console.log("----------------------------------------");
});

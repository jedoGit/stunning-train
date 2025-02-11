// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

function solution(K, M, A) {
  // Implement your solution here
}
// You are given integers K, M and a non-empty array A consisting of N integers. Every element of the array is not greater than M.

// You should divide this array into K blocks of consecutive elements. The size of the block is any integer between 0 and N. Every element of the array should belong to some block.

// The sum of the block from X to Y equals A[X] + A[X + 1] + ... + A[Y]. The sum of empty block equals 0.

// The large sum is the maximal sum of any block.

// For example, you are given integers K = 3, M = 5 and array A such that:

//   A[0] = 2
//   A[1] = 1
//   A[2] = 5
//   A[3] = 1
//   A[4] = 2
//   A[5] = 2
//   A[6] = 2
// The array can be divided, for example, into the following blocks:

// [2, 1, 5, 1, 2, 2, 2], [], [] with a large sum of 15;
// [2], [1, 5, 1, 2], [2, 2] with a large sum of 9;
// [2, 1, 5], [], [1, 2, 2, 2] with a large sum of 8;
// [2, 1], [5, 1], [2, 2, 2] with a large sum of 6.
// The goal is to minimize the large sum. In the above example, 6 is the minimal large sum.

// Write a function:

// function solution(K, M, A);

// that, given integers K, M and a non-empty array A consisting of N integers, returns the minimal large sum.

// For example, given K = 3, M = 5 and array A such that:

//   A[0] = 2
//   A[1] = 1
//   A[2] = 5
//   A[3] = 1
//   A[4] = 2
//   A[5] = 2
//   A[6] = 2
// the function should return 6, as explained above.

// Write an efficient algorithm for the following assumptions:

// N and K are integers within the range [1..100,000];
// M is an integer within the range [0..10,000];
// each element of array A is an integer within the range [0..M].

// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

// K = 3, M = 5
// A = [2,1,5,1,2,2,2]

// First iter, b = Max(A) = 5, e = Sum(A) = 15, m = 10
// [2,1,5,1] = 9
// [1,2,2,2] = 7
// [] = 0
// since block = 2 < k, => b = 5, e = m - 1 = 9
// 2nd iter, b = 5, e = 9 , m = 7
// [2,1] = 3
// [5,1] = 6
// [2,2,2] = 6
// block = 3 < k ? no, so b = 5, e = 6
// 3rd iter, b = 5, e = 6 , m = 5
// [2,1] = 3
// [5] = 5
// [1,2,2] = 5
// [2] = 2
// block = 4 < k ? yes, so, b = 6, e = 6
// 4th iter, since b <= e, we break while loop and return 6

// TC: O(logn)
// SC: O(1)

function solution(K, M, A) {
  const N = A.length;

  // For this problem, we're going to compute a begining and end value for the binary search
  // the begin value is the max element of the input array
  // the end value is the sum of all elements
  // This make sense because in the instruction, the large sum is the max sum of any block. This represent a block with only 1 element with the largest value.

  let begin = Math.max(...A);
  let end = A.reduce((acc, value) => acc + value, 0);
  let result = 0;

  //   console.log(begin, end)

  // We start the binary search
  while (begin <= end) {
    // Compute the mid point for the binary search
    const mid = Math.floor((begin + end) / 2);

    // console.log(mid)

    // once we have the midpoint, we perform the algorithm
    // We start checking the cummulative sum starting from index 0 and compare to the mid value.

    let currentSum = 0;
    let blocks = 1;

    for (let i = 0; i < N; i++) {
      // we need to group the elements into blocks and compute the sum of all elements in the block
      // If the cummulative sum of the elements is greater than the mid, we start a new block and start the cummulative sum
      // If it's less than the mid, we continue the commulative sum.
      // we stop if our blocks created is greater than k
      if (currentSum + A[i] > mid) {
        blocks++;
        currentSum = A[i];

        if (blocks > K) {
          break;
        }
      } else {
        currentSum += A[i];
      }
    }

    // We exited the for loop. Let's check why?
    // If we exited because block created is greater than k, we update the begin to mid+1
    // else we updated the end to mid-1 and save the result = mid
    if (blocks > K) {
      begin = mid + 1;
    } else {
      result = mid;
      end = mid - 1;
    }
  }

  return result;
}

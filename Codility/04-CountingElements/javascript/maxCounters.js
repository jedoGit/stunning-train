// You are given N counters, initially set to 0, and you have two possible operations on them:

// increase(X) - counter X is increased by 1,
// max counter - all counters are set to the maximum value of any counter.
// A non-empty array A of M integers is given. This array represents consecutive operations:

// if A[K] = X, such that 1 ≤ X ≤ N, then operation K is increase(X),
// if A[K] = N + 1 then operation K is max counter.
// For example, given integer N = 5 and array A such that:

//     A[0] = 3
//     A[1] = 4
//     A[2] = 4
//     A[3] = 6
//     A[4] = 1
//     A[5] = 4
//     A[6] = 4
// the values of the counters after each consecutive operation will be:

//     (0, 0, 1, 0, 0)
//     (0, 0, 1, 1, 0)
//     (0, 0, 1, 2, 0)
//     (2, 2, 2, 2, 2)
//     (3, 2, 2, 2, 2)
//     (3, 2, 2, 3, 2)
//     (3, 2, 2, 4, 2)
// The goal is to calculate the value of every counter after all operations.

// Write a function:

// function solution(N, A);

// that, given an integer N and a non-empty array A consisting of M integers, returns a sequence of integers representing the values of the counters.

// Result array should be returned as an array of integers.

// For example, given:

//     A[0] = 3
//     A[1] = 4
//     A[2] = 4
//     A[3] = 6
//     A[4] = 1
//     A[5] = 4
//     A[6] = 4
// the function should return [3, 2, 2, 4, 2], as explained above.

// Write an efficient algorithm for the following assumptions:

// N and M are integers within the range [1..100,000];
// each element of array A is an integer within the range [1..N + 1].

// TC: O(m^2), at worst, we perform another for loop inside the first for loop
// SC: O(n), we create a hashmap of size n, which n is the number of counters

// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

function solution(N, A) {
  // Implement your solution here

  // We need a hashcounter where key is 1 <= X <= N, values are the count
  let counter = {};
  let curVal = 0;
  let maxVal = 0;

  const aLen = A.length;

  // Loop through the elements A
  for (let i = 0; i < aLen; i += 1) {
    // if A[i] is 1 <= X <= N, increament the counter
    if (A[i] > 0 && A[i] < N + 1) {
      if (!counter[A[i]]) {
        counter[A[i]] = 0;
      }

      // increment the counter
      counter[A[i]] += 1;
      // capture the current val
      curVal = counter[A[i]];
      // update the maxval
      maxVal = Math.max(maxVal, curVal);
    } else if (A[i] > N) {
      // if A[i] > N, set all counter to maxVal
      for (let j = 1; j < N + 1; j += 1) {
        counter[j] = maxVal;
      }
    }
    // console.log(counter, curVal, maxVal)
  }

  //console.log(Object.values(counter))

  return Object.values(counter);
}

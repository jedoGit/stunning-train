// A non-empty array A consisting of N integers is given. The consecutive elements of array A represent consecutive cars on a road.

// Array A contains only 0s and/or 1s:

// 0 represents a car traveling east,
// 1 represents a car traveling west.
// The goal is to count passing cars. We say that a pair of cars (P, Q), where 0 ≤ P < Q < N, is passing when P is traveling to the east and Q is traveling to the west.

// For example, consider array A such that:

//   A[0] = 0
//   A[1] = 1
//   A[2] = 0
//   A[3] = 1
//   A[4] = 1
// We have five pairs of passing cars: (0, 1), (0, 3), (0, 4), (2, 3), (2, 4).

// Write a function:

// function solution(A);

// that, given a non-empty array A of N integers, returns the number of pairs of passing cars.

// The function should return -1 if the number of pairs of passing cars exceeds 1,000,000,000.

// For example, given:

//   A[0] = 0
//   A[1] = 1
//   A[2] = 0
//   A[3] = 1
//   A[4] = 1
// the function should return 5, as explained above.

// Write an efficient algorithm for the following assumptions:

// N is an integer within the range [1..100,000];
// each element of array A is an integer that can have one of the following values: 0, 1.

// TC: O(n) one pass on all elements of A
// SC: O(1) no additional DS created

// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

function solution(A) {
  // Implement your solution here

  /*  In this example: [0, 1, 0, 1, 1], this is how it would look like visually, there's a total of 5 passing pairs
        time = 0, 0 passing pair
        e e ->
      <- w ww
        time = 1, 2 passing pairs
         e e ->
      <- w ww
        time = 2, 1 passing pair
          e e ->
      <- w ww
        time = 3, 1 passing pair
           e e ->
      <- w ww
        time = 4, 1 passing pair
            e e ->
      <- w ww
        time = 5, 0 passing pair
             e e ->
      <- w ww
    */

  let carsTravellingEast = 0;
  let passedCars = 0;

  // At each iteration of A, we count the number of cars eastbound and keep track of the count
  // Also at each iteration, check if the car is westbound. If car is westbount, we count the passing pair. passedCars = passedCard + countEast
  for (let c of A) {
    if (passedCars > 1000000000) return -1;

    if (c === 0) carsTravellingEast += 1;
    if (c === 1) passedCars += carsTravellingEast;
  }

  return passedCars;
}

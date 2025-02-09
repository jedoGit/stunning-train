// A positive integer D is a factor of a positive integer N if there exists an integer M such that N = D * M.

// For example, 6 is a factor of 24, because M = 4 satisfies the above condition (24 = 6 * 4).

// Write a function:

// function solution(N);

// that, given a positive integer N, returns the number of its factors.

// For example, given N = 24, the function should return 8, because 24 has 8 factors, namely 1, 2, 3, 4, 6, 8, 12, 24. There are no other factors of 24.

// Write an efficient algorithm for the following assumptions:

// N is an integer within the range [1..2,147,483,647].

// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

function solution(N) {
  let i = 0;
  let count = 0;

  // Only perform this operation while i*i <= N
  while (i * i <= N) {
    // console.log(i)
    // Take the modulo of N%i.
    // If the N is divisible by i, we investigate further
    // and check how many factors it has
    if (N % i === 0) {
      // The first if statement here is to check
      // if sqrt(N) = I => N = I*I => N/I = I
      // If I is exactly N/I, we count 1 factor
      // If I is not exactly N/I, we count 2 factors
      if (i === N / i) {
        count += 1;
      } else {
        count += 2;
      }
    }

    // Increment i
    i += 1;
  }

  return count;
}

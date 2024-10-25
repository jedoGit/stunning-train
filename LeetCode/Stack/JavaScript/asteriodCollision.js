// We are given an array asteroids of integers representing asteroids in a row.

// For each asteroid, the absolute value represents its size, and the sign represents its direction (positive meaning right, negative meaning left). Each asteroid moves at the same speed.

// Find out the state of the asteroids after all collisions. If two asteroids meet, the smaller one will explode. If both are the same size, both will explode. Two asteroids moving in the same direction will never meet.

// Example 1:

// Input: asteroids = [5,10,-5]
// Output: [5,10]
// Explanation: The 10 and -5 collide resulting in 10. The 5 and 10 never collide.
// Example 2:

// Input: asteroids = [8,-8]
// Output: []
// Explanation: The 8 and -8 collide exploding each other.
// Example 3:

// Input: asteroids = [10,2,-5]
// Output: [10]
// Explanation: The 2 and -5 collide resulting in -5. The 10 and -5 collide resulting in 10.

// Constraints:

// 2 <= asteroids.length <= 104
// -1000 <= asteroids[i] <= 1000
// asteroids[i] != 0

// TC: O(n) we're looping through the array
// SC: O(n) we're creating a stack

/**
 * @param {number[]} asteroids
 * @return {number[]}
 */
var asteroidCollision = function (asteroids) {
  let myStack = [];

  for (let i = 0; i < asteroids.length; i++) {
    // We want to point the lastVal to the top element of the stack
    let lastVal = myStack[myStack.length - 1];
    let curVal = asteroids[i];

    // If the last value that is in the stack is negative and the current value is positive,
    // there will be no colision and we just push the curVal to the stack.
    // Also, if the stack is empty, so, there's nothing to compare, hence, add the curVal to the stack
    if (myStack.length < 1 || lastVal < 0 || curVal > 0) {
      myStack.push(curVal);
    } else if (-curVal === lastVal) {
      // if the curVal has an opposite sign as the lastVal and they have equal value,
      // in this case, we pop the lastVal from the stack
      myStack.pop();
    } else if (-curVal > lastVal) {
      // if the curVal has an opposite sign as the lastVal and it's greater than the lastVal,
      // we pop the lastVal from the stack and decrement i so we compare the curVal to
      // what's the top of the stack
      myStack.pop();
      i--;
    }
  }

  return myStack;
};

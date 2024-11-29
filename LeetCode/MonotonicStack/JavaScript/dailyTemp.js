// Given an array of integers temperatures represents the daily temperatures, return an array answer such that answer[i] is the number of days you have to wait after the ith day to get a warmer temperature. If there is no future day for which this is possible, keep answer[i] == 0 instead.

// Example 1:

// Input: temperatures = [73,74,75,71,69,72,76,73]
// Output: [1,1,4,2,1,1,0,0]
// Example 2:

// Input: temperatures = [30,40,50,60]
// Output: [1,1,1,0]
// Example 3:

// Input: temperatures = [30,60,90]
// Output: [1,1,0]

// Constraints:

// 1 <= temperatures.length <= 105
// 30 <= temperatures[i] <= 100

// TC: O(n) we visit each elements of the input array once.
// SC: O(n) at worst, we maintain a stack of n elements

/**
 * @param {number[]} temperatures
 * @return {number[]}
 */
var dailyTemperatures = function (temperatures) {
  // Using stack to keep track of the index and the temp.
  // Everytime we see a new temp that is lesser than yesterday, we add it to the stack
  // Everytime we see a new temp, we compare it to the values on the stack starting at the end.
  // If it's greater, we pop the stack and compute the difference on the index and save that value on the
  // index specified in the array we popped.

  let res = new Array(temperatures.length).fill(0);
  let stack = []; // We will store a pair here [temp, index]

  // We visite each temperatures in the input array and keep track of the index as well.
  // Here we'll use the forEach JS array method.
  // The syntach of the forEach method is:
  // array.forEach((element, index) => {...}). It will visit each element in order
  temperatures.forEach((temp, idx) => {
    // console.log(temp, idx)
    // First we'll check if our stack is not empty, if not, we'll take a peek at the top element in our stack.
    // The element we save in our stack is a pair array [temp, index]. We access index 0 of that pair because
    // we want to compare the temp to our current temp. array.at(-1) will return the last element of the array
    while (stack.length > 0 && temp > stack.at(-1)[0]) {
      // console.log(stack)
      let [stackTemp, stackIdx] = stack.pop();
      res[stackIdx] = idx - stackIdx;
    }

    // The stack is empty and the current temp we're looking at is lesser than what's in the stack
    stack.push([temp, idx]);
    // console.log(stack)
  });

  return res;
};

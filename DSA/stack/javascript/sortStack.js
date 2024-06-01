// Implement a function called sortStack() that takes a stack of integers as input and sorts the stack in ascending order (with the smallest element on top) using an additional temporary stack.

// Input:
// A Stack object stack containing integer values.

// Output:
// The function should modify the original input stack, sorting its elements in ascending order.

// Constraints:
// You must use the provided Stack class to store and manipulate the elements.
// You cannot use any other data structures or built-in sorting methods for this task.

// Function Signature:
// function sortStack(stack) {
//     // Your implementation goes here
// }

// Example 1:
// Suppose you have a Stack object, stack, with the following values:
// [5, 3, 1, 4, 2]

// After calling the sortStack() function:

// sortStack(stack);

// The stack should now have the following values:
// [5, 4, 3, 2, 1]

// Example 2:
// Suppose you have a Stack object, stack, with the following values:
// [-3, 0, 7, 1, -2]

// After calling the sortStack() function:

// sortStack(stack);

// The stack should now have the following values:
// [7, 1, 0, -2, -3]

function sortStack(stack) {
  const additionalStack = new Stack();

  // loop through the input stack, which needs to be sorted
  while (!stack.isEmpty()) {
    // pop the top of the input stack and save to a temp variable.
    // we will use this to compare to the the additionalStack we created.
    const temp = stack.pop();

    // now, we will compare the popped value from the input stack to the additionalStack values
    // we will loop through the additionalStack values and compare temp.
    // remember, we're using arrays to implement the stack. this means that the top of the stack
    // is in end of the array. also, the peek() method is provided to us.
    // the peek() method returns null if the stack is empty, else returns the value of the last index which is the
    // top of the stack.
    while (!additionalStack.isEmpty() && additionalStack.peek() > temp) {
      // push the top of the additionalStack to the input stack
      // what we're doing here is pushing the larger value to the top
      // of the input stack. we will push the smaller value to the additionalStack
      // when we exit the while loop
      stack.push(additionalStack.pop());
    }

    // at this point, the additionalStack should be empty, then we'll push temp to additionalStack
    // this is the smaller value we compared from the previous loop
    additionalStack.push(temp);
  }

  // we may have popped all the values from the input stack and exited the main while loop...
  // however, we may still have one more value that we pushed to the additionalStack stackToString
  // so we need to pop the top of the additionalStack and push it to the input stack.
  // the value of the top in the additionalStack is the smallest value
  while (!additionalStack.isEmpty()) {
    stack.push(additionalStack.pop());
  }
}

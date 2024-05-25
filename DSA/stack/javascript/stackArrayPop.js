// Implement a method called pop() for the Stack class that we created in the last exercise.  The method removes and returns the top element from the stack.

// Output:
// The method should remove the top element from the stack and return its value. If the stack is empty, the function should return null.

// Constraints:
// The stack should be implemented using an array.
// You cannot use built-in methods to manipulate the stack, except for the pop() method of the array.

function pop() {
  if (this.isEmpty()) return null;
  return this.stackList.pop();
}

// Implement a function called reverseString() that takes a string as input and returns a new string with its characters reversed, using the Stack class provided.

// Output:
// The method should return a new string with the characters of the input string reversed.

// Constraints:
// You must use the provided Stack class to reverse the string.
// You cannot use built-in string manipulation methods for reversing the string.

// Function Signature:

// function reverseString(string) {
//     // Your implementation goes here
// }

function reverseString(string) {
  // Create a stack object. This is provided by the  test implementation
  const stack = new Stack();

  // create a temp variable
  let reverseString = "";

  // push each characters of the of the input string to the stack starting from the 0 index
  for (const c of string) {
    stack.push(c);
  }

  // then pop the stack and concatenate to the temp variable
  while (!stack.isEmpty()) {
    reverseString += stack.pop();
  }

  // return the temp variable
  return reverseString;
}

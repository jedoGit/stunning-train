// In the Stack: Intro video we discussed how stacks are commonly implemented using an array instead of a Linked List.
// Write the push method to add an item onto a stack that is implemented with an array.

// The method should add the given value to the top of the stack, increasing the size of the stack by one.

// Constraints:
// The stack should be implemented using an array.
// You cannot use built-in methods to manipulate the stack, except for the push() method of the array.

// Class Definition:

// class Stack {
//     constructor() {
//         this.stackList = [];
//     }
//     // ... other methods ...
//     push(value) {
//         // Your implementation goes here
//     }
// }

function push(value) {
  this.stackList.push(value);
}

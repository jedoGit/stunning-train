// Implement a method called enqueue() for a MyQueue class that adds a new element to the end of the queue. The MyQueue class should use two Stack objects to store and manipulate the elements.
// The method should add the given value to the end of the queue.

// Constraints:
// The MyQueue class should be implemented using two Stack objects provided in the Stack class.
// You cannot use any other data structures or built-in queue manipulation methods for this task.

// Class Definition:

// class MyQueue {
//     constructor() {
//         this.stack1 = new Stack();
//         this.stack2 = new Stack();
//     }

//     // ... other methods ...

//     enqueue(value) {
//         // Your implementation goes here
//     }
// }

// Example 1:
// Suppose you have a MyQueue object, queue, with the following values:
// [3, 2, 1]

// After calling the enqueue() function:

// queue.enqueue(4);

// The queue should now have the following values:
// [4, 3, 2, 1]

// Example 2:
// Now suppose you have a MyQueue object, queue, with the following values:
// ['apple', 'banana', 'orange']

// After calling the enqueue() function:

// queue.enqueue('grape');

// The queue should now have the following values:
// ['grape', 'apple', 'banana', 'orange']

// For a queue, we add to the end of the queue. Since we're using two stacks, for stacks, new values are added to the top of the stack.
// From the example, this looks like a FIFO queue. Since we're using a stack to store the queue value, the bottom of the stack is the end of the
// queue and the top of the stack is the front of the queue.

// Example [3, 2, 1]
// 1<- top of the stack (we pop/push from top of the stack), which is the front of the queue
// 2
// 3<- bottom of the stack, which is the end of the queue
// enqueue 4, which adds to the bottom of the stack -> [4, 3, 2, 1]
function enqueue(value) {
  // Using two stacks to manipulate the queue
  // move the contents from the end of stack#1 to stack to stack#2
  while (!this.stack1.isEmpty()) {
    this.stack2.push(this.stack1.pop());
  }

  // once we empty stack#1, we push the value to be enqueued to stack#1
  this.stack1.push(value);

  // then, we empty stack#2 from the end and push to stack#1
  while (!this.stack2.isEmpty()) {
    this.stack1.push(this.stack2.pop());
  }
}

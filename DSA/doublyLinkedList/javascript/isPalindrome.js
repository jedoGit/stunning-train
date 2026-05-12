// Implement a member function called isPalindrome() that checks if a doubly linked list is a palindrome.
// A doubly linked list is a palindrome if the sequence of values read from the head to the tail is the same as the sequence of values read from the tail to the head.
// Output:
// Return a boolean value: true if the doubly linked list is a palindrome, and false otherwise.
// Constraints:
// You can only traverse the doubly linked list once.

const Result = { PASS: "\x1b[92mPASS\x1b[0m", FAIL: "\x1b[91mFAIL\x1b[0m" };

class Record {
  constructor(values, expected) {
    this.values = values;
    this.expected = expected;
  }
}

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

class DoublyLinkedList {
  constructor(values) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    values.forEach((value) => this.push(value));
  }

  push(value) {
    const newNode = new Node(value);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }

    this.length++;
    return this;
  }
}

class Solution {
  isPalindrome(values) {
    const list = new DoublyLinkedList(values);

    if (list.length < 2) {
      return true;
    }

    let start = list.head;
    let end = list.tail;

    // We want to compare the values of the start and end pointer
    // For each iteration, we want to move the start pointer to the right
    // while, we move the end pointer to the left.
    // We'll stop once we hit this.length/2, which is the middle of the DLL.

    for (let i = 0; i < Math.floor(list.length / 2); i++) {
      if (start.value !== end.value) {
        return false;
      }

      start = start.next;
      end = end.prev;
    }

    return true;
  }
}

function testSolution(record) {
  const solution = new Solution();
  const result = solution.isPalindrome(record.values);
  const status = result === record.expected ? Result.PASS : Result.FAIL;

  console.log(`Input: ${JSON.stringify(record.values)}`);
  console.log(`Expected: ${record.expected}`);
  console.log(`Result: ${result}`);
  console.log(status);
}

const records = [
  new Record([], true),
  new Record([1], true),
  new Record([1, 2, 1], true),
  new Record([1, 2, 2, 1], true),
  new Record([1, 2, 3], false),
];

records.forEach((record, index) => {
  console.log(`# Test case ${index + 1}`);
  testSolution(record);
  console.log('--------------------');
});

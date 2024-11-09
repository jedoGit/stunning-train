// You have a set which contains all positive integers [1, 2, 3, 4, 5, ...].

// Implement the SmallestInfiniteSet class:

// SmallestInfiniteSet() Initializes the SmallestInfiniteSet object to contain all positive integers.
// int popSmallest() Removes and returns the smallest integer contained in the infinite set.
// void addBack(int num) Adds a positive integer num back into the infinite set, if it is not already in the infinite set.

// Example 1:

// Input
// ["SmallestInfiniteSet", "addBack", "popSmallest", "popSmallest", "popSmallest", "addBack", "popSmallest", "popSmallest", "popSmallest"]
// [[], [2], [], [], [], [1], [], [], []]
// Output
// [null, null, 1, 2, 3, null, 1, 4, 5]

// Explanation
// SmallestInfiniteSet smallestInfiniteSet = new SmallestInfiniteSet();
// smallestInfiniteSet.addBack(2);    // 2 is already in the set, so no change is made.
// smallestInfiniteSet.popSmallest(); // return 1, since 1 is the smallest number, and remove it from the set.
// smallestInfiniteSet.popSmallest(); // return 2, and remove it from the set.
// smallestInfiniteSet.popSmallest(); // return 3, and remove it from the set.
// smallestInfiniteSet.addBack(1);    // 1 is added back to the set.
// smallestInfiniteSet.popSmallest(); // return 1, since 1 was added back to the set and
//                                    // is the smallest number, and remove it from the set.
// smallestInfiniteSet.popSmallest(); // return 4, and remove it from the set.
// smallestInfiniteSet.popSmallest(); // return 5, and remove it from the set.

// Constraints:

// 1 <= num <= 1000
// At most 1000 calls will be made in total to popSmallest and addBack.

// TC: O(1) constant time to add and pop from the set
// SC: O(h+s) worst case is we keep adding to the set. Since we use a min-heap and a set, our space complexity will be the size of the heap and the set

var SmallestInfiniteSet = function () {
  // Use min heap from library https://github.com/datastructures-js/priority-queue/blob/v5/README.md
  // This library is loaded by leetcode. Check the language setting for information
  // We also need to keep track of the last minimum we popped as well as the number we added

  // Here, we use the min heap to return the min value in constant time
  // We also, use a set to check if a value has been added to the heap in constant time

  this.h = new MinPriorityQueue();
  this.lastMin = 1;
  this.numSet = new Set();
};

/**
 * @return {number}
 */
SmallestInfiniteSet.prototype.popSmallest = function () {
  // To pop from the set, first, we check our heap if it not empty.
  // If it's not empty, we pop the root of the heap and delete it from the set then return
  // if it's empty, we'll return the lastmin value incremented. We then increment the lastmin value by 1

  if (!this.h.isEmpty()) {
    const smallest = this.h.dequeue().element;
    this.numSet.delete(smallest);
    return smallest;
  }

  // Here, we post increment lastMin... this means we return the current value of lastMin then we increment lastMin
  // This is the same as temp = lastMin; lastMin = lastMin +  1; return temp
  return this.lastMin++;
};

/**
 * @param {number} num
 * @return {void}
 */
SmallestInfiniteSet.prototype.addBack = function (num) {
  // Everytime we add to the set, we first check if the number has been added to the set or if the number
  // is greater or equal to the lastmin... if so, we just return
  // Otherwise, we add it to the heap and our set.
  if (num >= this.lastMin || this.numSet.has(num)) return;

  this.h.enqueue(num);
  this.numSet.add(num);
};

/**
 * Your SmallestInfiniteSet object will be instantiated and called as such:
 * var obj = new SmallestInfiniteSet()
 * var param_1 = obj.popSmallest()
 * obj.addBack(num)
 */

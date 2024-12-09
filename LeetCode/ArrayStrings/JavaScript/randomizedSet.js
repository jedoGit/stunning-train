// Implement the RandomizedSet class:

// RandomizedSet() Initializes the RandomizedSet object.
// bool insert(int val) Inserts an item val into the set if not present. Returns true if the item was not present, false otherwise.
// bool remove(int val) Removes an item val from the set if present. Returns true if the item was present, false otherwise.
// int getRandom() Returns a random element from the current set of elements (it's guaranteed that at least one element exists when this method is called). Each element must have the same probability of being returned.
// You must implement the functions of the class such that each function works in average O(1) time complexity.

// Example 1:

// Input
// ["RandomizedSet", "insert", "remove", "insert", "getRandom", "remove", "insert", "getRandom"]
// [[], [1], [2], [2], [], [1], [2], []]
// Output
// [null, true, false, true, 2, true, false, 2]

// Explanation
// RandomizedSet randomizedSet = new RandomizedSet();
// randomizedSet.insert(1); // Inserts 1 to the set. Returns true as 1 was inserted successfully.
// randomizedSet.remove(2); // Returns false as 2 does not exist in the set.
// randomizedSet.insert(2); // Inserts 2 to the set, returns true. Set now contains [1,2].
// randomizedSet.getRandom(); // getRandom() should return either 1 or 2 randomly.
// randomizedSet.remove(1); // Removes 1 from the set, returns true. Set now contains [2].
// randomizedSet.insert(2); // 2 was already in the set, so return false.
// randomizedSet.getRandom(); // Since 2 is the only number in the set, getRandom() will always return 2.

// Constraints:

// -231 <= val <= 231 - 1
// At most 2 * 105 calls will be made to insert, remove, and getRandom.
// There will be at least one element in the data structure when getRandom is called.

// TC: insert O(1), delete O(1), getRandom O(1), we're using hashmap to store k/v pairs and lookup time is O(1)
// SC: insert O(n), delete O(n), getRandom O(1)

var RandomizedSet = function () {
  this.numMap = {};
  this.numList = [];
};

/**
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.insert = function (val) {
  // We want to insert first to the map where the key is the input received
  // and the value is the index where we'll put it in our numList.
  // The index where we'll put it in our numList is always the last index.
  // Return true if we inserted a new val else false
  if (!(val in this.numMap)) {
    this.numMap[val] = this.numList.length;
    this.numList.push(val);
    // console.log(val, this.numMap[val])
    return true;
  } else {
    return false;
  }
};

/**
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.remove = function (val) {
  // console.log("Before: " + this.numMap[val], val)
  if (val in this.numMap) {
    // Get the index
    const idx = this.numMap[val];
    // Get the last value from numList
    const lastVal = this.numList.at(-1);
    // Copy the last value to the index pointed by the idx
    this.numList[idx] = lastVal;
    // Remove the last index of numList
    this.numList.pop();
    // Update the index of lastVal in numMap
    this.numMap[lastVal] = idx;
    // Do an object property delete of val in numMap
    delete this.numMap[val];
    // console.log("After: " + this.numMap[val], val)

    return true;
  } else {
    return false;
  }
};

/**
 * @return {number}
 */
RandomizedSet.prototype.getRandom = function () {
  // const min = Math.ceil(0)
  const max = Math.floor(this.numList.length);

  // const randIdx = Math.floor(Math.random() * (max - min));
  const randIdx = Math.floor(Math.random() * max);

  return this.numList[randIdx];
};

/**
 * Your RandomizedSet object will be instantiated and called as such:
 * var obj = new RandomizedSet()
 * var param_1 = obj.insert(val)
 * var param_2 = obj.remove(val)
 * var param_3 = obj.getRandom()
 */

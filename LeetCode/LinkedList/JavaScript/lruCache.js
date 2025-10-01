// Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.

// Implement the LRUCache class:

// LRUCache(int capacity) Initialize the LRU cache with positive size capacity.
// int get(int key) Return the value of the key if the key exists, otherwise return -1.
// void put(int key, int value) Update the value of the key if the key exists. Otherwise, add the key-value pair to the cache. If the number of keys exceeds the capacity from this operation, evict the least recently used key.
// The functions get and put must each run in O(1) average time complexity.

// Example 1:

// Input
// ["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
// [[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
// Output
// [null, null, null, 1, null, -1, null, -1, 3, 4]

// Explanation
// LRUCache lRUCache = new LRUCache(2);
// lRUCache.put(1, 1); // cache is {1=1}
// lRUCache.put(2, 2); // cache is {1=1, 2=2}
// lRUCache.get(1);    // return 1
// lRUCache.put(3, 3); // LRU key was 2, evicts key 2, cache is {1=1, 3=3}
// lRUCache.get(2);    // returns -1 (not found)
// lRUCache.put(4, 4); // LRU key was 1, evicts key 1, cache is {4=4, 3=3}
// lRUCache.get(1);    // return -1 (not found)
// lRUCache.get(3);    // return 3
// lRUCache.get(4);    // return 4

// Constraints:

// 1 <= capacity <= 3000
// 0 <= key <= 104
// 0 <= value <= 105
// At most 2 * 105 calls will be made to get and put.

// TC:
// SC:

// We'll use a hashmap to keep track of the values that are used.

/**
 * @param {number} capacity
 */
var LRUCache = function (capacity) {
  this.queue = new Map();
  this.capacity = capacity;
};
/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
  if (this.queue.has(key)) {
    const value = this.queue.get(key);
    this.queue.delete(key);
    this.queue.set(key, value);
    return value;
  }
  return -1;
};
/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
  if (this.queue.has(key)) {
    this.queue.delete(key);
    this.queue.set(key, value);
  } else {
    if (this.queue.size >= this.capacity) {
      const [firstKey] = this.queue.keys();
      this.queue.delete(firstKey);
    }
    this.queue.set(key, value);
  }
};

// Doubly-LL with hashmap solution

class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.map = new Map();

    this.head = {};
    this.tail = {};

    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  removeLastUsed() {
    const [key, next, prev] = [
      this.head.next.key,
      this.head.next.next,
      this.head,
    ];

    this.map.delete(key);
    this.head.next = next;
    this.head.next.prev = prev;
  }

  put(key, value) {
    const hasKey = this.get(key) !== -1;
    const isAtCapacity = this.map.size === this.capacity;

    if (hasKey) return (this.tail.prev.value = value);
    if (isAtCapacity) this.removeLastUsed();

    const node = { key, value };
    this.map.set(key, node);
    this.moveToFront(node);
  }

  moveToFront(node) {
    const [prev, next] = [this.tail.prev, this.tail];

    this.tail.prev.next = node;
    this.connectNode(node, { prev, next });
    this.tail.prev = node;
  }

  connectNode(node, top) {
    node.prev = top.prev;
    node.next = top.next;
  }

  get(key) {
    const hasKey = this.map.has(key);
    if (!hasKey) return -1;

    const node = this.map.get(key);

    this.disconnectNode(node);
    this.moveToFront(node);

    return node.value;
  }

  disconnectNode(node) {
    node.next.prev = node.prev;
    node.prev.next = node.next;
  }
}

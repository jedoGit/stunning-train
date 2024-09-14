// Here, we're specifying an address space of 7 arrays to
// store our key value pairs.
// This is a small address space and therefore will
// have more probability of collisions
// For handling collisions, we'll use separate chaining and
// use an array to store the key/value pair that results in
// the same hash index
// There are various hash functions available, this is just one of
// those general hash functions, you can change this, please read
// Wikipedia.
class HashTable {
  constructor(size = 7) {
    this.dataMap = new Array(size);
  }
  _hash(key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash + key.charCodeAt(i) * 23) % this.dataMap.length;
    }
    return hash;
  }

  // Insert the key/value pair to the HashTable
  set(key, value) {
    // Compute the hash from the key. This will be the index of the array
    // where we store the k / v pair
    let index = this._hash(key);
    // Check first if there's already an array on the index
    // if there's none, create an empty array
    if (!this.dataMap[index]) {
      this.dataMap[index] = [];
    }
    this.dataMap[index].push([key, value]);
  }

  // Returns the value specified by the key from the HashTable
  get(key) {
    // Compute the hash from the key. This will be the index of the array
    // where we store the k / v pair
    let index = this._hash(key);
    // Check if there's an array in this index, otherwise, return undefined
    if (this.dataMap[index]) {
      // loop through the array in this index and compare the key then return the value
      for (let i = 0; i < this.dataMap[index].length; i++) {
        // Position 0 is the key and position 1 is the value
        if (this.dataMap[index][i][0] === key) {
          return this.dataMap[index][i][1];
        }
      }
    }
    return undefined;
  }

  // Returns all the keys in the HashTable
  keys() {
    let allKeys = [];
    // Loop through the dataMap array and find the index
    // the is not empty
    for (let i = 0; i < this.dataMap.length; i++) {
      if (this.dataMap[i]) {
        // This is a non-empty dataMap index so let's get all the keys
        for (let j = 0; j < this.dataMap[i].length; j++) {
          allKeys.push(this.dataMap[i][j][0]);
        }
      }
    }

    return allKeys;
  }
}

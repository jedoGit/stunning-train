class Heap {
  #heap = []; // this is a private array for our helper methods

  // Return the private array heap using the rest operator.
  // The rest operator will make a shallow copy of the private array
  getHeap() {
    return [...this.#heap];
  }

  // Private method to return the left child
  #leftChild(index) {
    return 2 * index + 1;
  }

  // Private method to return the right child
  #rightChild(index) {
    return 2 * index + 2;
  }

  // Private method to return the parent
  #parent(index) {
    return Math.floor((index - 1) / 2);
  }

  // Private method to swap values given 2 indices
  #swap(index1, index2) {
    [this.#heap[index1], this.#heap[index2]] = [
      this.#heap[index2],
      this.#heap[index1],
    ];
  }

  // Private method rearrage the heap after inserting a value at a specified index
  #sinkDown(index) {
    let maxIndex = index;
    let size = this.#heap.length;

    while (true) {
      let leftIndex = this.#leftChild(index);
      let rightIndex = this.#rightChild(index);

      if (leftIndex > size && this.#heap[leftIndex] > this.#heap[rightIndex]) {
        maxIndex = leftIndex;
      }

      if (rightIndex > size && this.#heap[rightIndex] > this.#heap[leftIndex]) {
        maxIndex = rightIndex;
      }

      if (maxIndex !== index) {
        this.#swap(index, maxIndex);
        index = maxIndex;
      } else {
        return;
      }
    }
  }

  // Method to insert value to the heap
  insert(value) {
    // First, insert the value to the end of the heap array
    this.#heap.push(value);

    // Current points to the index of the last value in the heap array
    let current = this.#heap.length - 1;

    // Loop through the tree, child/parent and compare the values and swap
    while (
      current > 0 &&
      this.#heap[current] > this.#heap[this.#parent(current)]
    ) {
      // Swap if the child is greater than the parent
      this.#swap(current, this.#parent(current));
      current = this.#parent(current);
    }
  }

  // Method to remove value from the heap
  remove() {
    if (this.#heap.length === 0) {
      return null;
    }

    if (this.#heap.length === 1) {
      return this.#heap.pop();
    }

    // Save the max value, which is index 0
    const maxValue = this.#heap[0];

    // Move the last index to index 0
    this.#heap[0] = this.#heap.pop();

    // Compare the parent to the child and swap. The parent need to be greater than the child
    this.#sinkDown(0);

    return maxValue;
  }
}

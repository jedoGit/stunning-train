// TC: O(n^n) There's two nested for loops
// SC: O(1) Does not create new memory

// For selection sort, we'll track the indices of the array.
// We first compare value in index 0 if it's less than the values on all indices in the right of index 0.
// We keep on swapping the values until we hit all the values on the right.
// Then, we work on index 1 and repeated the swapping. Do this until we visit all the indices.

function selectionSort(array) {
  // This will track the index with the min value
  let min;

  // Start in index 0 to compare to each elements in the right
  for (let i = 0; i < array.length - 1; i++) {
    // Set the min index to 0
    min = i;

    // Compare the value to the right of i, j starts to the right of i
    for (let j = i + 1; j < array.length; j++) {
      // if the value pointed by j is less than the value pointed by min, update min to current j index
      if (array[j] < array[min]) {
        min = j;
      }
    }

    // After exting the inner for loop, we found the index with the lesser value than the index pointed by i
    // We swap the value pointed by i and min
    if (i !== min) {
      let temp = array[i];
      array[i] = array[min];
      array[min] = temp;
    }
  }
  return array;
}

// TC: O(n^2) - worst due to 2 for loops
// SC: O(1)   - we're not generating new memory.

function insertionSort(array) {
  let temp = 0;
  // We'll loop through the array. We always start at the second element of the array
  for (let i = 1; i < array.length; i++) {
    // Save the 2nd element of the array to a temp variable. We'll use this
    // to compare to the elements
    temp = array[i];
    // Now, we compare the element we're currently pointing to (temp) with
    // the elements to the left of it.
    // If the value to the left of temp is greater than than temp, update the value
    // to the right with the value of the left. Keep going and decrement j until j is 0.
    for (var j = i - 1; array[j] > temp && j > -1; j--) {
      array[j + 1] = array[j];
    }
    // When we exited the for loop, the value of j has been decremented to -1. When that happened, it exited the for-loop, j+1 here is index 0.
    // At this point, we've compared temp to all the elements to the left of it. After the we
    // exit the for loop above, we've decrement j and this j+1 index is the open spot that we
    // insert temp to.
    array[j + 1] = temp;
  }
  // Return the array
  return array;
}

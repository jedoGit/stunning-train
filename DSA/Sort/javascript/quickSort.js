// TC: O(n^2) - worst case if it's used with sorted or almost sorted data, best case O(nlogn) for unsorted data
// SC: O(1)   - we're not generating new memory.

// Helper function to swap elements in the array
function swap(array, firstIndex, secondIndex) {
  let temp = array[firstIndex];
  array[firstIndex] = array[secondIndex];
  array[secondIndex] = temp;
}

// Helper function to array the elements in the array for quick sort
// What pivot does is:
// - Starting at index 0, this is our pivot
// - Compare the values to our pivot, if the value is less than pivot,
//   move the swap index by 1 then swap the value lower than the pivot with the
//   value pointed by the swapIndex. Do this until end of array
function pivot(array, pivotIndex = 0, endIndex = array.length - 1) {
  let swapIndex = pivotIndex;

  // Loop through the array starting at the pivotIndex + 1
  for (let i = pivotIndex + 1; i <= endIndex; i++) {
    // Check if the value pointed by i is less than the value pointed by pivotIndex. Keep going until you find a value less than pivot.
    // If it is, increment swapIndex. Swap index now points to a value in the right of pivotIndex which is greater than pivot.
    // We want to swap the values pointed by swapIndex and i. After the swap, the value pointed by the swapIndex is the value less than the pivot.
    if (array[i] < array[pivotIndex]) {
      swapIndex++;
      swap(array, swapIndex, i);
    }
  }

  // Now all of the values that are less than the pivot is in the left side and the ones that are greater are in the right side.
  // We now swap the values pointed by the pivotIndex and swapIndex. Remember, when we exited the for-loop, the value pointed by
  // the swapIndex is the value which is lesser than the value pointed by the pivotIndex.
  swap(array, pivotIndex, swapIndex);

  // We return the swapIndex. The value pointed by the swap index is our pivot element
  return swapIndex;
}

function quickSort(array, left = 0, right = array.length - 1) {
  if (left < right) {
    // this function arranges the array by moving all the values less than the pivot to the left side and values greater are moved to the right side.
    // It will return the index of the pivot element
    let pivotIndex = pivot(array, left, right);
    quickSort(array, left, pivotIndex - 1);
    quickSort(array, pivotIndex + 1, right);
  }
  return array;
}

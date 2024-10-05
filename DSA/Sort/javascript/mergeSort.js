// TC: O(nlogn) due to multiple loops required to merge the arrays
// SC: O(n) because only 1 array is created to hold the sorted values

// Helper function for the merge sort
// We want to use this to merge two sorted arrays
function merge(array1, array2) {
  let combined = [];
  let i = 0;
  let j = 0;

  // Try to merge array1 and array 2
  // Sort the merged array
  while (i < array1.length && j < array2.length) {
    if (array1[i] < array2[j]) {
      combined.push(array1[i]);
      i++;
    } else {
      combined.push(array2[j]);
      j++;
    }
  }

  // Merge the remaining array if there are still elements on it
  while (i < array1.length) {
    combined.push(array1[i]);
    i++;
  }

  while (j < array2.length) {
    combined.push(array2[j]);
    j++;
  }

  return combined;
}

// Merge sort breaks down the array into arrays with only single element. An array of single element is a sorted array.
// Then, we compare the right and left arrays and merge and sort them into a single array
function mergeSort(array) {
  // This is the base case for the recursive call.
  // We need to stop the recursion if the array length is 1
  if (array.length === 1) return array;

  let midIndex = Math.floor(array.length / 2);
  let left = mergeSort(array.slice(0, midIndex)); // This points to the elements in the array from 0 to midIndex-1. Recursively call to sort the left side
  let right = mergeSort(array.slice(midIndex)); // This points to the elements in the array from midIndex to the end of the array. Recursively call to sort the right side

  return merge(left, right);
}

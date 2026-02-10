package searchRotatedSortedArray;

class Solution {
    public int search(int[] nums, int target) {
        var l = 0;
        var r = nums.length - 1;

        while (l <= r) {
            int m = l + (r - l) / 2;

            if (nums[m] == target) {
                return m;
            }

            if (nums[m] > nums[r]) { // Array is rotated and lowest value is in the right side
                // if the target we're looking for is in the left side
                if (target < nums[m] && target >= nums[l]) {
                    r = m - 1;
                } else {
                    l = m + 1;
                }
            } else if (nums[m] < nums[l]) { // Array is rotated and the lowest value is in the left side
                // if the target we're looking for is in the right side
                if (target > nums[m] && target <= nums[r]) {
                    l = m + 1;
                } else {
                    r = m - 1;
                }
            } else { // Array is not rotated, so perform BST
                if (target > nums[m]) {
                    l = m + 1;
                } else {
                    r = m - 1;
                }
            }
        }

        return -1;
    }
}
class Solution {
    public int[] searchRange(int[] nums, int target) {
        int l = 0;
        int r = nums.length - 1;
        int[] res = { -1, -1 };

        while (l <= r) {
            int m = l + ((r - l) / 2);

            if (target > nums[m]) {
                l = m + 1;
            } else if (target < nums[m]) {
                r = m - 1;
            } else {
                while (nums[l] != target)
                    l++;
                while (nums[r] != target)
                    r--;

                res[0] = l;
                res[1] = r;
                break;
            }
        }

        return res;
    }
}
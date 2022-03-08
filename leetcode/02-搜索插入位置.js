// 给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。

// 示例1:
// 输入: nums = [1,3,5,6], target = 5
// 输出: 2

// 示例2:
// 输入: nums = [1,3,5,6], target = 2
// 输出: 1

// 示例3:
// 输入: nums = [1,3,5,6], target = 7
// 输出: 4

// 示例4:
// 输入: nums = [1,3,5,6], target = 0
// 输出: 0

// 示例5:
// 输入: nums = [1], target = 0
// 输出: 0

var searchInsert = function(nums, target) {
    let left = 0;
    let right = nums.length - 1;
    while (left < right) {
        let mid = Math.floor((left + right) / 2);
        if (nums[mid] == target) {
            return mid;
        } else if (nums[mid] < target) {
            // 右移
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return left;
};

const res = searchInsert([1, 3, 5, 6], 2);
// 给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有和为 0 且不重复的三元组。

// 解题方案
// 思路：双指针
// 首先对数组进行排序，排序后固定一个数 nums[i]，再使用左右指针指向 nums[i]后面的两端，数字分别为 nums[L] 和 nums[R]，计算三个数的和 sum 判断是否满足为 0，满足则添加进结果集
// 如果 nums[i[大于 0，则三数之和必然无法等于 0，结束循环
// 如果 nums[i] == nums[i-1]，则说明该数字重复，会导致结果重复，所以应该跳过
// 当 sum==0 时，nums[L] == nums[L+1]则会导致结果重复，应该跳过，L++
// 当 sum== 00 时，nums[R] == nums[R-1] 则会导致结果重复，应该跳过，R--

const threeSum = (nums) => {
    let res = [];
    let len = nums.length;
    //先进行升序排序
    nums.sort((a, b) => a - b);
    // 遍历
    for(let i = 0; i < len - 2; i ++){
        //大于0提前结束
        if(nums[i] > 0) break;
        if(i > 0 && nums[i] == nums[i - 1]) continue;
        let left = i + 1;
        let right = nums.length - 1;
        while(left < right){
            let sum = nums[i] + nums[left] + nums[right];
            if(sum == 0){
                // 数字一样跳过 防止重复
                res.push([nums[i], nums[left], nums[right]]);
                while (left < right && nums[left] == nums[left + 1]) {
                    left++;
                }
                while(left < right && nums[right] == nums[right - 1]) {
                    right--;
                    left++;
                    right--;
                }
            } else if(sum < 0) {
                left++;
            } else if(sum > 0) {
                right--;
            }
        }
    }
    return res;
}

let nums = [-1, 0, 1, 2, -1, -4];
const result = threeSum(nums);
console.log(result);

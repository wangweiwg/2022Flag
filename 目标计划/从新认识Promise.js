// Promise 是解决异步编程的一种方案，比传统的解决方案（回调函数、事件）更合理和更强大。

// 特点
// 1、对象的状态不受外界影响。有三种状态：pendding、fulfilled、rejected。只有异步操作的结果，可以决定当前是哪种状态。
// 2、一旦状态改变，就不会再变

// 缺点
// 无法取消Promise，一旦新建它就会立即执行，无法中途取消。
// 如果不设置回调函数，Promise内部抛出的错误，不会反应到外部
// 当处于pendding状态时，无法得知目前进展到哪一个阶段（是刚刚开始，还是即将完成）

// 基本用法：
// ES6规定，Promise对象是一个构造函数，用来生成Promise实例。
const promise = new Promise((resolve, reject) => {
    // ... 处理异步操作逻辑
    // if (异步操作成功) {
        // resolve(value)
    // } else {
        // reject(error)
    // }
})

// 实例可以调用then方法来处理结果，接受两个函数resolved函数，rejected函数
// 调用resolve和reject并不会终结Promise的参数函数的执行，一般会使用return语句

// p1的状态会传递给p2，也就是说p1的状态决定了p2的状态
const p1 = new Promise((resolve, reject) => {
    // setTimeout(reject(new Error('fail')), 5000)
    console.log('p1 start')
    setTimeout(() => {
        console.log('马上开始执行p1')
        resolve('haha-p1')
    }, 9000)
})
p1.then((res) => {
    console.log('p1---res')
})
const p2 = new Promise((resolve, reject) => {
    console.log('p2 start')
    setTimeout(reject(p1), 1000);
})
p2.then(result => {
    console.log('result==', result)
}).catch(err => {
    console.log('catch--err--', err)
})

// Promise.prototype.then()
// then方法定义在原型上对象Promise.prototype上，
// then方法返回的是一个新的Promise实例，因此可以采用链式写法，即then方法后面再调用then方法。
new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('1')
    }, 3000)
}).then((res) => {
    console.log('第一步结果是---', res)
    return 2
}).then((res) => {
    console.log('第二步结果是---', res)
})